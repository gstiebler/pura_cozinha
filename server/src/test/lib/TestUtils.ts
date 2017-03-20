import * as mongoose from 'mongoose';

export async function idByValue(model: mongoose.Model<mongoose.Document>,
                                fieldName: string,
                                value: any): Promise<string> {
  const record = await model.findOne({ [fieldName]: value });
  return record._id;
}