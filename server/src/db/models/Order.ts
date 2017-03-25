import * as mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
   user_id: {
     type: String,
     required: true
   },
   kitchen: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Kitchen'
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
   },
   status: {
     type: String,
     required: true
   },
});

export const Order = mongoose.model('Order', OrderSchema);