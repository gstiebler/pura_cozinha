import * as mongoose from 'mongoose';

export interface Unit {
  _id: string;
  title: string;
}

export const unitSchema = new mongoose.Schema({
  title: { type: String, required: true },
});

export const Unit = mongoose.model('Unit', unitSchema);
