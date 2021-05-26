import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import auth from "../services/authServices";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = (props) => (
  <div className="form-block">
    <h1>Sign In</h1>
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={SignInSchema}
      onSubmit={async (values) => {
        try {
          const { email, password } = values;
          await auth.login(email, password);
          const { state } = props.location;
          window.location = state ? state.from.pathname : "/";
        } catch (ex) {
          if (ex.response && ex.response.status === 400) {
            const errors = { ...this.state.errors };
            errors.username = ex.response.data;
            this.setState({ errors });
          }
          if (ex.response && ex.response.status === 401) {
            const errors = { ...this.state.errors };
            errors.username = ex.response.data;
            this.setState({ errors });
          }
        }
      }}
    >
      {({
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
        isValid,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group as={Col} md="4" controlId="validationFormikEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="E-Mail"
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationFormikPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">Log In</Button>
          <br />
          <Link to="/register">No tienes cuenta? Registrate!</Link>
        </Form>
      )}
    </Formik>
  </div>
);

export default Login;