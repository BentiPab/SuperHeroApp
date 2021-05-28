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
  const [heroes, setHeroes] = useState();
  const [searching, setSearching] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleForm = async (value) => {
    let search = [];
    setSearching(true);
    if (value.id) {
      setSearching(false);
      try {
        search = await getHeroById(value.id);
        setHeroes(search);
      } catch (e) {
        noHeroFound();
      }
    } else if (value.name) {
      setSearching(false);
      try {
        search = await getHeroByName(value.name);

        setHeroes(search);
      } catch (e) {
        noHeroFound();
      }
    } else {
      setShow(true);
      setSearching(false);
      setError("You must fill at least one field");
    }
  };

  const noHeroFound = () => {
    setShow(true);
    setError("No hero found");
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Container fluid="true">
      <HeroForm handleForm={handleForm} />
      <ModalError show={show} handleClose={handleClose} body={error} />
      {!searching && heroes && (
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
              <p className="loading">Loading Results...</p>
              <Spinner animation="border" role="status" className="spinner">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </Container>
  );
};

export default HeroSearch;
