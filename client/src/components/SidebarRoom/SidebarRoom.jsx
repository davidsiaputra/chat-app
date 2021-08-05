import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";

import "./SidebarRoom.scss";
import roomsApi from "../../api/room";

function SidebarRoom({ room, addNewRoom, lastMessage }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(1000 * Math.random()));
  }, []);

  const createRoom = () => {
    const roomName = prompt("Please enter name for room");

    if (roomName) {
      roomsApi.createRoom(roomName).then(() => {
        alert("Successfully created");
      });
    }
  };

  return !addNewRoom ? (
    <div className="sidebarRoom">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarRoom__info">
        <h2>{room.name}</h2>
        <p>{lastMessage}</p>
      </div>
    </div>
  ) : (
    <div className="sidebarRoom" onClick={createRoom}>
      <h2>Add new Room</h2>
    </div>
  );
}

export default SidebarRoom;
