import * as mongoose from 'mongoose';

export interface Unit {
  title: string;
}

export const unitSchema = new mongoose.Schema({
  title: { type: String, required: true },
});

export const MenuItem = mongoose.model('Unit', unitSchema);
