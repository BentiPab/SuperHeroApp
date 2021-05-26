import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Heroes from "./Heroes";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { getHeroById, getHeroByName } from "../services/heroesServices";
import ModalError from "../common/Modal";

import HeroForm from "./HeroForm";

const HeroSearch = () => {
  const [heroes, setHeroes] = useState([]);
  const [searching, setSearching] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleForm = async (value) => {
    let search = [];
    setSearching(true);
    if (value.id) {
      try {
        search = await getHeroById(value.id);
        setSearching(false);
        setHeroes(search);
      } catch (e) {
        console.log(e);
      }
    } else if (value.name) {
      try {
        search = await getHeroByName(value.name);
        setSearching(false);
        setHeroes(search);
      } catch (e) {
        console.log(e);
      }
    } else {
      setShow(true);
      setSearching(false);
      setError("Debe completar almenos un campo");
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Container fluid="true">
      <HeroForm handleForm={handleForm} />
      <ModalError show={show} handleClose={handleClose} body={error} />
      {!searching && heroes.length !== 0 && (
        <Row className="justify-content-md-center ">
          <Col lg="auto" md="auto" sm="auto" xs="auto">
            <Heroes data={heroes} />
          </Col>
        </Row>
      )}
      {searching && (
        <React.Fragment>
          <Row className="justify-content-md-center ">
            <Col className="loading">
              <p className="loading">Cargando...</p>
              <Spinner animation="border" role="status" className="spinner">
                <span className="sr-only">Loading...</span>
              </Spinner>
              <p className="loading">Puede demorar unos segundos</p>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </Container>
  );
};

export default HeroSearch;
