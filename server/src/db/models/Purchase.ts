import * as mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

export interface Purchase extends mongoose.Document {
  _id: string,
  ingredientType: any;
  quantity: number;
  value: number;
  buyDate: Date;
  createdAt: Date;
}

const purchaseSchema = new mongoose.Schema({
  ingredientType: { type: ObjectId, ref: 'IngredientType', index: true },
  quantity: { type: Number, required: true },
  value: { type: Number, required: true },
  buyDate: { type: Date, default: Date.now, required: true},
  createdAt: { type: Date, default: Date.now, required: true },
});

export const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;