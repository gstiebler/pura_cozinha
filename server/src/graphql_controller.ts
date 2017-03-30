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

import { Kitchen } from './db/models/kitchen';
import { MenuItem } from './db/models/menuItem';
import { Order } from './db/models/Order';

const kitchenType = new GraphQLObjectType({
  name: 'kitchenType',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    address: { type: GraphQLString }
  }
});

const KitchenInputType = new GraphQLInputObjectType({
  name: 'kitchenInputType',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    address: { type: GraphQLString }
  }
});

const menuItemType = new GraphQLObjectType({
  name: 'menuItemType',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    imgURL: { type: GraphQLString },
  }
});

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
    kitchen: { type: kitchenType },
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
      kitchens: {
        type: new GraphQLList(kitchenType),
        resolve: function() {
          return Kitchen.find();
        }
      },
      kitchen: {
        type: kitchenType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: async function(root, { id }) {
          return Kitchen.findOne({ '_id': id });
        }
      },
      menuItems: {
        type: new GraphQLList(menuItemType),
        args: {
          lat: { type: GraphQLFloat },
          lng: { type: GraphQLFloat },
        },
        resolve: function(root, { lat, lng }) {
          return MenuItem.find();
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
      }
    }
  }),
  mutation: new GraphQLObjectType({
    fields: {
      saveKitchen: {
        type: kitchenType,
        args: { newKitchenData: { type: KitchenInputType } },
        resolve(value, { newKitchenData }) {
          const newKitchen = new Kitchen(newKitchenData);
          return newKitchen.save();
        }
      },
      updateKitchen: {
        type: GraphQLString,
        args: { newKitchenData: { type: KitchenInputType } },
        resolve: async (value, { newKitchenData }) => {
          await Kitchen.update({ _id: newKitchenData.id }, { $set: newKitchenData });
          return 'OK';
        }
      },
      saveOrder: {
        type: OrderType,
        args: { newOrderData: { type: OrderInputType } },
        resolve: async function(value, { newOrderData }) {
          newOrderData.datetime = new Date();
          const kitchen: any = await Kitchen.findOne();
          newOrderData.kitchen = kitchen._id;
          newOrderData.status = 'PAYMENT_PENDING';
          let total = 0.0;
          for (let i = 0; i < newOrderData.items.length; i++) {
            let menu_item_id = newOrderData.items[i].food_menu_item_id;
            let menuItem: any = await MenuItem.findOne({ _id: menu_item_id });
            newOrderData.items[i].title = menuItem.title;
            newOrderData.items[i].price = menuItem.price;
            total += menuItem.price;
          }
          newOrderData.total_paid = total;
          const newOrder = new Order(newOrderData);
          return newOrder.save();
        }
      },
      deleteKitchen: {
        type: GraphQLString,
        args: { kitchenId: { type: GraphQLID } },
        resolve: async (value, { kitchenId }) => {
          await Kitchen.remove({ _id: kitchenId });
          return 'OK';
        }
      },
    },
    name: 'Mutation',
  })
});

export async function execGQLQuery(query: string) {
  return await graphql(schema, query);
}