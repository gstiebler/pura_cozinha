import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLFloat
} from 'graphql';
import * as geolib from 'geolib';
import { Kitchen } from '../db/models/kitchen';
import { ObjectId } from 'bson';
import { getProjection } from '../lib/Util';

const geolocationType = new GraphQLObjectType({
  name: 'geolocationType',
  fields: {
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat }
  }
});

const geolocationInputType = new GraphQLInputObjectType({
  name: 'geolocationInputType',
  fields: {
    lat: { type: GraphQLFloat },
    lng: { type: GraphQLFloat }
  }
});

const KitchenStockType = new GraphQLObjectType({
  name: 'KitchenStockType',
  fields: {
    menu_item: { type: new GraphQLNonNull(GraphQLID) },
    quantity: { type: GraphQLFloat }
  }
});

const KitchenStockInputType = new GraphQLInputObjectType({
  name: 'KitchenStockInputType',
  fields: {
    menu_item: { type: new GraphQLNonNull(GraphQLID) },
    quantity: { type: GraphQLFloat }
  }
});

const KitchenCompleteType = new GraphQLObjectType({
  name: 'KitchenCompleteType',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    active: {type: GraphQLBoolean},
    stock: { type: new GraphQLList(KitchenStockType) }
  }
});

const kitchenWithDistType = new GraphQLObjectType({
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

const KitchenWithStockInputType = new GraphQLInputObjectType({
  name: 'KitchenWithStockInputType',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    coordinates: { type: geolocationInputType },
    active: {type: GraphQLBoolean},
    stock: { type: new GraphQLList(KitchenStockInputType) }
  }
});


export const KitchenQuery = {
  kitchens: {
    type: new GraphQLList(KitchenCompleteType),
    resolve: async function(root) {
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
      const kitchens: any[] = await Kitchen.find({ active: 'YES' });
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
    type: KitchenCompleteType,
    args: {
      id: { type: GraphQLID }
    },
    resolve: async function(root, { id }, source, fieldASTs) {
      const projection = getProjection(fieldASTs);
      const kitchen =  await Kitchen.findById(id, projection).lean();
      return kitchen;
    }
  },
};


export const KitchenMutation = {
  // saveKitchen: {
  //   type: GraphQLString,
  //   args: { newKitchenData: { type: KitchenInputType } },
  //   resolve(value, { newKitchenData }) {
  //     const newKitchen = new Kitchen(newKitchenData);
  //     return newKitchen.save();
  //   }
  // },
  updateKitchen: {
    type: GraphQLString,
    args: { newKitchenData: { type: KitchenInputType } },
    resolve: async (value, { newKitchenData }) => {
      await Kitchen.update({ _id: newKitchenData.id }, { $set: newKitchenData });
      return 'OK';
    }
  },
  updateKitchenWithStock: {
    type: GraphQLString,
    args: { newKitchenData: { type: KitchenWithStockInputType } },
    resolve: async (value, { newKitchenData }) => {
      await Kitchen.update({ _id: newKitchenData._id }, { $set: newKitchenData });
      return 'OK';
    }
  },
  updateKitchenStatus: {
    type: GraphQLString,
    args: { 
      id:  {type: GraphQLID},
      active: {type: GraphQLBoolean}
    },
    resolve: async (value, { id, active}) => {
      await Kitchen.update({ _id: id }, { active: active });
      return 'OK';
    }
  },
  // deleteKitchen: {
  //   type: GraphQLString,
  //   args: { kitchenId: { type: GraphQLID } },
  //   resolve: async (value, { kitchenId }) => {
  //     await Kitchen.remove({ _id: kitchenId });
  //     return 'OK';
  //   }
  // },
};