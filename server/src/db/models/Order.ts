import { Document, Schema, Model, model } from 'mongoose';
import { menuItemSchema } from './menuItem';
const ObjectId = Schema.Types.ObjectId;

export interface IOrder {
  userId: string;
  local: string;
  localComplement: string;
  status?: 'PENDING' | 'DELIVERED' | 'CANCELED';
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
    };
  }[];
  createdOn?: Date;
}

const completeMenuItemSchema = {
  id: { type: ObjectId, ref: 'MenuItem', index: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
};

const OrderSchema = new Schema({
  userId: { type: String, required: true },
  local: { type: String, required: true },
  localComplement: { type: String },
  status: { type: String, enum: ['PENDING', 'DELIVERED', 'CANCELED'], default: 'PENDING' },
  paymentOption: { type: String, enum: ['Dinheiro', 'Cartão'], required: true },
  telephoneNumber: { type: String },
  totalAmount: { type: Number, required: true },
  items: [{
    qty: { type: Number, required: true },
    itemTotalPrice: { type: Number, required: true },
    foodMenuItem: completeMenuItemSchema,
  }],
  createdOn: { type: Date, default: Date.now },
});

interface IOrderModel extends IOrder, Document {}

export const Order: Model<IOrderModel> = model<IOrderModel>('Order', OrderSchema);
