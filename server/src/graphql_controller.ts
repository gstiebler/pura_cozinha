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
import { processOrder } from './core/OrderProcess';

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

const FoodMenuItemInputType = new GraphQLInputObjectType({
  name: 'FoodMenuItemInputType',
  fields: {
    id: { type: GraphQLID },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    imgURL: { type: GraphQLString },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
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
          id: { type: GraphQLID }
        },
        resolve: async function(root, { id }) {
          return Kitchen.findOne({ '_id': id });
        }
      },
      foodMenuItem: {
        type: menuItemType,
        args: {
          id: { type: GraphQLID }
        },
        resolve: async function(root, { id }) {
          return MenuItem.findOne({ '_id': id });
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
      saveOrder: {
        type: OrderType,
        args: { newOrderData: { type: OrderInputType } },
        resolve: async function(value, { newOrderData }) {
          await processOrder(newOrderData);
        }
      },
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
      deleteKitchen: {
        type: GraphQLString,
        args: { kitchenId: { type: GraphQLID } },
        resolve: async (value, { kitchenId }) => {
          await Kitchen.remove({ _id: kitchenId });
          return 'OK';
        }
      },
      saveFoodMenuItem: {
        type: GraphQLString,
        args: { fmiData: { type: FoodMenuItemInputType } },
        resolve(value, { fmiData }) {
          const newFMI = new MenuItem(fmiData);
          return newFMI.save();
        }
      },
      updateFoodMenuItem: {
        type: GraphQLString,
        args: { fmiData: { type: FoodMenuItemInputType } },
        resolve: async (value, { fmiData }) => {
          await MenuItem.update({ _id: fmiData.id }, { $set: fmiData });
          return 'OK';
        }
      },
      deleteFoodMenuItem: {
        type: GraphQLString,
        args: { fmiID: { type: GraphQLID } },
        resolve: async (value, { fmiID }) => {
          await MenuItem.remove({ _id: fmiID });
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