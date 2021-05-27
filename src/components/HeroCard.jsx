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
        } else {
          setHeroInTeam(false);
        }
      });
    }
  }, [data.id, user.team]);

  const handleAdd = () => {
    if (!alignment()) {
      setError(
        "Team must have 3 'GOOD' Alignment heroes and 3 'BAD' Alignment heroes."
      );
      setShow(true);
    } else if (teamMaxLength()) {
      setError("Team has already 6 heroes");
      setShow(true);
    } else {
      dispatchHeroEvent("ADD_HERO", data);
      setHeroInTeam(true);
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

    return bad <= 3 && good <= 3 ? true : false;
  };

  const teamMaxLength = () => {
    if (!user.team) {
      return false;
    } else if (user.team.length >= 6) {
      return true;
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
