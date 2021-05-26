import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Stats = ({ data }) => {
  return (
    <Container>
      <h5 className="stats-title">Stats</h5>
      <Row>
        {Object.keys(data.powerstats).map((key) => (
          <React.Fragment>
            <Col md="7" className="stat-col">
              {key.toUpperCase()}
            </Col>
            <Col className="stat-col">{data.powerstats[key]}</Col>
          </React.Fragment>
        ))}
      </Row>
      <Row>
        <Col className="stat-col">ALIGNMENT</Col>
        <Col className="stat-col">
          {data.biography.alignment === "good" ? "GOOD" : "BAD"}
        </Col>
      </Row>
    </Container>
  );
};

export default Stats;
