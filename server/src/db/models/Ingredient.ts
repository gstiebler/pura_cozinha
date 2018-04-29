import { Document, Schema, Model, model } from 'mongoose';
import { menuItemSchema } from './menuItem';
import { TOrderStatus } from '../../../../common/Interfaces';
import {Unit} from './Unit';
import * as _ from 'lodash';
import * as mongoose from 'mongoose';
const ObjectId = Schema.Types.ObjectId;

export type TfmiId = string;

export interface Ingredient {
  _id?: TfmiId;
  title: string;
  amount: number;
  unit?: object;
}

const IngredientSchema = new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  unit: { type: Object }
});


export const Ingredient = mongoose.model('Ingredient', IngredientSchema);
