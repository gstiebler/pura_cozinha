import { Document, Schema, Model, model } from "mongoose";
import * as _ from "lodash";
import * as mongoose from "mongoose";
const ObjectId = Schema.Types.ObjectId;

export type TfmiId = string;

export interface KitchenStock {
  _id: string;
  kitchen: string;
  ingredientType: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const KitchenStockSchema = new Schema({
  kitchen: { type: ObjectId, ref: "kitchen", index: true },
  ingredientType: { type: ObjectId, ref: "ingredientType", index: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const KitchenStock = mongoose.model(
  "KitchenStock",
  KitchenStockSchema
);
