import axios from "axios";
import authenticationService from "./authentication.service";

const api = axios.create({
  baseURL: "http://localhost:5000",
  responseType: "json"
});

api.interceptors.request.use(config => {
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${authenticationService.getUserToken()}`;
  return config;
});

api.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    const url = error.response.config.url || "";
    const isAuthenticating = url.endsWith("/users/authenticate");

    if ([401, 403].includes(error.response.status) && !isAuthenticating) {
      authenticationService.logout();
      window.location.reload();
    }

    return Promise.reject(error.response.data || { message: "Unknown Error" });
  }
);

export default api;
