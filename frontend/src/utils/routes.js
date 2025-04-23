const pathToAPI = '/api/v1';

const apiRoutes = {
  loginPath: () => [pathToAPI, 'login'].join('/'),
  channelsPath: () => [pathToAPI, 'channels'].join('/'),
  messagesPath: () => [pathToAPI, 'messages'].join('/'),
  signupPath: () => [pathToAPI, 'signup'].join('/'),
};

const localRoutes = {
  root: '/',
  login: '/login',
  signup: '/signup',
  notFound: '/*',
};

export { apiRoutes, localRoutes };
