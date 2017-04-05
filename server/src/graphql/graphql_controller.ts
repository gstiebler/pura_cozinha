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

const CreditCardInputType = new GraphQLInputObjectType({
  name: 'CreditCardInputType',
  fields: {
    type: { type: GraphQLString },
    number: { type: GraphQLString },
    expire_month: { type: GraphQLString },
    expire_year: { type: GraphQLString },
    cvv2: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
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
    credit_card_info: { type: CreditCardInputType },
    selected_kitchen_id: { type: GraphQLID },
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
      foodMenuItem: FoodMenuItemGraphql.Query.foodMenuItem,
      menuItems: FoodMenuItemGraphql.Query.menuItems,
      kitchen: KitchenGraphql.KitchenQuery.kitchen,
      kitchens: KitchenGraphql.KitchenQuery.kitchens,
      kitchensByDistance: KitchenGraphql.KitchenQuery.kitchensByDistance
    }
  }),
  mutation: new GraphQLObjectType({
    fields: {
      saveOrder: {
        type: GraphQLString,
        args: { newOrderData: { type: OrderInputType } },
        resolve: async function(value, { newOrderData }) {
          await processOrder(newOrderData);
        }
      },
      saveFoodMenuItem: FoodMenuItemGraphql.Mutation.saveFoodMenuItem,
      updateFoodMenuItem: FoodMenuItemGraphql.Mutation.updateFoodMenuItem,
      deleteFoodMenuItem: FoodMenuItemGraphql.Mutation.deleteFoodMenuItem,
      saveKitchen: KitchenGraphql.KitchenMutation.saveKitchen,
      updateKitchen: KitchenGraphql.KitchenMutation.updateKitchen,
      deleteKitchen: KitchenGraphql.KitchenMutation.deleteKitchen,
    },
    name: 'Mutation',
  })
});

export async function execGQLQuery(query: string) {
  return await graphql(schema, query);
}