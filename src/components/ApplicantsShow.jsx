import { Link } from "react-router-dom";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

export default function ApplicantsShow({ candidates }) {
  const styles = {
    section: {
      padding: "20px",
      backgroundColor: "#f8f9fa",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      marginTop: "20px",
    },
    heading: {
      marginBottom: "20px",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    listGroup: {
      marginTop: "10px",
    },
    listItem: {
      padding: "10px",
      borderBottom: "1px solid #dee2e6",
    },
    link: {
      textDecoration: "none",
      color: "#007bff",
      fontWeight: "bold",
    },
    linkHover: {
      color: "#0056b3",
    },
  };

  return (
    <Container>
      <section style={styles.section}>
        <h2 style={styles.heading}>Applicants</h2>
        <ListGroup style={styles.listGroup}>
          {Object.keys(candidates).length !== 0 ? Object.values(candidates).map((user) => (
            <ListGroup.Item key={user._id} style={styles.listItem}>
              <Link
                to={`/profile/view/${user._id}`}
                style={styles.link}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = styles.linkHover.color)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = styles.link.color)
                }
              >
                {user.firstName} {user.secondName}
              </Link>
            </ListGroup.Item>
          )) : <p>No candidates have applied</p>}
        </ListGroup>
      </section>
    </Container>
  );
}
