import * as mongoose from 'mongoose';
import { menuItemSchema } from './menuItem';
const ObjectId = mongoose.Schema.Types.ObjectId;

const completeMenuItemSchema = {
  id: { type: ObjectId, ref: 'MenuItem', index: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
};

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  local: { type: String, required: true },
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

export const Order = mongoose.model('Order', OrderSchema);
