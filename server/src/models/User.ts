import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  totpSecret: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  totpSecret: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IUser>("User", userSchema);
