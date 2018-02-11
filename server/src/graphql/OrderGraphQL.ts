import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLList
} from 'graphql';
import * as logger from 'winston';

export const Mutation = {
  saveOrder: {
    type: GraphQLString,
    args: {
      selectedLocal: { type: GraphQLString },
      selectedPaymentOption: { type: GraphQLString },
      telephoneNumber: { type: GraphQLString },
      totalAmount: { type: GraphQLFloat },
    },
    resolve(value, { selectedLocal }) {
      console.log('teste');
      logger.debug(selectedLocal);
    }
  },
};