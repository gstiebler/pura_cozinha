import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import { Kitchen } from './db/kitchen';

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
      kitchen: {
        type: GraphQLString,
        resolve: async function() {
          const result = await Kitchen.findOne().then();
          return JSON.stringify(result);
        }
      }
    }
  })
});

export async function execGQLQuery(query: string) {
  return await graphql(schema, query);
}