import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import UserContext from "./../common/userContext";

const NavBar = () => {
  const {user} = useContext(UserContext);

  return (
    <Container fluid="true">
      <Navbar sticky="top" bg="dark" variant="dark" expand="sm">
        <Navbar.Brand href="/my-team">SH</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/my-team">My team</Nav.Link>
            <Nav.Link href="/all-heroes">Hero Finder</Nav.Link>
            {!user && (
              <React.Fragment>
                <Nav.Link href="/login">Log In</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </React.Fragment>
            )}
            {user && (
              <NavDropdown
                title={`${user.name ? user.name : user.email}`}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/user.id/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="/user.id/friends">
                  Friends
                </NavDropdown.Item>
                <NavDropdown.Item href="/user.id/settings">
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout">Log Out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default NavBar;
