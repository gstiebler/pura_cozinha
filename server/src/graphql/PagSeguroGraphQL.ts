import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLFloat,
    GraphQLList,
  } from 'graphql';
  import * as logger from 'winston';
  import * as PagSeguro from './resolvers/PagSeguro';
  
  export const Query = {
    getSessionId: {
      type: GraphQLString,
      resolve: async function(root) {
        const sessionId = PagSeguro.getPaymentSessionId();
        return sessionId;
      }
    },
  };
  
  