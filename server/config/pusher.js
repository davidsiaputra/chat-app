import Pusher from "pusher";
import dotenv from "dotenv";
dotenv.config();

const pusher = new Pusher({
  appId: "1245424",
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "us3",
  useTLS: true,
});

export default pusher;
