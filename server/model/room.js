import mongoose from "mongoose";
import db from "../mongodb.js";
import collections from "./types.js";

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  messageIds: [mongoose.Schema.Types.ObjectId],
});

const Room = db.model(collections.ROOMS, RoomSchema);

export default Room;
