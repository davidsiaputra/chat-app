import mongoose from "mongoose";
import db from "../config/mongodb.js";
import collections from "./types.js";

const MessageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // add createdAt and updatedAt timestamo
  }
);

const Message = db.model(collections.MESSAGES, MessageSchema);

export default Message;
