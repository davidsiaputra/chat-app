import mongoose from "mongoose";
import pusher from "./pusher.js";
import collections from "../model/types.js";

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
    switch (change.operationType) {
      case "insert": {
        console.log("Insert in rooms collection");

        pusher.trigger("rooms", "insert", change.fullDocument);
        break;
      }

      case "update": {
        console.log("Update in rooms collection");

        const { documentKey } = change;
        pusher.trigger(`rooms-${documentKey._id}}`, "updated", {});
      }

      default:
        console.log(`${change.operationType} is not handled`);
        return;
    }
  });
});

export default db;
