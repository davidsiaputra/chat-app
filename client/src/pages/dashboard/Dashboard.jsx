import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Chat from "../../components/Chat/Chat";
import roomsApi from "../../api/room";

import "./Dashboard.styles.scss";

function Dashboard() {
  const { roomId } = useParams();
  const [currRoom, setCurrRoom] = useState(null);

  useEffect(() => {
    if (roomId) {
      roomsApi.getRoom(roomId).then((room) => {
        setCurrRoom(room);
      });
    }
  }, [roomId]);

  useEffect(() => {}, []);
  return (
    <div className="dashboard">
      <div className="dashboard__body">
        <Sidebar />
        {currRoom ? <Chat currRoom={currRoom} /> : null}
      </div>
    </div>
  );
}

export default Dashboard;
