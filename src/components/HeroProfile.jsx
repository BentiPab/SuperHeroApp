import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getHeroById } from "../services/heroesServices";
import Container from "react-bootstrap/Container";

const HeroProfile = (props) => {
  const heroId = props.match.params.id;
  const [hero, setHero] = useState();

  useEffect(() => {
    async function fetchData() {
      const hero = await getHeroById(heroId);

      setHero(hero);
    }
    fetchData();
  }, [heroId]);

  return (
    <Container fluid="true">
      {hero && (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={hero.image.url} />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default HeroProfile;
