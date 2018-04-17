import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLBoolean
} from 'graphql';
import { MenuItem } from '../db/models/menuItem';
import { Kitchen } from '../db/models/kitchen';

export const menuItemTypeFields = {
  _id: { type: new GraphQLNonNull(GraphQLID) },
  title: { type: GraphQLString },
  description: { type: GraphQLString },
  price: { type: GraphQLFloat },
  imgURL: { type: GraphQLString },
};

export const menuItemType = new GraphQLObjectType({
  name: 'menuItemType',
  fields: menuItemTypeFields,
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

export const Query = {
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
  menuItemsByKitchen: {
    type: new GraphQLList(menuItemType),
    args: {
      kitchen_id: { type: GraphQLID },
    },
    resolve: async function(root, { kitchen_id }) {
      const kitchen: any = await Kitchen.findById(kitchen_id);
      const menuItemIds = [];
      for (let stockItem of kitchen.stock) {
        if (stockItem.quantity > 0) {
          menuItemIds.push(stockItem.menu_item);
        }
      }
      return MenuItem.find({ _id: { $in: menuItemIds }  });
    }
  },
  fullMenuItemsByKitchen: {
    type: new GraphQLList(menuItemType),
    args: {
      kitchen_id: { type: GraphQLID },
    },
    resolve: async function(root, { kitchen_id }) {
      const kitchen: any = await Kitchen.findById(kitchen_id);
      const menuItemIds = [];
      for (let stockItem of kitchen.stock) {
        menuItemIds.push(stockItem.menu_item);
      }
      return MenuItem.find({ _id: { $in: menuItemIds }  });
    }
  }
};

export const Mutation = {
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
};