import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { Alert } from 'bootstrap';
import { Form, Label, Input, FormGroup, Row, Col, Button } from "reactstrap";
import { onRegister } from "../api/auth";

export default () => {
  const [error, setError] = useState();
  const navigate = useNavigate();

  const onSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const firstName = e.target.firstName.value;
      const lastName = e.target.lastName.value;
      const email = e.target.email.value;
      const password = e.target.password.value;

      await onRegister(firstName, lastName, email, password);

      navigate("/listadopromos");
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="col-md-6 offset-md-2 mt-5">
      <div className="card card-body">
        <h4>Registro</h4>
        <p>Ingresa o crea tu usuario para agregar promociones</p>
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Form onSubmit={onSubmitRegister}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="firstName">Nombre</Label>
                <Input required type="text" name="firstName" />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="lastName">Apellido</Label>
                <Input required type="text" name="lastName" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="email">Correo</Label>
                <Input
                  required
                  name="email"
                  placeholder="Correo"
                  type="email"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="password">Contraseña</Label>
                <Input required name="password" placeholder="Contraseña..." />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            ¿Deseas loguearte? <a href="/login">Click aquí</a>
          </FormGroup>
          <Button type="submit">Registrarse</Button>
        </Form>
      </div>
    </div>
  );
};
