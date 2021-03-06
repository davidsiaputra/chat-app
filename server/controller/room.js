import express from "express";
import Room from "../model/room.js";
import Message from "../model/message.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .all(isAuth())
  .post(async (req, res) => {
    try {
      const { roomName } = req.body;

      const room = new Room({
        name: roomName,
      });
      await room.save();

      return res.status(201).send({ success: true, room });
    } catch (err) {
      return res.status(500).send({ err });
    }
  })
  .get(async (req, res) => {
    try {
      const rooms = await Room.find().exec();

      return res.status(200).send({ success: true, rooms });
    } catch (err) {
      return res.status(500).send({ err });
    }
  })
  .delete(async (req, res) => {
    try {
      const { n, ok, deletedCount } = await Room.deleteMany().exec();

      if (ok) {
        return res.status(200).send({ success: true, deletedCount, n });
      } else {
        return res
          .status(400)
          .send({ success: false, message: "Failed to delete" });
      }
    } catch (err) {
      return res.status(500).send({ err });
    }
  });

router
  .route("/:roomId")
  .all(isAuth())
  .get(async (req, res) => {
    try {
      const { roomId } = req.params;
      const room = await Room.findById(roomId).exec();

      if (room) {
        return res.status(200).send({ success: true, room });
      } else {
        return res
          .status(400)
          .send({ success: false, message: "Room does not exists" });
      }
    } catch (err) {
      return res.status(500).send({ err });
    }
  })
  .delete(async (req, res) => {
    try {
      const { roomId } = req.params;
      const { n, ok, deletedCount } = await Room.deleteOne({
        id: roomId,
      }).exec();

      if (ok) {
        return res.status(200).send({ success: true, deletedCount, n });
      } else {
        return res
          .status(400)
          .send({ success: false, message: "Failed to delete" });
      }
    } catch (err) {
      return res.status(500).send({ err });
    }
  });

router
  .route("/:roomId/messages")
  .all(isAuth())
  .get(async (req, res) => {
    try {
      const { roomId } = req.params;
      const room = await Room.findById(roomId).exec();
      if (!room) {
        return res.status(400).send({ err: "Room not found" });
      }

      const messages = await Message.find({
        _id: { $in: room.messageIds },
      })
        .sort("createdAt")
        .exec();

      return res.status(200).send({ messages, success: true });
    } catch (err) {
      return res.status(500).send({ err });
    }
  });

router.route("/:roomId/messages");

export default router;
