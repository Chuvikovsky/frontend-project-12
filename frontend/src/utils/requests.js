import axios from 'axios';
import routes from './routes.js';
import getAuthHeader from './authHeader.js';

const logInRequest = (values) => axios.post(routes.loginPath(), values);

const signupRequest = (values) => axios.post(routes.signupPath(), values);

const getChannels = () =>
  axios.get(routes.channelsPath(), { headers: getAuthHeader() });

const getMessages = () =>
  axios.get(routes.messagesPath(), { headers: getAuthHeader() });

const sendMessageRequest = (message) =>
  axios.post(routes.messagesPath(), message, {
    headers: getAuthHeader(),
  });

const addChannelRequest = (channelname) => {
  const newChannel = { name: channelname };
  return axios.post(routes.channelsPath(), newChannel, {
    headers: getAuthHeader(),
  });
};

const removeChannelRequest = (channelId) =>
  axios.delete(`${routes.channelsPath()}/${channelId}`, {
    headers: getAuthHeader(),
  });

const renameChannelRequest = ({ channelId, channelname }) => {
  const newChannelName = { name: channelname };
  return axios.patch(`${routes.channelsPath()}/${channelId}`, newChannelName, {
    headers: getAuthHeader(),
  });
};

export {
  logInRequest,
  signupRequest,
  getChannels,
  getMessages,
  sendMessageRequest,
  addChannelRequest,
  removeChannelRequest,
  renameChannelRequest,
};
