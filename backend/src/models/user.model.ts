import mongoose, { Document, Schema } from "mongoose";

//define user object
export interface IUser extends Document {
  name: string;
  dob: Date;
  email: string;
  isVerified: boolean;
}

//create user schema
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    dob: { type: Date, required: false },
    email: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
