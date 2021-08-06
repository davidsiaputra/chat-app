import axios from "./axios.js";

const createMessage = async ({ roomId, userId, username, text }) => {
  const result = await axios.post("/message", {
    roomId,
    userId,
    username,
    text,
  });

  const { message, err } = result.data;
  if (!err) {
    return message;
  } else {
    return null;
  }
};

const messageApi = {
  createMessage,
};

export default messageApi;
