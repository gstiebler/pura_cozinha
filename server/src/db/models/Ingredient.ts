import { Document, Schema, Model, model } from 'mongoose';
import { menuItemSchema } from './menuItem';
import { TOrderStatus } from '../../../../common/Interfaces';
import {Unit} from './Unit';
import * as _ from 'lodash';
const ObjectId = Schema.Types.ObjectId;

export interface Ingredient {
  title: string;
  amount: number;
  unit?: object;
}

const IngredientSchema = new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  unit: { type: Object }
});

interface IIngredientModel extends Ingredient, Document {}

export const Ingredient: Model<IIngredientModel> = model<IIngredientModel>('Ingredient', IngredientSchema);
