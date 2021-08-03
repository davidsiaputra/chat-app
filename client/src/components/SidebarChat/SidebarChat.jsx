import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";

import "./SidebarChat.scss";

function SidebarChat({ addNewChat, lastMessage }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(1000 * Math.random()));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      // Do Things
    }
  };

  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarChat__info">
        {/* <h2>{roomName}</h2> */}
        <p>{lastMessage}</p>
      </div>
    </div>
  ) : (
    <div className="sidebarChat" onClick={createChat}>
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
