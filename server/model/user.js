import mongoose from "mongoose";
import collections from "./types";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  hashedPw: {
    type: String,
    required: true,
  },
});

const User = mongoose.model(collections.USERS, UserSchema);

export default User;
