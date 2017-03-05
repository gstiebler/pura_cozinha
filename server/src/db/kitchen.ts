import * as mongoose from 'mongoose';

export const Kitchen = mongoose.model('Kitchen', {
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