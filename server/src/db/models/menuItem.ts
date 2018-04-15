import * as mongoose from 'mongoose';

export const menuItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imgURL: { type: String, required: true },
  options: [{
    label: { type: String, required: true },
    key: { type: String, required: true },
    optionItems: [{
      label: { type: String, required: true },
      key: { type: String, required: true },
    }],
  }],
  boolOptions: [{
    label: { type: String, required: true },
    key: { type: String, required: true },
  }],
});

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
