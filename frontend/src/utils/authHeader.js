const getAuthHeader = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (token && token.token) {
    return { Authorization: `Bearer ${token.token}` };
  }
  return null;
};

export default getAuthHeader;
