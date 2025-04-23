const tokenName = 'token';

const getToken = () => JSON.parse(localStorage.getItem(tokenName));
const setToken = token => localStorage.setItem(tokenName, token);
const removeToken = () => localStorage.removeItem(tokenName);

export { getToken, setToken, removeToken };
