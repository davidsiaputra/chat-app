import express from "express";
import bcrypt from "bcryptjs";

import redisClient from "../config/redis.js";
import User from "../model/user.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (await User.find({ username }).exec()) {
      return res.status(400).send({ user: null, message: "Username is used" });
    }

    const hashedPw = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      hashedPw,
    });

    if (!user) {
      return res.status(200).send({ user, message: "Failed to create user" });
    }

    return res.status(200).send({ user });
  } catch (err) {
    return res.status(400).send({ err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "User not found" });
    }

    // hashedPw is `salt with hash attached to it
    const passwordMatched = await bcrypt.compare(password, user.hashedPw);

    if (passwordMatched) {
      // req.session.save(() => {
      user.hashedPw = null;
      req.session.user = user;
      return res.status(200).send({ user });
      // });
    } else {
      return res
        .status(200)
        .send({ success: false, message: "Wrong username or password" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err });
  }
});

router.post("/logout", async (req, res) => {
  try {
    if (req.session.user) {
      req.session.destroy(() => {
        return res.send({ success: true });
      });
    } else {
      console.log("NOT LOGGED IN");
    }
  } catch (err) {
    res.status(500).send({ err });
  }
});

export default router;
