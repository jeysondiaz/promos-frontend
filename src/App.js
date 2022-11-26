import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navigation from "./components/Navigation";
import CreateUser from "./components/CreateUser";
import CreateProduct from "./components/CreateProduct";
import PromoList from "./components/PromoList";

import Login from "./components/Login";

function App() {
  const [isLoged, setIsLoged] = useState();

  useEffect(() => {
    setIsLoged(localStorage.getItem("session"));
  }, []);

  return (
    <BrowserRouter>
      <Navigation isLoged={isLoged} />
      <Routes>

        {!isLoged && [
          <Route key="register-route" path="/register" element={<CreateUser />} />,
          <Route key="login-route" path="/" element={<Login />} />,
        ]}
        {isLoged && [
          <Route key="products-route" path="/addproduct" element={<CreateProduct />} />,
          <Route key="promos-route" path="/" element={<PromoList />} />,
        ]}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
