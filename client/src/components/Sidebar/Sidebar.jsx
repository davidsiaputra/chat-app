import React, { useState, useEffect } from "react";
import Pusher from "pusher-js";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

import SidebarRoom from "../SidebarRoom/SidebarRoom";

import "./Sidebar.scss";
import roomsApi from "../../api/room";

function Sidebar() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    roomsApi.getRooms().then((rooms) => {
      setRooms(rooms);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("474c37c4f9b392bf35fa", {
      cluster: "us3",
    });

    const channel = pusher.subscribe(`rooms`);
    channel.bind("insert", function (newRoom) {
      setRooms([...rooms, newRoom]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [rooms]);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__headerIcons">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarRoom addNewRoom={true} />
        {rooms.map((room) => (
          <SidebarRoom key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
