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

const getRoom = async (roomId) => {
  const result = await axios.get(`/room/${roomId}`);

  const { room, err } = result.data;
  if (!err) {
    return room;
  } else {
    return err;
  }
};

const getRoomMessages = async (roomId) => {
  const result = await axios.get(`/room/${roomId}/messages`);

  const { messages, err } = result.data;
  if (!err) {
    return messages;
  } else {
    return null;
  }
};

const roomsApi = {
  createRoom,
  getRooms,
  getRoom,
  getRoomMessages,
};

export default roomsApi;
