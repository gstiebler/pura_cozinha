import * as mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
   name: { 
     type: String,
     required: true
   },
   value: { 
     type: Number,
     required: true
   },
   imgURL: { 
     type: String,
     required: true
   },
});

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);