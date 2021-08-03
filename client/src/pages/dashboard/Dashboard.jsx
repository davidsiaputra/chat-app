import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Chat from "../../components/Chat/Chat";

import "./Dashboard.styles.scss";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Dashboard;
