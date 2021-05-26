import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Stats from "./Stats";
import ModalError from "../common/Modal";
import { addHero, removeHero } from "../services/userService";
import { Link } from "react-router-dom";
import UserContext from "../common/userContext";

const HeroCard = ({ data, userTeam }) => {
  const user = UserContext;
  const [heroInTeam, setHeroInTeam] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user.team) {
      user.team.forEach((el) => {
        if (data.id === el.id) {
          setHeroInTeam(true);
        }
      });
    }
  }, [data.id, user.team]);

  const handleAdd = (e) => {
    if (!alignment()) {
      setError(
        "El equipo debe tener 3 miembros con orientación buena y 3 con orientación mala."
      );
      setShow(true);
    } else if (teamMaxLength()) {
      setError("El equipo ya contiene 6 heroes");
      setShow(true);
    } else {
      addHero(data);
      setHeroInTeam(!heroInTeam);
    }
  };

  const alignment = () => {
    let good = 0;
    let bad = 0;

    if (!user.team) {
      return true;
    }

    user.team.forEach((heroMember) => {
      if (heroMember.biography.alignment === "good") {
        good += 1;
      } else if (heroMember.biography.alignment === "bad") {
        bad += 1;
      }
    });

    return bad <= 3 && good <= 3 ? true : false;
  };

  const teamMaxLength = () => {
    if (user.team.length >= 6) {
      return true;
    } else return false;
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleRemove = () => {
    removeHero(data);
    setHeroInTeam(!heroInTeam);
  };

  return (
    <Container fluid="true">
      <ModalError show={show} handleClose={handleClose} body={error} />
      <Card className="hero-card">
        <Card.Img
          className="hero-card-img-top"
          variant="top"
          src={data.image.url}
        />
        <Card.ImgOverlay>
          <Link className="hero-profile-link" to={`/all-heroes/${data.id}`}>
            <Stats data={data} />
          </Link>

          <Button
            className="hero-button"
            size="sm"
            variant={heroInTeam ? "danger" : "primary"}
            onClick={heroInTeam ? handleRemove : (e) => handleAdd(e)}
          >
            {heroInTeam ? "Remove" : "Add"}
          </Button>
        </Card.ImgOverlay>
        <Card.Body className="heroes-card-body">
          <Card.Title className="heroes-card-title">{data.name}</Card.Title>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HeroCard;
