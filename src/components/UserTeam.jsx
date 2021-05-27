import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Heroes from "./Heroes";
import UserContext from "./../common/userContext";
import { Link } from "react-router-dom";

const UserTeam = () => {
  const { user } = useContext(UserContext);

  return (
    <Container>
      {console.log(user.team)}
      {user.team.length === 0 && (
        <div className="my-team">
          <h5>No existing team.</h5>
          <Link to="/all-heroes">
            <Button className="my-team-btn btn btn-primary">
              Build your team here!
            </Button>
          </Link>
        </div>
      )}
      {user.team.length > 0 && <Heroes data={user.team} />}
    </Container>
  );
};

export default UserTeam;
