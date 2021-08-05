import express from "express";

import { Message } from "../model/index.js";

const router = express.Router();

router
  .route("/:messageId")
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
