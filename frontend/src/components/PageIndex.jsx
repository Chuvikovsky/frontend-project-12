import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import routes from "../utils/routes";
import getAuthHeader from "../utils/authHeader";
import { useSelector, useDispatch } from "react-redux";
import { addChannel } from "../store/channelsSlice";
import { addMessage } from "../store/messagesSlice";
import { Channels } from "./Channels";
import { Messages } from "./Messages";
import { Container } from "react-bootstrap";
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

  new Promise((resolve) => {
    socket.on("newMessage", (payload) => {
      resolve(payload);
    });
  })
    .then((response) => {
      dispatch(addMessage(response));
    })
    .catch((err) => console.log(err));

  useEffect(() => {
    axios
      .get(routes.channelsPath(), { headers: getAuthHeader() })
      .then((response) => {
        response.data.forEach((ch) => {
          dispatch(addChannel(ch));
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(routes.messagesPath(), { headers: getAuthHeader() })
      .then((response) => {
        response.data.forEach((m) => {
          dispatch(addMessage(m));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <Channels channels={channels} />
          </div>
          <div className="col p-0 h-100">
            <Messages messages={messages}>
              <MessageForm />
            </Messages>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PageIndex };
