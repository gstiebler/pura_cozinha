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
   }
});

export const Kitchen = mongoose.model('Kitchen', kitSchema);