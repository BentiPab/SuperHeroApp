import React from "react";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import Table from "react-bootstrap/Table";

const TeamStats = ({ stats, physical }) => {
  const [showStats, setShowStats] = useState(true);
  const [showAppearance, setShowAppearance] = useState(false);

  const handleClickStats = () => {
    setShowAppearance(false);
    setShowStats(true);
  };
  const handleClickAppearance = () => {
    setShowAppearance(true);
    setShowStats(false);
  };

  const kgToLb = () => {
    const lb = physical.weight * 2.2;

    return Math.round(lb * 100) / 100;
  };

  const mtsToFeet = () => {
    const ft = physical.height * 0.3937007874;

    return Math.round(ft * 100) / 100;
  };

  return (
    <Container className="hero-profile-container">
      <Card bg="secondary" text="light">
        {console.log(stats)}
        <Card.Header className="card-profile-header">
          <Nav variant="dark" bg="dark" defaultActiveKey="#profile">
            <Nav.Item>
              <Nav.Link>
                <NavLink onClick={handleClickStats} to="#profile">
                  Team Stats
                </NavLink>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link>
                <NavLink  onClick={handleClickAppearance} to="#appearance">
                  Phisycal Stats
                </NavLink>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        {showStats && (
          <Card.Body className="card-body-profile" id="profile">
            <Table striped>
              <thead>
                <th>
                  <h5>Stat</h5>
                </th>
                <th>
                  <h5>Power</h5>
                </th>
              </thead>
              <tbody>
                {stats.map((stat) => (
                  <tr>
                    <td>{stat[0].toUpperCase()}</td>
                    <td>{stat[1]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        )}
        {showAppearance && (
          <Card.Body id="appearance">
            <Table striped>
              <thead>
                <th>
                  <h5>Avg. Weight</h5>
                </th>
                <th>
                  <h5>Avg. Height</h5>
                </th>
              </thead>
              <tbody>
                <tr>
                  <td>{`[${physical.weight} kg - ${kgToLb()} lbs]`}</td>
                  <td>{`[${physical.height} cm - ${mtsToFeet()} ft]`}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        )}
      </Card>
    </Container>
  );
};

export default TeamStats;
