import React from "react";

const showMessages = (messages) => {
  if (messages && messages.length) {
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
  return <span>0 messages</span>;
};

const Messages = ({ messages, children }) => {
  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small"></div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {showMessages(messages)}
      </div>
      {children}
    </div>
  );
};

export { Messages };
