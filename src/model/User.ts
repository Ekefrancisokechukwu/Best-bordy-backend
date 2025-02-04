import { Document, model, Schema } from "mongoose";
import validator from "validator";
import bycrypt from "bcryptjs";

interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
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
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bycrypt.genSalt(12);
  this.password = await bycrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isMatch = await bycrypt.compare(candidatePassword, this.password);
  return isMatch;
};
const User = model<IUser>("User", userSchema);

export default User;
