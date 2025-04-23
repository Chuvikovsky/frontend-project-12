import { getToken } from './localStorage';

const getAuthHeader = () => {
  const token = getToken();
  return token && token.token ? { Authorization: `Bearer ${token.token}` } : {};
};

export default getAuthHeader;
