import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const session = localStorage.getItem("session");
    if (session) {
      config.headers["Authorization"] = `Bearer ${JSON.parse(session).token}`;
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
