import React from "react";
import useGetMethod from "../hooks/useGetMethod";
import JobItem from "./JobItem";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col } from "react-bootstrap";

export default function PostsShow({ profileId }) {
  const searchParams = new URLSearchParams({
    where: `_ownerId="${profileId}"`,
  });
  const [jobs, setJobs, isLoading] = useGetMethod(
    [],
    `http://localhost:3030/data/jobs?${searchParams.toString()}`
  );

  return (
    <Container>
      {isLoading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Row>
      ) : jobs.length === 0 ? (
        <Row className="justify-content-center">
          <p>No jobs posted</p>
        </Row>
      ) : (
        <Row>
          {jobs.map((job) => (
            <Col key={job._id} md={4}>
              <JobItem {...job} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
