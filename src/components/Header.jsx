import { Link } from "react-router-dom";
import { useAuth } from "../context/Auth";

import { Navbar, Container, Nav } from "react-bootstrap";

export default function Header() {
  const { currentUser, isLoggedIn } = useAuth();

  return (
    <Navbar bg="light" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/market">
              Jobs Market
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/logout">
                  LogOut
                </Nav.Link>
                <Nav.Link as={Link} to={`/profile/view/${currentUser._id}`}>
                  {currentUser.email}
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  LogIn
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
