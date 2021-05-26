import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Heroes from "./Heroes";
import { getUserTeam } from "../services/userService";

const UserTeam = (props) => {
  const [userTeam, setUserTeam] = useState([]);

  useEffect(() => {
    async function getData() {
      const userTeam = await getUserTeam();
      setUserTeam(userTeam);
    }
    getData();
  }, [userTeam]);

  const handleClick = () => {
    window.location = '/all-heroes'
  }

  return (
    <Container>
      {console.log(userTeam)}
      {userTeam.length === 0 && (
        <div className="my-team">
        <h5>No existing team.</h5>
        <Button className="my-team-btn btn btn-primary" onClick={handleClick}>Build Team!</Button>
        </div>
      )}
      {userTeam.length > 0 && <Heroes data={userTeam} />}
    </Container>
  );
};

export default UserTeam;
