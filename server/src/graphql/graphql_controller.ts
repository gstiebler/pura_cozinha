import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLInputObjectType,
} from 'graphql';
import logger from 'winston';

import { Kitchen } from '../db/models/kitchen';
import { Order } from '../db/models/Order';
import { processOrder } from '../core/OrderProcess';
import * as KitchenGraphql from './KitchenGraphql';
import * as FoodMenuItemGraphql from './FoodMenuItemGraphql';


const OrderItemType = new GraphQLObjectType({
  name: 'OrderItemType',
  fields: {
    food_menu_item_id: { type: GraphQLID },
    quantity: { type: GraphQLFloat },
  }
});

const OrderType = new GraphQLObjectType({
  name: 'OrderType',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    user_id: { type: new GraphQLNonNull(GraphQLID) },
    kitchen: { type: KitchenGraphql.kitchenType },
    total: { type: GraphQLFloat },
    datetime: { type: GraphQLString },
    status: { type: GraphQLString },
    items: { type: new GraphQLList(OrderItemType) },
  }
});

const OrderItemInputType = new GraphQLInputObjectType({
  name: 'OrderItemInputType',
  fields: {
    food_menu_item_id: { type: GraphQLID },
    quantity: { type: GraphQLFloat },
  }
});

const OrderInputType = new GraphQLInputObjectType({
  name: 'OrderInputType',
  fields: {
    user_id: { type: GraphQLID },
    items: { type: new GraphQLList(OrderItemInputType) },
    paypal_pay_id: { type: GraphQLString },
    selected_kitchen_id: { type: GraphQLID },
    address: { type: GraphQLString },
    name: { type: GraphQLString },
  }
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      },
      orders: {
        type: new GraphQLList(OrderType),
        resolve: async function() {
          const orders: any[] = await Order.find().populate('kitchen');
          const res = orders.map(order => {
            order.id = order._id;
            order.total = order.total_paid;
            return order;
          });
          return res;
        }
      },
      ...FoodMenuItemGraphql.Query,
      ...KitchenGraphql.KitchenQuery,
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      saveOrder: {
        type: GraphQLString,
        args: { newOrderData: { type: OrderInputType } },
        resolve: async function(value, { newOrderData }) {
          await processOrder(newOrderData);
        }
      },
      ...FoodMenuItemGraphql.Mutation,
      ...KitchenGraphql.KitchenMutation,
    },
  })
});

export async function execGQLQuery(query: string) {
  logger.debug(query);
  return await graphql(schema, query);
}