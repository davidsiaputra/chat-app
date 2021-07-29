const app = require('express')();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

app.use(session({
    secret: "add a random secret string here",
    resave: false,
    saveUninitialized: true
}));

mongoose.connect("mongodb://localhost/myapp", {useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connected to DB");
})

const UserSchema = new mongoose.Schema({
    username: {
      type: String, 
      required: true
    },
    hashedPw:{
      type:String, 
      required:true
    }
});

const User = mongoose.model("User", UserSchema);

app.post("/register", async (req, res, next)=>{
    // here, you can get the username and password from req.body in the actual site. Here, we will hardcode the values.
    const username = 'sample'
    const password = 'password'
    const hashedPw = await bcrypt.hash(password, 12);
    const user = await User.create({username, hashedPw})
    await user.save();
    return res.send(user);
});

app.post("/login", async (req, res, next)=>{
    // again here, you would get the username and password from a form in the actual site. Here, we hardcode the values again.
    const username = 'sample';
    const password = 'password';
    const user = await User.findOne({username});
    const matchstatus = await bcrypt.compare(password, user.hashedPw);
    if(matchstatus == true){
      console.log('logged in!'); 
      req.session.user = user;
      return res.send(user);
    }
    else{
      return res.send("Wrong ID or Password");
    }
});

app.post("/logout", (req, res, next)=>{
    req.session.user = null;
    return res.send("DONE");
  });
  

app.listen(3000, ()=>{
   console.log("server running on port 3000"); 
});