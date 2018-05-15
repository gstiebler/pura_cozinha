import { Document, Schema, Model, model } from 'mongoose';
import { menuItemSchema } from './menuItem';
import { TOrderStatus } from '../../../../common/Interfaces';
import * as _ from 'lodash';
import * as mongoose from 'mongoose';
const ObjectId = Schema.Types.ObjectId;

const availableUnits = [
  'KG',
  'L',
  'CX',
  'PCT',
  'UN',
  'G',
];
export type TfmiId = string;

export interface IngredientType {
  _id?: TfmiId;
  title: string;
  unit?: string;
}

export interface IIngredient {
  title: string;
  unit?: string;
}

const IngredientSchema = new Schema({
  title: { type: String, required: true },
  unit: { type: String, enum: availableUnits, default: 'KG' },
});

interface IIngredientModel extends IIngredient, Document {}

export const IngredientType: Model<IIngredientModel> = model<IIngredientModel>('IngredientType', IngredientSchema);
