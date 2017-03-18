import * as mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
   title: { 
     type: String,
     required: true
   },
   description: { 
     type: String,
     required: true
   },
   price: { 
     type: Number,
     required: true
   },
   imgURL: { 
     type: String,
     required: true
   },
});

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);