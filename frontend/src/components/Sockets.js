import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { addMessage } from '../store/messagesSlice';
import {
  addChannel,
  removeChannel,
  changeChannel,
  renameChannel,
} from '../store/channelsSlice';

const Sockets = ({ children }) => {
  const socket = io();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  try {
    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
    });
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload.id));
      dispatch(changeChannel());
    });
    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel({ id: payload.id, changes: payload }));
    });
  } catch {
    toast.error(t('newChannelError'), { toastId: 'socket', containerId: 'networkError' });
  }

  return children;
};

export default Sockets;
