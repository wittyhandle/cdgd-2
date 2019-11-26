const USER_DATA = "user_data";

const logout = () => {
  sessionStorage.removeItem(USER_DATA);
};

const getUserToken = () => {
  const userObj = JSON.parse(sessionStorage.getItem(USER_DATA));
  return userObj && userObj.token;
};

const getUser = () => {
  const userObj = JSON.parse(sessionStorage.getItem(USER_DATA));
  return userObj && userObj.user;
};

const authenticationService = {
  logout,
  getUserToken,
  getUser
};

export default authenticationService;
