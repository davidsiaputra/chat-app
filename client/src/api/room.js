import axios from "./axios.js";

const createRoom = async (roomName) => {
  const result = await axios.post("/room", { roomName });

  const { room, err } = result.data;
  if (!err) {
    return room;
  } else {
    return null;
  }
};
const getRooms = async () => {
  const result = await axios.get("/room");

  const { rooms, err } = result.data;
  if (!err) {
    return rooms;
  } else {
    return err;
  }
};

const roomsApi = {
  createRoom,
  getRooms,
};

export default roomsApi;
