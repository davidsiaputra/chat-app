const app = require("express");
const bcrypt = require("bcryptjs");
const router = app.Router();
const User = require("../model/user");

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({ username, email, hashedPw });

    await user.save();
    return res
      .status(200)
      .send({ sucess: true, user: { id: user._id, username: user.username } });
  } catch (err) {
    return res.status(400).send({ err });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    // hashedPw is `salt with hash attached to it
    const passwordMatched = await bcrypt.compare(password, user.hashedPw);

    if (user && passwordMatched) {
      req.session.user = user;
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

router.post("/logout", (req, res, next) => {
  req.session.user = null;
  return res.send("DONE");
});

module.exports = router;
