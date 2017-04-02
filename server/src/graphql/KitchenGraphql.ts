import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLFloat
} from 'graphql';
import * as geolib from 'geolib';
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

export const kitchenWithDistType = new GraphQLObjectType({
  name: 'kitchenWithDistType',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    distMeters: { type: GraphQLFloat },
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
  kitchensByDistance: {
    type: new GraphQLList(kitchenWithDistType),
    args: {
      lat: { type: GraphQLFloat },
      lng: { type: GraphQLFloat }
    },
    resolve: async function(root, { lat, lng }) {
      const origin = {
        latitude: lat,
        longitude: lng
      };
      const kitchens: any[] = await Kitchen.find();
      const kitchensWithDist = kitchens.map(k => {
        const kitchen = k.toObject();
        const kitchenCoords = {
          latitude: kitchen.coordinates.lat,
          longitude: kitchen.coordinates.lng
        };
        kitchen.distMeters = geolib.getDistance(origin, kitchenCoords);
        return kitchen;
      });
      kitchensWithDist.sort((a, b) => { return a.distMeters - b.distMeters; });
      return kitchensWithDist;
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