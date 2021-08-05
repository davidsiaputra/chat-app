import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Pusher from "pusher-js";

import SignInPage from "./pages/sign-in/sign-in.component";
import SignUpPage from "./pages/sign-up/sign-up.component";
import Homepage from "./pages/homepage/homepage.component";
import Dashboard from "./pages/dashboard/Dashboard";

import axios from "./axios";

import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("474c37c4f9b392bf35fa", {
      cluster: "us3",
    });

    const channel = pusher.subscribe(`rooms-${roomId}`);
    channel.bind("updated", function (newMessage) {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/" component={Homepage} />
      </Switch>
    </div>
  );
}

export default App;
