import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList
} from 'graphql';
import { MenuItem } from '../db/models/menuItem';

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