import React from "react";
import { Container } from "react-bootstrap";
import HeroCard from "./HeroCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Heroes = ({ data }) => {
  return (
    <Container fluid="true" className="heroes">
      <Row className="justify-content-md-center" lg="6" md="4" sm="3" xs="2">
        {data.length > 1 &&
          data.map((hero) => (
            <Col key={hero.id} lg="auto">
              <HeroCard className="col m-0" key={hero.name} data={hero} />
            </Col>
          ))}
        {!data.length && (
          <Col key={data.id} lg="auto">
            <HeroCard className="col m-0" key={data.name} data={data} />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Heroes;
