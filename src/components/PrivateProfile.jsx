import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import PostsShow from "./PostsShow";
import ApplicationsShow from "./ApplicationsShow";

export default function PrivateProfile({ profileId, currentUser }) {
  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1 className="text-center">Welcome, {currentUser.firstName}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header>Profile Details</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <strong>Email:</strong> {currentUser.email}
                </Col>
                <Col md={6}>
                  <strong>First Name:</strong> {currentUser.firstName}
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <strong>Second Name:</strong> {currentUser.secondName}
                </Col>
                <Col md={6}>
                  <strong>Country:</strong> {currentUser.location}
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <strong>Experience:</strong> {currentUser.level}
                </Col>
                <Col md={6}>
                  <strong>Joined:</strong>{" "}
                  {new Date(currentUser._createdOn).toString()}
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
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>Posts</Card.Header>
            <Card.Body>
              <PostsShow profileId={profileId} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>Applications</Card.Header>
            <Card.Body>
              <ApplicationsShow profileId={profileId} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
