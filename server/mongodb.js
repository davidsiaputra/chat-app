import mongoose from "mongoose";
import pusher from "'./pusher'";
import collections from "./model/types";

const db_url = `mongodb+srv://admin:oWLwdGhxt1rERPy9@cluster0.fq1ip.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(db_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("DB connected");

  const roomsCollection = db.collection(collections.ROOMS);
  const roomsChangeStream = roomsCollection.watch();

  roomsChangeStream.on("change", (change) => {
    const { operationType, fullDocument } = change;

    switch (operationType) {
      case "insert":
        console.log("Insert in rooms collection");
        const { username, text, roomId } = fullDocument;
        pusher.trigger(`rooms-${roomId}`, "updated", {
          username,
          text,
        });

      default:
        console.log(`${operationType} is not handled`);
        return;
    }
  });
});

export default db;
