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
import { menuItemTypeFields } from './FoodMenuItemGraphql';
import { Order, IOrderModal } from '../db/models/Order';

const menuItemInputType = new GraphQLInputObjectType({
  name: 'menuItemInputType',
  fields: menuItemTypeFields
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
    localComplement: { type: GraphQLString },
    paymentOption: { type: new GraphQLNonNull(GraphQLString) },
    telephoneNumber: { type: GraphQLString },
    orderSummary: { type: new GraphQLNonNull(OrderSummaryInputType) },
  }
});

export const Mutation = {
  saveOrder: {
    type: GraphQLString,
    args: { fmiData: { type: OrderRequestInputType } },
    async resolve(value, { fmiData }: { fmiData: IOrderRequest}) {
      const items = fmiData.orderSummary.items.map(item => ({
        qty: item.qty,
        itemTotalPrice: item.itemTotalPrice,
        foodMenuItem: {
          id: item.fmi._id,
          title: item.fmi.title,
          price: item.fmi.price,
          description: item.fmi.description,
        },
      }));
      const orderObj = {
        userId: 'coffee_shop',
        local: fmiData.local,
        localComplement: fmiData.localComplement,
        paymentOption: fmiData.paymentOption,
        telephoneNumber: fmiData.telephoneNumber,
        totalAmount: fmiData.orderSummary.totalAmount,
        items,
      };
      const order = new Order(orderObj);
      await order.save();

      return { msg: 'OK' };
    }
  },
};