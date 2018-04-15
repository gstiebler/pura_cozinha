import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

interface IUserModel extends mongoose.Document {
  login: string;
  name: string;
  role: string;
  password: string;
  token: string;
  setPassword(newPassword: string);
  passwordMatch(password: string): boolean;
}

const userSchema = new mongoose.Schema({
   login: {
     type: String,
     required: true
   },
   password: {
     type: String,
     required: true
   },
   name: {
     type: String,
     required: true
   },
   token: {
    type: String,
   },
   role: {
     type: String,
     required: true
   },
});

userSchema.methods.setPassword = function(newPassword: string) {
  this.password = bcrypt.hashSync(newPassword, 10);
};

userSchema.methods.passwordMatch = function(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
};

export const User = mongoose.model<IUserModel>('User', userSchema);