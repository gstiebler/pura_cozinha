import * as mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
   order: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Order',
     required: true
   },
   food_menu_item: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'MenuItem',
     required: true
   },
   quantity: {
     type: Number,
     required: true
   },
   item_title: {
     type: String,
     required: true
   },
   price: {
     type: Number,
     required: true
   },
});

export const OrderItem = mongoose.model('OrderItem', OrderItemSchema);