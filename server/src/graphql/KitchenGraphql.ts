import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLList
} from 'graphql';
import { Kitchen } from '../db/models/kitchen';

export const kitchenType = new GraphQLObjectType({
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


export const KitchenQuery = {
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
};


export const KitchenMutation = {
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
};