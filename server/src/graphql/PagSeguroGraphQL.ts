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
  

  export const CheckoutCompleteInputType = new GraphQLInputObjectType({
    name: 'CheckoutCompleteInputType',
    fields: {
      cardToken: { type: GraphQLString },
      senderHash: { type: GraphQLString },
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
      args: { fmiData: { type: CheckoutCompleteInputType } },
      async resolve(value, { fmiData }) {
        console.log(fmiData.cardToken);
        await PagSeguro.checkoutPayment(fmiData.cardToken, fmiData.senderHash);
        return { msg: 'OK' };
      }
    },
  };
  