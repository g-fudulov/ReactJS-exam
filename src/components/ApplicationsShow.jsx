import React from "react";
import useGetMethod from "../hooks/useGetMethod";
import JobItem from "./JobItem";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col } from "react-bootstrap";

export default function ApplicationsShow({ profileId }) {
  const [jobs, setJobs, isLoading] = useGetMethod(
    [],
    "http://localhost:3030/data/jobs"
  );
  const userApplications = jobs.filter(
    (job) =>
      job.candidates &&
      Object.values(job.candidates).some(
        (candidate) => candidate._id === profileId
      )
  );

  return (
    <Container>
      {isLoading ? (
        <Row className="justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Row>
      ) : userApplications.length === 0 ? (
        <Row className="justify-content-center">
          <p>No job applications found.</p>
        </Row>
      ) : (
        <Row>
          {userApplications.map((job) => (
            <Col key={job._id} md={4}>
              <JobItem {...job} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
