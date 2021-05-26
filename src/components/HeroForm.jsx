import React from "react";
import { Container, Form, Col } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
import Button from "react-bootstrap/Button";

const heroSchema = Yup.object().shape({
  id: Yup.number()
    .integer()
    .min(0, "ID must be greater than 0")
    .max(731, "ID must be equal or less than 731"),
  name: Yup.string(),
});

const HeroForm = ({ handleForm }) => (
  <Container className="hero-form">
      <h3>Hero Finder</h3>
    <Formik
      initialValues={{
        id: 0,
        name: "",
      }}
      validationSchema={heroSchema}
      onSubmit={(values) => handleForm(values)}
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
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="validationFormikId">
              <Form.Control
                type="number"
                name="id"
                placeholder="Hero ID"
                onChange={handleChange}
                isInvalid={!!errors.id}
              />
              <Form.Control.Feedback type="invalid">
                {errors.id}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormikName">
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Hero Name"
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" className="my-1">
              Search
            </Button>
          </Form.Row>
        </Form>
      )}
    </Formik>
  </Container>
);

export default HeroForm;
