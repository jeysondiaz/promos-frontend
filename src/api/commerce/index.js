import axios from "axios";
import { getBaseUrl, paths } from "../constants";

export const getAllCommerce = async () => {
  try {
    const allComerce = await axios.get(
      `//${getBaseUrl()}${paths.commerce.main}/`,
    );

    return allComerce.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createCommerce = async (description) => {
  try {
    await axios.post(
      `//${getBaseUrl()}${paths.commerce.main}/`,
      { description }
    );
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};