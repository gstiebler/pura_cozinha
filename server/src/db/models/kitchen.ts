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
   coordinates: { type: Object }
});

export const Kitchen = mongoose.model('Kitchen', kitSchema);