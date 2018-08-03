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
  

  export const CheckoutCompleteType = new GraphQLObjectType({
    name: 'CheckoutCompleteType',
    fields: {
      cardToken: { type: GraphQLString },
    }
  });

  export const Query = {
    getSessionId: {
      type: GraphQLString,
      resolve: async function(root) {
        const sessionId = PagSeguro.getPaymentSessionId();
        return sessionId;
      }
    },
  };
  
  export const Mutation = {
    checkoutPayment: {
      type: GraphQLString,
      args: { fmiData: { type: CheckoutCompleteType } },
      async resolve(value, { fmiData }) {
        await PagSeguro.checkoutPayment(fmiData.cardToken);
        return { msg: 'OK' };
      }
    },
  };
  