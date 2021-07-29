const app = require("express")()
const bcrypt = require("bcrypt");
const router = app.Router();

router.post("/register", async (req, res, next) => {
    const { username, password } = req.body;
    // here, you can get the username and password from req.body in the actual site. Here, we will hardcode the values.
  
    const hashedPw = await bcrypt.hash(password, 12);
    const user = await User.create({ username, hashedPw });
    await user.save();
    return res.send(user);
});
  
router.post("/login", async (req, res, next) => {
    // again here, you would get the username and password from a form in the actual site. Here, we hardcode the values again.
    const username = "sample";
    const password = "password";
    const user = await User.findOne({ username });
    const matchstatus = await bcrypt.compare(password, user.hashedPw);
    if (matchstatus == true) {
      console.log("logged in!");
      req.session.user = user;
      return res.send(user);
    } else {
      return res.send("Wrong ID or Password");
    }
});
  
router.post("/logout", (req, res, next) => {
    req.session.user = null;
    return res.send("DONE");
});

module.exports = router;