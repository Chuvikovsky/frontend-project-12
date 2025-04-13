import axios from "axios";
import routes from "./routes.js";
import getAuthHeader from "./authHeader.js";

const logInRequest = (values) => {
  return axios.post(routes.loginPath(), values);
};

const getChannels = () => {
  return axios.get(routes.channelsPath(), { headers: getAuthHeader() });
};

const getMessages = () => {
  return axios.get(routes.messagesPath(), { headers: getAuthHeader() });
};

const sendMessageRequest = (message) => {
  return axios.post(routes.messagesPath(), message, {
    headers: getAuthHeader(),
  });
};

const addChannelRequest = (channelname) => {
  const newChannel = { name: channelname };
  return axios.post(routes.channelsPath(), newChannel, {
    headers: getAuthHeader(),
  });
};

const removeChannelRequest = (channelId) => {
  return axios.delete(`${routes.channelsPath()}/${channelId}`, {
    headers: getAuthHeader(),
  });
};

export {
  logInRequest,
  getChannels,
  getMessages,
  sendMessageRequest,
  addChannelRequest,
  removeChannelRequest,
};
