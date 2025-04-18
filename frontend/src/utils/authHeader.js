const getAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return token && token.token ? { Authorization: `Bearer ${token.token}` } : null;
};

export default getAuthHeader;
