import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLInputObjectType
} from 'graphql';

import { Kitchen } from './db/models/kitchen';

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
    },
    name: 'Mutation',
  })
});

export async function execGQLQuery(query: string) {
  return await graphql(schema, query);
}