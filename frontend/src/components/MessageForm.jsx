import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../store/messagesSlice.js";
import { sendMessageRequest } from "../utils/requests.js";
import { useTranslation } from "react-i18next";
import filter from "../utils/profany.js";

const MessageForm = ({ inputRef }) => {
  const [text, setText] = useState("");
  const dispath = useDispatch();
  const channelId = useSelector((state) => state.channels.currentChannel.id);
  const username = useSelector((state) => state.auth.username);
  const { t } = useTranslation();
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: filter(text),
      channelId,
      username,
    };
    sendMessageRequest(newMessage) // promise
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
            placeholder={t("enterYourMessage")}
            className="border-0 p-0 ps-2 form-control outline-secondary"
            value={text}
            onChange={(e) => handleChange(e)}
            ref={inputRef}
          />
          <button
            type="submit"
            disabled=""
            className="btn btn-group-vertical btn-outline-secondary"
          >
            {"=>"}
          </button>
        </div>
      </form>
    </div>
  );
};

export { MessageForm };
