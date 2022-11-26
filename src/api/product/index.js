import axios from "axios";
import { getBaseUrl, paths } from "../constants";

export const getAllProducts = async () => {
  try {
    const allProducts = await axios.get(
      `//${getBaseUrl()}${paths.product.main}/`,
    );

    return allProducts.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createProduct = async (product) => {
  try {
    await axios.post(
      `//${getBaseUrl()}${paths.product.main}/`,
      product
    );
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getProductsByCategory = async (id) => {
  try {
    const allProductsByCategory = await axios.get(
      `//${getBaseUrl()}${paths.product.main}${paths.product.category}/${id}`,
    );

    return allProductsByCategory.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getProductsByCommerce = async (id) => {
  try {
    const allProductsByCommerce = await axios.get(
      `//${getBaseUrl()}${paths.product.main}${paths.product.commerce}/${id}`,
    );

    return allProductsByCommerce.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};