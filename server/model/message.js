import mongoose from "mongoose";
import collections from "./types.js";

const MessageSchema = new mongoose.Schema({
  userId: {
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
  timestamp: {
    type: Date,
    required: true,
  },
});

const Message = mongoose.model(collections.MESSAGES, MessageSchema);

export default Message;
