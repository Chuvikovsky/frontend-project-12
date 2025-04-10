import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import getAuthHeader from "../utils/authHeader.js";
import axios from "axios";
import routes from "../utils/routes.js";
import { addMessage } from "../store/messagesSlice.js";

const MessageForm = () => {
  const [text, setText] = useState("");
  const channelId = useSelector((state) => state.channels.currentChannelId);
  const username = useSelector((state) => state.auth.username);
  const dispath = useDispatch();
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: text,
      channelId,
      username,
    };
    axios
      .post(routes.messagesPath(), newMessage, { headers: getAuthHeader() })
      .then((response) => {
        dispath(addMessage(response.data));
        setText("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-auto px-5 py-3">
      <form className="py-1 border rounded-2" onSubmit={(e) => handleSubmit(e)}>
        <div className="input-group has-validation">
          <input
            name="body"
            aria-label="Новое сообщение"
            placeholder="Enter your message..."
            className="border-0 p-0 ps-2 form-control"
            value={text}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit" disabled="" className="btn btn-group-vertical">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export { MessageForm };
