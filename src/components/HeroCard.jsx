import React, { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Stats from "./Stats";
import ModalError from "../common/Modal";
import { Link } from "react-router-dom";
import UserContext from "../common/userContext";

const HeroCard = ({ data }) => {
  const { user, dispatchHeroEvent } = useContext(UserContext);
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
  }, [data, user.team]);

  const handleAdd = () => {
    try {
      dispatchHeroEvent("ADD_HERO", data);
      setHeroInTeam(true);
      alignment();
      teamMaxLength();
    } catch (e) {
      setError(e.message);
      setShow(true);
      dispatchHeroEvent("REMOVE_HERO", data.id);
      setHeroInTeam(false);
    }
  };

  const alignment = () => {
    let good = 0;
    let bad = 0;

    if (!user.team) {
      return true;
    } else {
      user.team.forEach((heroMember) => {
        if (heroMember.biography.alignment === "good") {
          good += 1;
        } else if (heroMember.biography.alignment === "bad") {
          bad += 1;
        }
      });
    }

    if (bad > 3) {
      throw new Error("Max quantity of BAD alignment heroes reached. 3/3");
    } else if (good > 3) {
      throw new Error("Max quantity of GOOD alignment heroes reached. 3/3");
    }
  };

  const teamMaxLength = () => {
    if (user.team.length > 6) {
      throw new Error("Team has already 6 heroes");
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleRemove = () => {
    dispatchHeroEvent("REMOVE_HERO", data.id);
    setHeroInTeam(false);
  };

  return (
    <Container fluid="true">
      <ModalError show={show} handleClose={handleClose} body={error} />
      {user && (
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
              onClick={heroInTeam ? handleRemove : handleAdd}
            >
              {heroInTeam ? "Remove" : "Add"}
            </Button>
          </Card.ImgOverlay>
          <Card.Body className="heroes-card-body">
            <Card.Title className="heroes-card-title">{data.name}</Card.Title>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default HeroCard;
