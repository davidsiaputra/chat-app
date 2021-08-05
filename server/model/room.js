import mongoose from "mongoose";
import collections from "./types";

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  messageIds: [mongoose.Schema.Types.ObjectId],
});

const Room = mongoose.model(collections.ROOMS, RoomSchema);

export default Room;
