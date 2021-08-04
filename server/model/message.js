import mongoose from "mongoose";
import collections from "./types";

const MessageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  username: {
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
