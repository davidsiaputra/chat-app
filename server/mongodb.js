import mongoose from "mongoose";
import pusher from "'./pusher'";
import collections from "./model/types";

const db_url = "";
mongoose.connect(db_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection(collections.MESSAGES);
  const msgChangeStream = msgCollection.watch();

  msgChangeStream.on("change", (change) => {
    console.log("Change in messages collection", change);

    const { operationType, fullDocument } = change;
    if (operationType === "insert") {
      const { user, text } = fullDocument;
      pusher.trigger("messages", "inserted", {
        name: user,
        text,
      });
    } else {
      console.log("Pusher not triggered");
    }
  });
});

export default db;
