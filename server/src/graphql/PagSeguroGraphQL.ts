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
  


  export const ItemInputType = new GraphQLInputObjectType({
    name: 'ItemInputType',
    fields: {
      itemId: { type: GraphQLString },
      itemDescription: { type: GraphQLString },
      itemAmount: { type: GraphQLString },
      itemQuantity: { type: GraphQLFloat },
    }
  });

  export const CheckoutCompleteInputType = new GraphQLInputObjectType({
    name: 'CheckoutCompleteInputType',
    fields: {
      items: { type: new GraphQLList(ItemInputType) },
      cardToken: { type: GraphQLString },
      senderHash: { type: GraphQLString },
      senderName: { type: GraphQLString },
      senderCPF: { type: GraphQLString },
      senderAreaCode: { type: GraphQLString },
      senderPhone: { type: GraphQLString },
      senderEmail: { type: GraphQLString },
      shippingAddressStreet: { type: GraphQLString },
      shippingAddressNumber: { type: GraphQLString },
      shippingAddressComplement: { type: GraphQLString },
      shippingAddressDistrict: { type: GraphQLString },
      shippingAddressPostalCode: { type: GraphQLString },
      shippingAddressCity: { type: GraphQLString },
      shippingAddressState: { type: GraphQLString },
      creditCardToken: { type: GraphQLString },
      installmentValue: { type: GraphQLString },
      creditCardHolderName: { type: GraphQLString },
      creditCardHolderCPF: { type: GraphQLString },
      creditCardHolderBirthDate: { type: GraphQLString },
      creditCardHolderAreaCode: { type: GraphQLString },
      creditCardHolderPhone: { type: GraphQLString },
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
        await PagSeguro.checkoutPayment(fmiData);
        return { msg: 'OK' };
      }
    },
  };
  