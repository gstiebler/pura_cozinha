import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
} from 'graphql';

import { Kitchen } from './db/kitchen';

const kitchenType = new GraphQLObjectType({
  name: 'kitchenType',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    address: { type: GraphQLString }
  }
});


const schema = new GraphQLSchema({
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
  })
});

export async function execGQLQuery(query: string) {
  return await graphql(schema, query);
}