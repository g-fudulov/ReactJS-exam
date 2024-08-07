import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../styles/Footer.css";
import ContactUsForm from "./forms/ContactUsForm";

export default function Footer() {
  return (
    <footer className="footer py-3 bg-dark text-white">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              We are a leading freelance job marketplace connecting
              professionals with clients globally.
            </p>
          </Col>
          <Col md={4}>
            <ContactUsForm />
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  className="text-white"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://x.com" target="_blank" className="text-white">
                  X
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  className="text-white"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>&copy; 2024 Job Marketplace. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
