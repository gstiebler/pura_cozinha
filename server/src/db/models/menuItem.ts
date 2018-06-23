import { Schema, Model, model } from 'mongoose';
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


export interface MenuItem {
  title: string;
  description: string;
  price: number;
  imgURL: string;
  options: {
    label: string;
    key: string;
    optionItems: {
      label: string;
      key: string;
      price: number;
    }[];
  }[];
  boolOptions: {
    label: string;
    key: string;
    price: number;
  }[];
  usedIngredients: {
    ingredient: string;
    quantity: number;
  }[];
}

interface IMenuItemModel extends MenuItem, Document {}

export const MenuItem = model('MenuItem', menuItemSchema);
