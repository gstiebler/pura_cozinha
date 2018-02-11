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
import { IOrderRequest } from '../../../common/Interfaces';

const menuItemInputType = new GraphQLInputObjectType({
  name: 'menuItemInputType',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    imgURL: { type: GraphQLString },
  }
});

const OrderItemInputType = new GraphQLInputObjectType({
  name: 'OrderItemInputType',
  fields: {
    fmi: { type: new GraphQLNonNull(menuItemInputType) },
    qty: { type: new GraphQLNonNull(GraphQLFloat) },
    itemTotalPrice: { type: new GraphQLNonNull(GraphQLFloat) },
  }
});

const OrderSummaryInputType = new GraphQLInputObjectType({
  name: 'OrderSummaryInputType',
  fields: {
    totalAmount: { type: new GraphQLNonNull(GraphQLFloat) },
    items: { type: new GraphQLList(OrderItemInputType) },
  }
});

const OrderRequestInputType = new GraphQLInputObjectType({
  name: 'OrderRequestInputType',
  fields: {
    local: { type: new GraphQLNonNull(GraphQLString) },
    paymentOption: { type: new GraphQLNonNull(GraphQLString) },
    telephoneNumber: { type: GraphQLString },
    orderSummary: { type: new GraphQLNonNull(OrderSummaryInputType) },
  }
});

export const Mutation = {
  saveOrder: {
    type: GraphQLString,
    args: { fmiData: { type: OrderRequestInputType } },
    resolve(value, { fmiData }: { fmiData: IOrderRequest}) {
      logger.debug(JSON.stringify(fmiData, null, 2));
      return { msg: 'OK' };
    }
  },
};