import useGetMethod from "../hooks/useGetMethod";
import JobItem from "./JobItem";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Market() {
  const [allJobs, setAllJobs, isLoading] = useGetMethod(
    [],
    "http://localhost:3030/data/jobs?sortBy=_createdOn%20desc"
  );

  return (
    <Container>
      <h1 className="my-4">Recent Jobs</h1>
      <Row>
        {isLoading ? (
          <Col className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </Col>
        ) : allJobs.length === 0 ? (
          <Col>
            <p>No Recent Jobs</p>
          </Col>
        ) : (
          allJobs.map((job) => (
            <Col md={6} lg={4} key={job._id} className="mb-4">
              <JobItem {...job} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}
