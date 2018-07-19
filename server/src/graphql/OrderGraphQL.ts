import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';
import * as logger from 'winston';
import { IOrderRequest } from '../../../common/Interfaces';
import { Order, IOrder } from '../db/models/Order';
import * as resolvers from './resolvers/OrderResolver';
import { getProjection } from '../lib/Util';

const selectedOptionsInputType = new GraphQLInputObjectType({
  name: 'selectedOptionsInputType',
  fields: {
    key: { type: GraphQLString },
    value: { type: GraphQLString },
    label: { type: GraphQLString },
    price: { type: GraphQLFloat },
  }
});

const selectedBoolOptionsInputType = new GraphQLInputObjectType({
  name: 'selectedBoolOptionsInputType',
  fields: {
    key: { type: GraphQLString },
    label: { type: GraphQLString },
    price: { type: GraphQLFloat },
  }
});

const menuItemInputTypeFields = {
  _id: { type: new GraphQLNonNull(GraphQLID) },
  title: { type: GraphQLString },
  description: { type: GraphQLString },
  price: { type: GraphQLFloat },
  imgURL: { type: GraphQLString },
  selectedOptions: { type: new GraphQLList(selectedOptionsInputType) },
  selectedBoolOptions: { type: new GraphQLList(selectedBoolOptionsInputType) },
};

const menuItemTypeFields = {
  id: { type: new GraphQLNonNull(GraphQLID) },
  title: { type: GraphQLString },
  description: { type: GraphQLString },
  price: { type: GraphQLFloat },
  imgURL: { type: GraphQLString },
};

const menuItemInputType = new GraphQLInputObjectType({
  name: 'menuItemInputTypeOrder',
  fields: menuItemInputTypeFields
});

const menuItemType = new GraphQLObjectType({
  name: 'menuItemTypeOrder',
  fields: menuItemTypeFields,
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
    comments: { type: GraphQLString },
    kitchenComments: { type: GraphQLString },
    orderSummary: { type: new GraphQLNonNull(OrderSummaryInputType) },
  }
});


const OrderItemType = new GraphQLObjectType({
  name: 'OrderItemType',
  fields: {
    qty: { type: GraphQLFloat },
    itemTotalPrice: { type: GraphQLFloat },
    foodMenuItem: { type: menuItemType },
  }
});

const OrderCompleteType = new GraphQLObjectType({
  name: 'OrderCompleteType',
  fields: {
    _id: { type: GraphQLID },
    local: { type: GraphQLString },
    localComplement: { type: GraphQLString },
    status: { type: GraphQLString },
    totalAmount: { type: GraphQLFloat },
    paymentOption: { type: GraphQLString },
    telephoneNumber: { type: GraphQLString },
    comments: { type: GraphQLString },
    kitchenComments: { type: GraphQLString },
    createdOn: { type: GraphQLFloat },
    items: { type: new GraphQLList(OrderItemType) },
  }
});

const OrderInListType = new GraphQLObjectType({
  name: 'OrderInListType',
  fields: {
    _id: { type: GraphQLID },
    local: { type: GraphQLString },
    localComplement: { type: GraphQLString },
    status: { type: GraphQLString },
    totalAmount: { type: GraphQLFloat },
    createdOn: { type: GraphQLFloat },
    items: { type: new GraphQLList(OrderItemType) },
  }
});

export const Query = {
  orders: {
    type: new GraphQLList(OrderInListType),
    args: {
      createdOn: { type: GraphQLFloat },
      limit: { type: GraphQLFloat },
      orderTypes: { type: new GraphQLList(GraphQLString) },
    },
    resolve: async function(root, { createdOn, limit, orderTypes }, source, fieldASTs) {
      const projection = getProjection(fieldASTs);
      const query = { status: { $in: orderTypes },  createdOn: { $lt: createdOn } };
      return await Order.find(query, projection)
          .sort({ createdOn: -1 })
          .limit(limit)
          .lean();
    }
  },
  orderDetails: {
    type: OrderCompleteType,
    args: {
      orderId: { type: GraphQLID },
    },
    resolve: async function(root, { orderId }, source, fieldASTs) {
      const projection = getProjection(fieldASTs);
      return await Order.findById(orderId, projection).lean();
    }
  }
};

export const Mutation = {
  saveOrder: {
    type: GraphQLString,
    args: { fmiData: { type: OrderRequestInputType } },
    async resolve(value, { fmiData }) {
      await resolvers.saveOrder(fmiData);
      return { msg: 'OK' };
    }
  },
  changeOrderStatus: {
    type: GraphQLString,
    args: {
      orderId: { type: GraphQLID },
      status: { type: GraphQLString },
    },
    async resolve(value, { orderId, status }) {
      const order = await Order.findById(orderId);
      order.status = status;
      await order.save();
      return 'OK';
    }
  },
  changeKitchenComments: {
    type: GraphQLString,
    args: {
      orderId: { type: GraphQLID },
      kitchenComments: { type: GraphQLString },
    },
    async resolve(value, { orderId, kitchenComments }) {
      const order = await Order.findById(orderId);
      order.kitchenComments = kitchenComments;
      await order.save();
      return 'OK';
    }
  },
};
