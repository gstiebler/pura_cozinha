import * as mongoose from 'mongoose';

export const Kitchen = mongoose.model('Kitchen', {
   name: String,
   address: String,
   coordinates: Object
});