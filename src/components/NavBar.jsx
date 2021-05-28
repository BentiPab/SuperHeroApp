import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import UserContext from "./../common/userContext";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const { user } = useContext(UserContext);

  return (
    <Container fluid="true">
      <Navbar sticky="top" bg="dark" variant="dark" expand="sm">
        <Navbar.Brand>
          <NavLink to="/my-team">SH</NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <NavLink aria-current="page" to="/my-team">
                My team
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink aria-current="page" to="/find-hero">
                Hero Finder
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink aria-current="page" to="/hero-index">
                Hero Index
              </NavLink>
            </Nav.Link>
            {!user && (
              <React.Fragment>
                <Nav.Link>
                  <NavLink aria-current="page" to="/login">
                    Log In
                  </NavLink>
                </Nav.Link>
                <Nav.Link>
                  <NavLink aria-current="page" to="/register">
                    Register
                  </NavLink>
                </Nav.Link>
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
