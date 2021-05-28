import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Heroes from "./Heroes";
import UserContext from "./../common/userContext";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TeamStats from "./TeamStats";

const UserTeam = () => {
  const { user } = useContext(UserContext);


  const getTeamStats = () => {
    const stats = {
      intelligence: 0,
      strength: 0,
      speed: 0,
      durability: 0,
      power: 0,
      combat: 0,
    };
    user.team.forEach((hero) => {
      Object.keys(hero.powerstats).map((key) => {
        if (parseInt(hero.powerstats[key])) {
          stats[key] += parseInt(hero.powerstats[key]);
        } else stats[key] += 0;
        return stats;
      });
    });

    const sort = [];
    for (let stat in stats) {
      sort.push([stat, stats[stat]]);
    }
    sort.sort((a, b) => b[1] - a[1]);

    return sort;
  };

  const getPhysicalStats = () => {
    const height = [];
    const weight = [];

    user.team.forEach((hero) => {
      height.push(hero.appearance.height[1].split(/([0-9]+)/));
      weight.push(hero.appearance.weight[1].split(/([0-9]+)/));
    });

    const filterHeight = height.map((height) => parseInt(height[1]));
    const filterWeight = weight.map((weight) => parseInt(weight[1]));

    const finalHeight = filterHeight.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );

    const finalWeight = filterWeight.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );

    const physicalStats = {
      height: finalHeight / height.length,
      weight: finalWeight / weight.length,
    };
    return physicalStats;
  };

  return (
    <Container>
      {console.log(user)}
      {user.team.length < 1 && (
        <div className="my-team">
          <h5>No existing team.</h5>
          <Link to="/find-hero">
            <Button className="my-team-btn btn btn-primary">
              Build your team here!
            </Button>
          </Link>
        </div>
      )}
      {user.team.length !== 0 && (
        <React.Fragment>
          {console.log(getPhysicalStats())}
          <Row>
            <TeamStats stats={getTeamStats()} physical={getPhysicalStats()} />
          </Row>
          <Row className="justify-content-md-center ">
            <Col lg="auto" md="auto" sm="auto" xs="auto">
              <Heroes data={user.team} />
            </Col>
          </Row>
        </React.Fragment>
      )}
    </Container>
  );
};

export default UserTeam;
