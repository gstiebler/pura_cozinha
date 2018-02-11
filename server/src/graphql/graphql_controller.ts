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
  GraphQLInputObjectType,
} from 'graphql';
import logger from 'winston';

import * as FoodMenuItemGraphql from './FoodMenuItemGraphql';
import * as OrderGraphQL from './OrderGraphQL';

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...FoodMenuItemGraphql.Query,
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      ...OrderGraphQL.Mutation
    },
  })
});

export async function execGQLQuery(query: string) {
  // logger.debug(query);
  return await graphql(schema, query);
}