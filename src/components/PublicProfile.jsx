import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import useGetMethod from "../hooks/useGetMethod";
import Spinner from "react-bootstrap/Spinner";

export default function PublicProfile({ profileId }) {
  const [users, setUsers, isLoading] = useGetMethod(
    {},
    "http://localhost:3030/jsonstore/users/"
  );
  const user = Object.values(users).find((user) => user.key === profileId);

  if (isLoading) {
    return (
      <Row className="justify-content-center" style={{ marginTop: "40vh" }}>
        <Spinner animation="border" variant="primary" />
      </Row>
    );
  }

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1 className="text-center">{user.firstName}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>Profile Details</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <strong>Email:</strong> {user.email}
                </Col>
                <Col md={6}>
                  <strong>First Name:</strong> {user.firstName}
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <strong>Second Name:</strong> {user.secondName}
                </Col>
                <Col md={6}>
                  <strong>Country:</strong> {user.location}
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <strong>Experience:</strong> {user.level}
                </Col>
                <Col md={6}>
                  <strong>Joined:</strong>{" "}
                  {new Date(user._createdOn).toString()}
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong>Public Profile ID:</strong> {profileId}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
