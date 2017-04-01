import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLFloat
} from 'graphql';
import { Kitchen } from '../db/models/kitchen';

export const geolocationType = new GraphQLObjectType({
  name: 'geolocationType',
  fields: {
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat }
  }
});

export const geolocationInputType = new GraphQLInputObjectType({
  name: 'geolocationInputType',
  fields: {
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat }
  }
});

export const kitchenType = new GraphQLObjectType({
  name: 'kitchenType',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    coordinates: { type: geolocationType }
  }
});

const KitchenInputType = new GraphQLInputObjectType({
  name: 'kitchenInputType',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    coordinates: { type: geolocationInputType }
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
    type: GraphQLString,
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