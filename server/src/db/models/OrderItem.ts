import * as mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
   order_id: {
     type: mongoose.Schema.Types.ObjectId,
     required: true
   },
   food_menu_item_id: {
     type: mongoose.Schema.Types.ObjectId,
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