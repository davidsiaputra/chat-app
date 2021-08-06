import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { Avatar, IconButton } from "@material-ui/core";
import Pusher from "pusher-js";
import {
  SearchOutlined,
  AttachFile,
  MoreVert,
  InsertEmoticon,
  Mic,
} from "@material-ui/icons";
import roomsApi from "../../api/room";

import "./Chat.scss";
import messageApi from "../../api/message";

function Chat({ currRoom }) {
  const { _id, name } = currRoom;
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = (event) => {
    event.preventDefault();

    messageApi
      .createMessage({
        roomId: _id,
        userId: "610b36859c7297d9d864335a",
        username: "test",
        text: input,
      })
      .then((message) => {
        if (message) {
          alert("SUCCESS");
        } else {
          alert("FAILED");
        }
      });

    setInput("");
  };

  useEffect(() => {
    setSeed(_id);
    roomsApi.getRoomMessages(_id).then((messages) => {
      if (messages) {
        setMessages(messages);
      }
    });
  }, [_id]);

  useEffect(() => {
    const pusher = new Pusher("474c37c4f9b392bf35fa", {
      cluster: "us3",
    });

    const channel = pusher.subscribe(`rooms-${_id}`);
    channel.bind("insert", function (newMessage) {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [messages, _id]);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{name}</h3>
          <p>
            {messages.length != 0
              ? DateTime.fromISO(
                  messages[messages.length - 1].createdAt
                ).toLocaleString(DateTime.TIME_SIMPLE)
              : "Unknown"}
          </p>
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
        {messages.map(({ _id, userId, username, text, createdAt }) => (
          <p key={_id} className={`chat__message ${true && "chat__receiver"}`}>
            <span className="chat__name">{username}</span>
            {text}
            <span className="chat__timestamp">
              {DateTime.fromISO(createdAt).toLocaleString(DateTime.TIME_SIMPLE)}
            </span>
          </p>
        ))}
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
