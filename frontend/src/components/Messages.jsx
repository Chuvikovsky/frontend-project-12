import React from "react";
import { useSelector } from "react-redux";

const showCurrentChannel = (channel) => {
  if (channel === null) {
    return null;
  }
  return <b># {channel.name}</b>;
};

const showMessages = (messages) => {
  if (messages.length) {
    return (
      <ul className="nav">
        {messages.map((m) => (
          <li key={m.id} className="w-100">
            <span>{m.username}:</span> {m.body}
          </li>
        ))}
      </ul>
    );
  }
  return null;
};

const Messages = ({ messages, children }) => {
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const filteredMessages = messages.messagesList.filter(
    (m) => m.channelId === currentChannel.id
  );

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        {showCurrentChannel(currentChannel)}
        <br />
        {filteredMessages.length} message
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {showMessages(filteredMessages)}
      </div>
      {children}
    </div>
  );
};

export { Messages };
