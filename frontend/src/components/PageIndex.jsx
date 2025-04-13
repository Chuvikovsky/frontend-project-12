import React, { useEffect, useRef, useState } from "react";
// import { Navigate } from "react-router-dom";
import { getChannels, getMessages } from "../utils/requests";
import { useSelector, useDispatch } from "react-redux";
import { addChannel } from "../store/channelsSlice";
import { addMessage } from "../store/messagesSlice";
import { Channels } from "./Channels";
import { Messages } from "./Messages";
import { Header } from "./Header";
import { MessageForm } from "./MessageForm";
import { io } from "socket.io-client";

const socket = io();

const PageIndex = () => {
  // const authHeader = getAuthHeader();
  // if (authHeader === null) {
  //   <Navigate to="/login" />;
  // }

  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channelsList);
  const messages = useSelector((state) => state.messages);
  const inputRef = useRef(null);
  const [isChannelsLoaded, setChannelsLoaded] = useState(false);
  const [isMessagesLoaded, setMessagesLoaded] = useState(false);

  new Promise((resolve) => {
    socket.on("newMessage", (payload) => {
      resolve(payload);
    });
  })
    .then((response) => {
      dispatch(addMessage(response));
    })
    .catch((err) => console.log(err));

  new Promise((resolve) => {
    socket.on("removeChannel", (payload) => {
      resolve(payload); // { id: 6 };
    });
  }).then((response) => {
    console.log(response);
  });

  useEffect(() => {
    getChannels()
      .then((response) => {
        response.data.forEach((ch) => {
          dispatch(addChannel(ch));
        });
        setChannelsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });

    getMessages()
      .then((response) => {
        response.data.forEach((m) => {
          dispatch(addMessage(m));
        });
        setMessagesLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const showChannels = () => {
    if (isChannelsLoaded && isMessagesLoaded) {
      return <Channels channels={channels} inputRef={inputRef} />;
    }
    return null;
  };

  const showMessages = () => {
    if (isChannelsLoaded && isMessagesLoaded) {
      return (
        <Messages messages={messages}>
          <MessageForm inputRef={inputRef} />
        </Messages>
      );
    }
    return null;
  };

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            {showChannels()}
          </div>
          <div className="col p-0 h-100">{showMessages()}</div>
        </div>
      </div>
    </div>
  );
};

export { PageIndex };
