import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import { getHeroById } from "../services/heroesServices";
import Container from "react-bootstrap/Container";
import HeroCard from "./HeroCard";
import HeroWorkTable from "./HeroWorkTable";
import HeroAppearanceTable from "./HeroAppearanceTable";

const HeroProfile = (props) => {
  const heroId = props.match.params.id;
  const [hero, setHero] = useState();
  const [profile, setProfile] = useState(true);
  const [appearance, setAppearance] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const hero = await getHeroById(heroId);
      setHero(hero);
    }
    fetchData();
  }, [heroId]);

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
        <Card>
          <Card.Header>
            <Nav variant="pills" defaultActiveKey="#profile">
              <Nav.Item>
                <Nav.Link onClick={handleClickProfile} href="#profile">
                  Hero Profile
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={handleClickAppearance} href="#appearance">
                  Appearance
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
