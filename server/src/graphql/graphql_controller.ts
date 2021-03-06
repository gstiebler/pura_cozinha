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
import * as UserGraphQL from './UserGraphQL';
import * as KitchenGraphql from './KitchenGraphql';
import * as IngredientTypeGraphQL from './IngredientTypeGraphQL';
import * as PurchaseGraphQL from './PurchaseGraphQL';
import * as KitchenStockGraphQL from './KitchenStockGraphQL';

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...FoodMenuItemGraphql.Query,
      ...OrderGraphQL.Query,
      ...UserGraphQL.Query,
      ...IngredientTypeGraphQL.Query,
      ...KitchenGraphql.KitchenQuery,
      ...PurchaseGraphQL.Query
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      ...OrderGraphQL.Mutation,
      ...IngredientTypeGraphQL.Mutation,
      ...KitchenGraphql.KitchenMutation,
      ...PurchaseGraphQL.Mutation,
      ...KitchenStockGraphQL.Mutation
    },
  })
});

export async function execGQLQuery(query: string) {
  // logger.debug(query);
  return await graphql(schema, query);
}