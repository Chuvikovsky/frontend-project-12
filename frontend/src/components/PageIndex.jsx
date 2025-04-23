import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { getChannels, getMessages } from '../utils/requests';
import {
  addChannel,
  changeChannel,
  channelSelectors,
} from '../store/channelsSlice';
import { addMessage, messagesSelectors } from '../store/messagesSlice';
import Channels from './Channels';
import Messages from './Messages';
import MessageForm from './MessageForm';

const PageIndex = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);
  const inputRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const getData = () => {
      getChannels()
        .then((response) => {
          response.data.forEach((ch) => {
            dispatch(addChannel(ch));
            dispatch(changeChannel());
          });
        })
        .catch((e) => {
          console.log(e);
          toast.error(t('setChannelsError'), { toastId: 'setChannelsError', containerId: 'networkError' });
        });

      getMessages()
        .then((response) => {
          response.data.forEach((m) => {
            dispatch(addMessage(m));
          });
        })
        .catch((e) => {
          console.log(e);
          toast.error(t('setMessagesError'), { toastId: 'setMessagesError', containerId: 'networkError' });
        });
    };
    getData();
  }, [dispatch, t]);

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
      <ToastContainer containerId="networkError" />
    </>
  );
};

export default PageIndex;
