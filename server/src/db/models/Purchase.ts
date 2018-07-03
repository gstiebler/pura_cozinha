import * as mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

export interface Purchase extends mongoose.Document {
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
interface IPurchaseModel extends Purchase, Document {}

export const Purchase: mongoose.Model<IPurchaseModel> = mongoose.model<IPurchaseModel>('Purchase', purchaseSchema);

export default Purchase;