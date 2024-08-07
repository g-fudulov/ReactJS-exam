import { useParams, useNavigate } from "react-router-dom";
import useGetMethod from "../hooks/useGetMethod";
import { useAuth } from "../context/Auth";
import { Link, Navigate } from "react-router-dom";
import serverRequest from "../api/serverRequest";
import ApplicantsShow from "./ApplicantsShow";
import { Container, Row, Col, Button, Card, Alert } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

export default function JobShow() {
  const { jobId } = useParams();
  const { currentUser, isLoggedIn } = useAuth();
  const searchParams = new URLSearchParams({ load: "employer=_ownerId:users" });
  const [job, setJob, isLoading] = useGetMethod(
    {},
    `http://localhost:3030/data/jobs/${jobId}?${searchParams.toString()}`
  );

  const applyHandler = async () => {
    const response = await serverRequest(
      `http://localhost:3030/data/jobs/${jobId}?select=candidates`
    );
    const previousCandidates = response.candidates;
    const data = {
      candidates: {
        ...previousCandidates,
        [currentUser._id]: {
          email: currentUser.email,
          firstName: currentUser.firstName,
          secondName: currentUser.secondName,
          location: currentUser.location,
          level: currentUser.level,
          _id: currentUser._id,
        },
      },
    };

    const confirmation = await serverRequest(
      `http://localhost:3030/data/jobs/${jobId}`,
      "PATCH",
      data,
      null,
      currentUser.accessToken,
      true
    );
    setJob((oldJob) => ({
      ...oldJob,
      candidates: {
        ...oldJob.candidates,
        ...data.candidates,
      },
    }));

    alert("Application has been sent");
  };

  if (isLoading) {
    return (
      <Row className="justify-content-center" style={{ marginTop: "40vh" }}>
        <Spinner animation="border" variant="primary" />
      </Row>
    );
  }

  if (job.status === 404) {
    return <Navigate to="/not-found" />;
  }

  const styles = {
    container: {
      padding: "20px",
      minHeight: "100vh",
    },
    card: {
      marginBottom: "20px",
    },
    button: {
      marginTop: "10px",
      marginRight: "6px",
    },
    section: {
      marginBottom: "20px",
    },
    alert: {
      marginTop: "20px",
    },
  };

  return (
    <Container style={styles.container}>
      <Card style={styles.card}>
        <Card.Body>
          <Card.Title>{job.title}</Card.Title>
          <Card.Text>
            <strong>Description:</strong> {job.description}
          </Card.Text>
          <Card.Text>
            <strong>Salary:</strong> {job.salary}
          </Card.Text>
          <Card.Text>
            <strong>Experience:</strong> {job.level}
          </Card.Text>
          <Card.Text>
            <strong>Location:</strong> {job.location}
          </Card.Text>
          <Card.Text>
            <strong>Employer Name:</strong> {job.employer.firstName}{" "}
            {job.employer.secondName}
          </Card.Text>
          <Card.Text>
            <strong>Employer Email:</strong> {job.employer.email}
          </Card.Text>
          <Card.Text>
            <strong>Posted:</strong>{" "}
            {new Date(job._createdOn).toLocaleDateString()}
          </Card.Text>
          <Card.Text>
            <strong>Public Job ID:</strong> {job._id}
          </Card.Text>
          <Row>
            <Col>
              {currentUser._id === job._ownerId && (
                <>
                  <Link to={`/jobs/edit/${jobId}`}>
                    <Button variant="warning" style={styles.button}>
                      Edit
                    </Button>
                  </Link>
                  <Link to={`/jobs/delete/${jobId}`}>
                    <Button variant="danger" style={styles.button}>
                      Delete
                    </Button>
                  </Link>
                </>
              )}
              {Object.keys(job.candidates).includes(currentUser._id) ? (
                <Alert variant="info" style={styles.alert}>
                  Application has been sent
                </Alert>
              ) : (
                currentUser._id !== job._ownerId &&
                isLoggedIn && (
                  <Button
                    onClick={applyHandler}
                    disabled={isLoading}
                    variant="primary"
                    style={styles.button}
                  >
                    Apply
                  </Button>
                )
              )}
              <p>
                <strong>Current applications:</strong>{" "}
                {Object.keys(job.candidates).length !== 0
                  ? Object.keys(job.candidates).length
                  : 0}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {currentUser._id === job._ownerId && (
        <ApplicantsShow candidates={job.candidates} />
      )}
    </Container>
  );
}
