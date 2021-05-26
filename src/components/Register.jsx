import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  surname: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  terms: Yup.bool().required().oneOf([true], "Terms must be accepted"),
});

const Register = () => (
  <div className="form-block">
    <div className="form-container">
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          firstName: "",
          surname: "",
          email: "",
          password: "",
          terms: false,
        }}
        validationSchema={SignUpSchema}
        onSubmit={
          //registerCode
          console.log("registered")
        }
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} sm="4" controlId="validationFormikFirstName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  placeholder="Nombre"
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm="4" controlId="validateFormikSurname">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="surname"
                  onChange={handleChange}
                  placeholder="Apellido"
                  isInvalid={!!errors.surname}
                />
                <Form.Control.Feedback type="invalid">{errors.surname}</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} sm="4" controlId="validationFormikEmail">
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
              <Form.Group as={Col} sm="4" controlId="validationFormikPassword">
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
            </Form.Row>

            <Button type="submit">Log In</Button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
);

export default Register;