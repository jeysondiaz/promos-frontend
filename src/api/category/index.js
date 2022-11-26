import axios from "axios";
import { getBaseUrl, paths } from "../constants";

export const getAllCategories = async () => {
  try {
    const allCategories = await axios.get(
      `//${getBaseUrl()}${paths.category.main}/`,
    );

    return allCategories.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createCategory = async (description) => {
  try {
    await axios.post(
      `//${getBaseUrl()}${paths.category.main}/`,
      { description }
    );
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};