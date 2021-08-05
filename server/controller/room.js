import express from "express";
import Room from "../model/room";

const router = express.Router();

router
  .route("/")
  .post(() => {
    try {
      const { name } = req.body;

      const room = new Room({
        name,
      });
      await room.save();

      return res.status(201).send({ success: true, room });
    } catch (err) {
      return res.status(500).send({ err });
    }
  })
  .get(() => {
    try {
      const rooms = await Room.find();

      return res.status(200).send({ success: true, rooms });
    } catch (err) {
      return res.status(500).send({ err });
    }
  })
  .delete(() => {
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
  .get(() => {
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
  .delete(() => {
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

router.route("/:roomId/messages");
