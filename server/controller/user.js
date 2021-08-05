import express from "express";
import bcrypt from "bcryptjs";
import User from "../model/user.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPw = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      hashedPw,
    });

    console.log(user);
    return res.status(200).send({ user });
  } catch (err) {
    return res.status(400).send({ err });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("test2");
    const { username, password } = req.body;

    console.log("test");

    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res
        .status(400)
        .send({ success: false, message: "User not found" });
    }

    console.log("test1");

    // hashedPw is `salt with hash attached to it
    const passwordMatched = await bcrypt.compare(password, user.hashedPw);

    if (user && passwordMatched) {
      // req.session.user = user;
      return res.send(user);
    } else {
      return res
        .status(200)
        .send({ success: false, message: "Wrong username or password" });
    }
  } catch (err) {
    return res.status(400).send({ err });
  }
});

router.post("/logout", (req, res) => {
  try {
    req.session.user = null;
    return res.send({ success: true });
  } catch (err) {
    res.status(500).send({ err });
  }
});

export default router;
