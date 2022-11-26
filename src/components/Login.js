import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Label, Input, FormGroup, Button } from "reactstrap";
import { onLogin } from "../api/auth";

export default () => {
  const [error, setError] = useState();
  const navigate = useNavigate();

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const email = e.target.email.value;
      const password = e.target.password.value;

      await onLogin(email, password);

      navigate("/listadopromos");
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="col-md-4 offset-md-4 mt-5">
      <div className="card card-body">
        <h4>Login</h4>
        <p>Ingresa o crea tu usuario para agregar promociones</p>
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Form onSubmit={onSubmitLogin}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input required type="email" name="email" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Contraseña</Label>
            <Input required type="text" name="password" />
          </FormGroup>
          <FormGroup>
            ¿Deseas Registrarte? <a href="/login">Click aquí</a>
          </FormGroup>
          <Button type="submit">Login</Button>
        </Form>
      </div>
    </div>
  );
};
