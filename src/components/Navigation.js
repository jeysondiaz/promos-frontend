import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export default ({ isLoged }) => {
  const onLogOut = () => {
    localStorage.removeItem("session");
    window.location.reload();
  }
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
                <Link className="nav-link active" to="/">
                  Promociones
                </Link>
              </li>,
              <li key="products-nav" className="nav-item">
                <Link className="nav-link" to="/addproduct">
                  Agregar Producto
                </Link>
              </li>,
              <li key="logout-nav" className="nav-item">
                <Button onClick={onLogOut}>
                  Cerrar Sesión
                </Button>
              </li>,
            ]}
            {!isLoged && [
              <li key="register-nav" className="nav-item">
                <Link className="nav-link" to="/register">
                  Registro
                </Link>
              </li>,
              <li key="login-nav" className="nav-item">
                <Link className="nav-link" to="/">
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
