import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${
      JSON.parse(localStorage.getItem("session")).token
    }`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
