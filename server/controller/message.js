import express from "express";
import isAuth from "../middlewares/isAuth.js";

import { Message, Room } from "../model/index.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .all(isAuth())
  .post(async (req, res) => {
    try {
      const { roomId, userId, username, text } = req.body;
      const message = new Message({
        userId,
        roomId,
        username,
        text,
      });
      await message.save();

      const room = await Room.findById(roomId).exec();
      room.messageIds.push(message._id);
      await room.save();

      // await Promise.all([room.save(), messagePromise]);
      return res.status(200).send({ success: true, message });
    } catch (err) {
      return res.status(400).send({ err });
    }
  });

router
  .route("/:messageId")
  .all(isAuth())
  .post(async (req, res) => {
    try {
      const { userId, username, text, timestamp } = req.body;
      const message = new Message({
        userId,
        username,
        text,
        timestamp,
      });
      await messages.save();

      return res.status(200).send({ success: true, message });
    } catch (err) {
      return res.stats(400).send({ err });
    }
  })
  .get(async (req, res) => {
    try {
      const { messageId } = req.params;
      const message = await Message.findById(messageId).exec();

      return res.status(200).send({ success: true, message });
    } catch (err) {
      return res.stats(400).send({ err });
    }
  })
  .delete(async (req, res) => {
    try {
      const { messageId } = req.params;
      const { n, ok, deletedCount } = await Message.deleteOne({
        id: messageId,
      }).exec();

      if (deletedCount) {
        return res
          .status(200)
          .send({ success: true, message: "Message successfully deleted" });
      } else {
        return res
          .status(400)
          .send({ success: false, message: "Message not found" });
      }
    } catch (err) {
      return res.stats(400).send({ err });
    }
  });

export default router;
