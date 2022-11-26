export const paths = {
  auth: {
    main: "/auth",
    login: "/login",
    register: "/register",
  },
  category: {
    main: "/category",
    category: "/:id",
  },
  commerce: {
    main: "/commerce",
    commerce: "/:id",
  },
  product: {
    main: "/product",
    product: "/:id",
    category: "/category",
    commerce: "/commerce",
  },
};

export const getBaseUrl = () => {
  return `${process.env.REACT_APP_URL}${
    process.env.REACT_APP_PORT ? `:${process.env.REACT_APP_PORT}` : ""
  }${process.env.REACT_APP_API_BASE_PATH}`;
};
