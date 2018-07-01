import * as mongoose from 'mongoose';

export interface Kitchen extends mongoose.Document {
  name: string;
  address: string;
  coordinates: { 
    lat: number,
    lng: number
  };
  telegramUsernames: [string];
  phoneNumber: string;
  active: boolean;
  stock: {
    menu_item: string;
    quantity: number;
  }[];
}

const kitSchema = new mongoose.Schema({
   name: { type: String, required: true },
   address: { type: String, required: true },
   coordinates: { 
     lat: { type: Number },
     lng: { type: Number }
   },
   telegramUsernames: [{ type: String }],
   phoneNumber: { type: String },
   active: { type: Boolean },
   stock: { type: Object }
});

interface IKitchenModel extends Kitchen, Document {};

export const Kitchen: mongoose.Model<IKitchenModel> = mongoose.model<IKitchenModel>('Kitchen', kitSchema);

export default Kitchen;