import axios from "axios";
import { getBaseUrl, paths } from "../constants";

export const onLogin = async (email, password) => {
  try {
    const loginResponse = await axios.post(
      `//${getBaseUrl()}${paths.auth.main}${paths.auth.login}`,
      { email, password }
    );

    localStorage.setItem("session", JSON.stringify(loginResponse.data));
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const onRegister = async (firstName, lastName, email, password) => {
  try {
    await axios.post(
      `//${getBaseUrl()}${paths.auth.main}${paths.auth.register}`,
      { firstName, lastName, email, password, role: "Usuario", status: true }
    ); 
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
