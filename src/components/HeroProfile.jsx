import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import { getHeroById } from "../services/heroesServices";
import Container from "react-bootstrap/Container";
import HeroCard from "./HeroCard";
import HeroWorkTable from "./HeroWorkTable";
import HeroAppearanceTable from "./HeroAppearanceTable";
import { NavLink } from "react-router-dom";

const HeroProfile = (props) => {
  const heroId = props.match.params.id;
  const [hero, setHero] = useState();
  const [profile, setProfile] = useState(true);
  const [appearance, setAppearance] = useState(false);

  useEffect(() => {
    fetchData();
  });

  async function fetchData() {
    const hero = await getHeroById(heroId);
    setHero(hero);
  }

  const handleClickProfile = () => {
    setProfile(true);
    setAppearance(false);
  };

  const handleClickAppearance = () => {
    setProfile(false);
    setAppearance(true);
  };

  return (
    <Container className="hero-profile-container">
      {hero && (
        <Card bg="secondary" text="light">
          <Card.Header className="card-profile-header">
            <Nav variant="dark" bg="dark" defaultActiveKey="#profile">
              <Nav.Item>
                <Nav.Link>
                  <NavLink onClick={handleClickProfile} to="#profile">
                    Hero Profile
                  </NavLink>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <NavLink onClick={handleClickAppearance} to="#appearance">
                    Appearance
                  </NavLink>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          {profile && (
            <Card.Body className="card-body-profile" id="profile">
              <HeroCard data={hero} />
              <Card.Text>
                <HeroWorkTable data={hero} />
              </Card.Text>
            </Card.Body>
          )}
          {appearance && (
            <Card.Body id="appearance">
              <HeroAppearanceTable data={hero} />
            </Card.Body>
          )}
        </Card>
      )}
    </Container>
  );
};

export default HeroProfile;
