import * as mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
   order_id: {
     type: String,
     required: true
   },
   food_menu_item_id: {
     type: String,
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