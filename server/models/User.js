import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    enum: ["male", "female"],
  },
  genderPreference: {
    type: String,
    required: true,
    trim: true,
    enum: ["male", "female", "both"],
  },
  bio: { type: String, default: "" },
  image: { type: String, default: "" },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dislikes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  matches: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
}, {timestamps: true});

// userSchema.pre("save", async function(next) {
//     this.password = bcrypt.hash(this.password, 10);
//     next();
// })


// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password)
// }

const User = model("User", userSchema)
export default User;
