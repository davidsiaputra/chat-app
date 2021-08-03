import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import {
  SearchOutlined,
  AttachFile,
  MoreVert,
  InsertEmoticon,
  Mic,
} from "@material-ui/icons";

import "./Chat.scss";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    setSeed(Math.floor(1000 * Math.random()));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    console.log("Yout typed", input);

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        <p className={`chat__message ${true && "chat__receiver"}`}>
          <span className="chat__name">Apik</span>
          Hey guys
          <span className="chat__timestamp">3:52pm</span>
        </p>
        <p className="chat__message">Hey guys</p>
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form action="">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
