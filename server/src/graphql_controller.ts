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
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      type: GraphQLString
    },
    address: {
      type: GraphQLString
    }
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
        resolve: async function() {
          const result = await Kitchen.find().then();
          return result;
        }
      }
    }
  })
});

export async function execGQLQuery(query: string) {
  return await graphql(schema, query);
}