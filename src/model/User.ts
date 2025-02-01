import { Document, model, Schema } from "mongoose";
import validator from "validator";

interface IUser extends Document {
  email: string;
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: "Please provide valid email",
    },
  },
  username: {
    type: String,
    required: [true, "Please provide username"],
    minlength: 3,
    maxlength: 30,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

export const User = model<IUser>("User", userSchema);
