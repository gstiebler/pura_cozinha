import * as mongoose from 'mongoose';

export interface GeneralConfig extends mongoose.Document {
  key: string;
  value: string;
}

const generalConfigSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true },
});
interface IGeneralConfigModel extends GeneralConfig, Document {}

export const GeneralConfig: mongoose.Model<IGeneralConfigModel> = mongoose.model<IGeneralConfigModel>('GeneralConfig', generalConfigSchema);

export default GeneralConfig;