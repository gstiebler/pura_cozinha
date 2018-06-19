import { Schema, model } from 'mongoose';
const ObjectId = Schema.Types.ObjectId;

export const menuItemSchema = new Schema({
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
      price: { type: Number, required: true },
    }],
  }],
  boolOptions: [{
    label: { type: String, required: true },
    key: { type: String, required: true },
    price: { type: Number, required: true },
  }],
  usedIngredients: [{
    ingredient: { type: ObjectId, ref: 'IngredientType', required: true },
    quantity: { type: Number, required: true },
  }],
});

export const MenuItem = model('MenuItem', menuItemSchema);
