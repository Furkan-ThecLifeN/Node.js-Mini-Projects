import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "İsim gerekli"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email gerekli"],
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Geçerli bir email girin"],
    },
    age: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
