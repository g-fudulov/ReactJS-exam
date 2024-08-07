import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <Row className="text-center">
        <Col>
          <h1 className="display-1">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="lead">
            The page you are looking for does not exist or an error occurred.
          </p>
          <Link to="/">
            <Button variant="primary" className="mt-3">
              Go to Home
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
