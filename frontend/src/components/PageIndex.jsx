import React, { useEffect, useRef, useState } from 'react';
// import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { getChannels, getMessages } from '../utils/requests';
import {
  addChannel,
  removeChannel,
  changeChannel,
  renameChannel,
} from '../store/channelsSlice';
import { addMessage } from '../store/messagesSlice';
import { Channels } from './Channels';
import { Messages } from './Messages';
import { MessageForm } from './MessageForm';

const socket = io();

const PageIndex = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channelsList);
  const messages = useSelector((state) => state.messages);
  const inputRef = useRef(null);
  const [isChannelsLoaded, setChannelsLoaded] = useState(false);
  const [isMessagesLoaded, setMessagesLoaded] = useState(false);
  const { t } = useTranslation();

  new Promise((resolve) => {
    socket.on('newMessage', (payload) => {
      resolve(payload);
    });
  })
    .then((response) => {
      dispatch(addMessage(response));
    })
    .catch(() => {
      toast.error(t('addMessageError'));
    });

  new Promise((resolve) => {
    socket.on('removeChannel', (payload) => {
      resolve(payload); // { id: 6 };
    });
  })
    .then((response) => {
      dispatch(removeChannel(response.id));
      dispatch(changeChannel());
    })
    .catch(() => {
      toast.error(t('removeChannelError'));
    });

  new Promise((resolve) => {
    // subscribe rename channel
    socket.on('renameChannel', (payload) => {
      resolve(payload); // { id: 7, name: "new name channel", removable: true }
    });
  })
    .then((response) => {
      dispatch(renameChannel(response));
    })
    .catch(() => {
      toast.error(t('renameChannelError'));
    });

  new Promise((resolve) => {
    // subscribe rename channel
    socket.on('newChannel', (payload) => {
      resolve(payload); // { id: 7, name: "new channel", removable: true }
    });
  })
    .then((response) => {
      dispatch(addChannel(response));
      // dispatch(changeChannel({ channel: response }));
    })
    .catch(() => {
      toast.error(t('newChannelError'));
    });

  useEffect(() => {
    getChannels()
      .then((response) => {
        response.data.forEach((ch) => {
          dispatch(addChannel(ch));
        });
        setChannelsLoaded(true);
      })
      .catch(() => {
        toast.error(t('setChannelsError'));
      });

    getMessages()
      .then((response) => {
        response.data.forEach((m) => {
          dispatch(addMessage(m));
        });
        setMessagesLoaded(true);
      })
      .catch(() => {
        toast.error(t('setMessagesError'));
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
    <>
      <div className="d-flex flex-column h-100">
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
              {showChannels()}
            </div>
            <div className="col p-0 h-100">{showMessages()}</div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export { PageIndex };
