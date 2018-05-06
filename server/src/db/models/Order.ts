import { Document, Schema, Model, model } from 'mongoose';
import { menuItemSchema } from './menuItem';
import { TOrderStatus } from '../../../../common/Interfaces';
import * as _ from 'lodash';
const ObjectId = Schema.Types.ObjectId;
const availableStatuses = [
  'PENDING',
  'PREPARING',
  'DELIVERING',
  'DELIVERED',
  'CANCELED',
];

export interface IOrder {
  userId: string;
  local: string;
  localComplement: string;
  comments: string;
  kitchenComments: string;
  status?: TOrderStatus;
  paymentOption: 'Dinheiro' | 'Cartão';
  telephoneNumber: string;
  totalAmount: number;
  items: {
    qty: number;
    itemTotalPrice: number;
    foodMenuItem: {
      id: any;
      title: string;
      description: string;
      price: number;
      selectedOptions?: {
        optionKey: string;
        selectedOptionItemKey: string;
      }[];
      selectedBoolOptions?: {
        optionKey: string;
        value: boolean;
      }[];
    };
  }[];
  statusHistory: {
    status: TOrderStatus;
    updatedOn: Date;
  }[];
  createdOn?: Date;
}

const completeMenuItemSchema = {
  id: { type: ObjectId, ref: 'MenuItem', index: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  selectedOptions: [{
    optionKey: { type: String, required: true },
    selectedOptionItemKey: { type: String, required: true },
  }],
  selectedBoolOptions: [{
    optionKey: { type: String, required: true },
    value: { type: Boolean, required: true },
  }],
};

const OrderSchema = new Schema({
  userId: { type: String, required: true },
  local: { type: String, required: true },
  localComplement: { type: String },
  comments: { type: String },
  kitchenComments: { type: String, required: false },
  status: { type: String, enum: availableStatuses, default: 'PENDING' },
  paymentOption: { type: String, enum: ['Dinheiro', 'Cartão'], required: true },
  telephoneNumber: { type: String },
  totalAmount: { type: Number, required: true },
  items: [{
    qty: { type: Number, required: true },
    itemTotalPrice: { type: Number, required: true },
    foodMenuItem: completeMenuItemSchema,
  }],
  createdOn: { type: Date, default: Date.now },
  statusHistory: [{
    status: { type: String, enum: availableStatuses },
    updatedOn: { type: Date, default: Date.now },
  }],
});

OrderSchema.pre('save', function (next) {
  try {
    if (_.isEmpty(this.statusHistory)) {
      this.statusHistory = [];
    }
    this.statusHistory.push({
      status: this.status,
      updatedOn: Date.now,
    });
    next();
  } catch(err) {
    next(err);
  }
});

interface IOrderModel extends IOrder, Document {}

export const Order: Model<IOrderModel> = model<IOrderModel>('Order', OrderSchema);
