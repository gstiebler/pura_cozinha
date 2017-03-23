import * as mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
   user_id: {
     type: String,
     required: true
   },
   kitchen_id: {
     type: String,
     required: true
   },
   total_paid: {
     type: Number,
     required: true
   },
   datetime: {
     type: Date,
     required: true
   },
   items: {
     type: Array,
     required: true
   }
});

export const Order = mongoose.model('Order', OrderSchema);