import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import auth from "../services/authServices";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ModalError from "../common/Modal";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = (props) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="form-block">
      <h1>Sign In</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={async (values, errors) => {
          try {
            const { email, password } = values;
            await auth.login(email, password);
            
            window.location = "/";
          } catch (ex) {
            if (ex.response && ex.response.status === 400) {
              errors.username = ex.response.data;
              setError(errors.username.error);
              setShow(true);
            }
            if (ex.response && ex.response.status === 401) {
              errors.username = ex.response.data;
              setError(errors.username.error);
              setShow(true);
            }
          }
        }}
      >
        {({ errors, handleSubmit, handleChange }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <ModalError show={show} handleClose={handleClose} body={error} />
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
            <Link to="/register">Don't have an account? Join Now!</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
