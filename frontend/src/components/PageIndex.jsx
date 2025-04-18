import React, { useEffect, useRef } from 'react';
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
  channelSelectors,
} from '../store/channelsSlice';
import { addMessage, messagesSelectors } from '../store/messagesSlice';
import Channels from './Channels';
import Messages from './Messages';
import MessageForm from './MessageForm';

const socket = io();

const PageIndex = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);
  const inputRef = useRef(null);
  const { t } = useTranslation();

  new Promise((resolve) => {
    socket.on('newMessage', (payload) => {
      resolve(payload);
    });
  })
    .then((response) => {
      console.log('mes-res');
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
    .catch((err) => {
      console.log(err);
      // toast.error(t('removeChannelError'));
    });

  new Promise((resolve) => {
    // subscribe rename channel
    socket.on('renameChannel', (payload) => {
      resolve(payload); // { id: 7, name: "new name channel", removable: true }
    });
  })
    .then((response) => {
      dispatch(renameChannel({ id: response.id, changes: response }));
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
    })
    .catch(() => {
      toast.error(t('newChannelError'));
    });

  useEffect(() => {
    const getData = () => {
      getChannels()
        .then((response) => {
          response.data.forEach((ch) => {
            dispatch(addChannel(ch));
          });
          // setChannelsLoaded(true);
        })
        .then(() => {
          dispatch(changeChannel());
        })
        .catch((e) => {
          console.log(e);
          toast.error(t('setChannelsError'));
        });

      getMessages()
        .then((response) => {
          response.data.forEach((m) => {
            dispatch(addMessage(m));
          });
          // setMessagesLoaded(true);
        })
        .catch((e) => {
          console.log(e);
          toast.error(t('setMessagesError'));
        });
    };
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="d-flex flex-column h-100">
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
              <Channels channels={channels} inputRef={inputRef} />
            </div>
            <div className="col p-0 h-100">
              <Messages messages={messages}>
                <MessageForm inputRef={inputRef} />
              </Messages>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PageIndex;
