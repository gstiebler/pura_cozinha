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
  GraphQLInputObjectType
} from 'graphql';

import { Kitchen } from './db/models/kitchen';
import { MenuItem } from './db/models/menuItem';

const kitchenType = new GraphQLObjectType({
  name: 'kitchenType',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    address: { type: GraphQLString }
  }
});

const KitchenInputType = new GraphQLInputObjectType({
  name: 'ArticleInput',
  fields: {
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
    },
    name: 'Mutation',
  })
});

export async function execGQLQuery(query: string) {
  return await graphql(schema, query);
}