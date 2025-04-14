const pathToAPI = "/api/v1";

export default {
  loginPath: () => [pathToAPI, "login"].join("/"),
  channelsPath: () => [pathToAPI, "channels"].join("/"),
  messagesPath: () => [pathToAPI, "messages"].join("/"),
  signupPath: () => [pathToAPI, "signup"].join("/"),
};
