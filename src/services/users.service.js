/* eslint-disable no-param-reassign */
import { api } from "../utils/index";

const getUsers = (limit, offset, order, direction) =>
  api
    .get(`/api/v1/users/${limit}/${offset}/${order}/${direction}`)
    .then(users => users.users);

const isUnique = username =>
  api.get(`/api/v1/users/unique/${username}`).then(d => d.data.unique);

const createUser = user =>
  api
    .post("/api/v1/users/new", { user })
    .then(res => res.id)
    .catch(e => Promise.reject(e));

const deleteUser = id =>
  api
    .delete(`/api/v1/users/${id}`)
    .then(() => true)
    .catch(() => false);

const updateUser = (username, user) => {
  delete user.password;
  delete user.password2;
  delete user.flair;
  return api
    .put(`/api/v1/users/update/${username}`, { user })
    .then(res => res.username)
    .catch(e => Promise.reject(e));
};

const changePassword = (username, oldPassword, newPassword) =>
  api
    .put(`api/v1/users/change-password`, { username, oldPassword, newPassword })
    .then(res => res)
    .catch(e => Promise.reject(e));

const login = (username, password) =>
  api
    .post("/api/v1/users/authenticate", { username, password })
    .then(res => {
      sessionStorage.setItem("user_data", JSON.stringify(res));
      return res.user;
    })
    .catch(e => {
      return Promise.reject(e);
    });

const userService = {
  isUnique,
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  changePassword,
  login
};

export default userService;
