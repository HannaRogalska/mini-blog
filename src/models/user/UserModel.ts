import { Schema, model} from "mongoose";
import type {IUser} from "./userType"

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  refreshToken: { type: String},
});

const User = model<IUser>("User", userSchema);
export default User;