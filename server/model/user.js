import mongoose from "mongoose";
import db from "../config/mongodb.js";
import collections from "./types.js";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  hashedPw: {
    type: String,
    required: true,
  },
});

const User = db.model(collections.USERS, UserSchema);

export default User;
