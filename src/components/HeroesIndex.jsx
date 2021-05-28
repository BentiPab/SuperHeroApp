import React from "react";
import Table from "react-bootstrap/Table";
import heroes from "../utils/heroIndex";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { paginate } from "./../utils/paginate";
import { Link } from "react-router-dom";

const HeroIndex = () => {
  const pagination = (pageNum) => {
    const length = Math.ceil(heroes.length / 3);
    return paginate(heroes, pageNum, length).map((hero, index) => (
      <tbody>
        <tr>
          <td>{length * pageNum - length + 1 + index}</td>
          <td>
            <Link className="hero-profile-link" to={`/all-heroes/${length * pageNum - length + 1 + index}`}>
              {hero}
            </Link>
          </td>
        </tr>
      </tbody>
    ));
  };

  return (
      <Row>
        <Col className="col-md-4 col-sm-4" role="main">
          <Table striped bordered variant="dark">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Character Name</th>
              </tr>
            </thead>
            {pagination(1)}
          </Table>
        </Col>
        <Col className="col-md-4 col-sm-4" role="main">
          <Table striped bordered variant="dark">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Character Name</th>
              </tr>
            </thead>
            {pagination(2)}
          </Table>
        </Col>
        <Col className="col-md-4 col-sm-4" role="main">
          <Table striped bordered variant="dark">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Character Name</th>
              </tr>
            </thead>
            {pagination(3)}
          </Table>
        </Col>
      </Row>
  );
};

export default HeroIndex;
