import React from "react";
import { Link } from "react-router-dom";

export default ({ isLoged }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          Encuentra Promos
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {isLoged && [
              <li key="promos-nav" className="nav-item">
                <Link className="nav-link active" to="/listadopromos">
                  Promociones
                </Link>
              </li>,
              <li key="products-nav" className="nav-item">
                <Link className="nav-link" to="/addproduct">
                  Agregar Producto
                </Link>
              </li>,
            ]}
            {!isLoged && [
              <li key="register-nav" className="nav-item">
                <Link className="nav-link" to="/register">
                  Registro
                </Link>
              </li>,
              <li key="login-nav" className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>,
            ]}
          </ul>
        </div>
      </div>
    </nav>
  );
};
