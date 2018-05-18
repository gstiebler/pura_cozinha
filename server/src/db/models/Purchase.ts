import * as mongoose from 'mongoose';

export interface Purchase extends mongoose.Document {
  _id: string,
  ingredientType: {
    id: string;
  }
  quantity: number;
  value: number;
  buyDate: Date;
  createdAt: Date;
}

const purchaseSchema = new mongoose.Schema({
  ingredientType: { type: Object },
  quantity: { type: Number, required: true },
  value: { type: Number, required: true },
  buyDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;