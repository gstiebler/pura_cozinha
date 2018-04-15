import * as mongoose from 'mongoose';

export interface IKitchenModel extends mongoose.Document {
  id: string,
  name: string;
  address: string;
  coordinates: { 
    lat: number,
    lng: number
  };
  telegramUsernames: [string];
  phoneNumber: string;
  active: boolean;
  stock: object;
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

export const Kitchen = mongoose.model('Kitchen', kitSchema);

export default Kitchen;