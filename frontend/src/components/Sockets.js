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
  }
  catch {
    toast.error(t('newChannelError'), { toastId: 'socket', containerId: 'networkError' });
  }

  // new Promise((resolve) => {
  //   socket.on('newChannel', (payload) => {
  //     resolve(payload);
  //   });
  // })
  //   .then((response) => {
  //     dispatch(addChannel(response));
  //   })
  //   .catch(() => {
  //     toast.error(t('newChannelError'), { toastId: 'newChannel', containerId: 'networkError' });
  //   });

  // new Promise((resolve) => {
  //   socket.on('newMessage', (payload) => {
  //     resolve(payload);
  //   });
  // })
  //   .then((response) => {
  //     dispatch(addMessage(response));
  //   })
  //   .catch(() => {
  //     toast.error(t('addMessageError'), { toastId: 'newMessage', containerId: 'networkError' });
  //   });

  // new Promise((resolve) => {
  //   socket.on('removeChannel', (payload) => {
  //     resolve(payload);
  //   });
  // })
  //   .then((response) => {
  //     dispatch(removeChannel(response.id));
  //     dispatch(changeChannel());
  //   })
  //   .catch(() => {
  //     toast.error(t('removeChannelError'), { toastId: 'removeChannel', containerId: 'networkError' });
  //   });

  // new Promise((resolve) => {
  //   socket.on('renameChannel', (payload) => {
  //     resolve(payload);
  //   });
  // })
  //   .then((response) => {
  //     dispatch(renameChannel({ id: response.id, changes: response }));
  //   })
  //   .catch(() => {
  //     toast.error(t('renameChannelError'), { toastId: 'renameChannel', containerId: 'networkError' });
  //   });

  return children;
};

export default Sockets;
