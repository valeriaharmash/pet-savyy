const getUserToken = () => window.localStorage.getItem('AUTH_TOKEN');

const isLoggedIn = () => {
  const token = window.localStorage.getItem('AUTH_TOKEN');
  return !!token;
};

const setUserToken = (token) =>
  window.localStorage.setItem('AUTH_TOKEN', token);

const removeUserToken = () => {
  window.localStorage.removeItem('AUTH_TOKEN');
};

export { isLoggedIn, setUserToken, getUserToken, removeUserToken };
