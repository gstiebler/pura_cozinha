import * as mongoose from 'mongoose';

const kitSchema = new mongoose.Schema({
   name: {
     type: String,
     required: true
   },
   address: {
     type: String,
     required: true
   },
   coordinates: { 
     lat: { type: Number },
     lng: { type: Number }
   },
   telegram_username: { type: String },
   phone_number: { type: String },
   active: { type: String },
   stock: { type: Object }
});

export const Kitchen = mongoose.model('Kitchen', kitSchema);