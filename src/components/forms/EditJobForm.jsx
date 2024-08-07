import { useParams } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { useAuth } from "../../context/Auth";
import useGetMethod from "../../hooks/useGetMethod";
import { useEffect } from "react";
import serverRequest from "../../api/serverRequest";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Spinner } from "react-bootstrap";

export default function EditJobForm() {
  const navigator = useNavigate();
  const { jobId } = useParams();
  const { currentUser } = useAuth();
  const [job, setJob, isLoading] = useGetMethod(
    null,
    `http://localhost:3030/data/jobs/${jobId}`
  );

  const initialValues = {
    title: "",
    description: "",
    salary: "",
    location: "",
    level: "",
  };

  const validate = (values) => {
    let errors = {};
    const numeric = /^[0-9]+$/;
    const alphabetical = /^[a-zA-Z\s]+$/;

    if (!values.title) {
      errors.title = "Title is required";
    }
    if (!values.description) {
      errors.description = "Description is required";
    }
    if (!values.salary) {
      errors.salary = "Salary is required";
    } else if (!numeric.test(values.salary)) {
      errors.salary = "Salary must be a number";
    }
    if (!values.location) {
      errors.location = "Country is required";
    } else if (!alphabetical.test(values.location)) {
      errors.location = "Country must contain only letters";
    }
    if (!values.level) {
      errors.level = "Level is required";
    }
    return errors;
  };

  const callback = async (values) => {
    const newJob = await serverRequest(
      `http://localhost:3030/data/jobs/${jobId}`,
      "PATCH",
      values,
      null,
      currentUser.accessToken
    );
    navigator(`/jobs/view/${newJob._id}`);
  };

  const {
    handleChange,
    handleSubmit,
    resetForm,
    values,
    errors,
    isSubmitting,
    setValues,
  } = useForm(initialValues, callback, validate);

  useEffect(() => {
    if (job) {
      const jobValues = {
        title: job.title,
        description: job.description,
        salary: job.salary,
        location: job.location,
        level: job.level,
      };
      setValues(jobValues);
    }
  }, [job]);

  if (isLoading || !job) {
    return (
      <Row className="justify-content-center" style={{ marginTop: "40vh" }}>
        <Spinner animation="border" variant="primary" />
      </Row>
    );
  }

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "92vh",
      backgroundColor: "#f8f9fa",
      flexDirection: "column",
    },
    form: {
      width: "100%",
      maxWidth: "600px",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#ffffff",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ced4da",
    },
    textarea: {
      resize: "none",
      width: "100%",
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #ced4da",
      minHeight: "100px",
    },
    button: {
      marginTop: "20px",
    },
    resetButton: {
      marginTop: "20px",
      marginLeft: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <Form onSubmit={handleSubmit} style={styles.form}>
        <Form.Group controlId="formTitle" style={styles.formGroup}>
          <Form.Label style={styles.label}>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            isInvalid={!!errors.title}
            style={styles.input}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDescription" style={styles.formGroup}>
          <Form.Label style={styles.label}>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={values.description}
            onChange={handleChange}
            isInvalid={!!errors.description}
            style={styles.textarea}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formSalary" style={styles.formGroup}>
          <Form.Label style={styles.label}>Salary</Form.Label>
          <Form.Control
            type="number"
            min="900"
            max="100000"
            name="salary"
            value={values.salary}
            onChange={handleChange}
            isInvalid={!!errors.salary}
            style={styles.input}
          />
          <Form.Control.Feedback type="invalid">
            {errors.salary}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formLocation" style={styles.formGroup}>
          <Form.Label style={styles.label}>Country</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={values.location}
            onChange={handleChange}
            isInvalid={!!errors.location}
            style={styles.input}
          />
          <Form.Control.Feedback type="invalid">
            {errors.location}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formLevel" style={styles.formGroup}>
          <Form.Label style={styles.label}>Experience</Form.Label>
          <div>
            <Form.Check
              type="radio"
              id="levelBeginner"
              label="Beginner"
              name="level"
              value="Beginner"
              checked={values.level === "Beginner"}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              id="levelIntermediate"
              label="Intermediate"
              name="level"
              value="Intermediate"
              checked={values.level === "Intermediate"}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              id="levelAdvanced"
              label="Advanced"
              name="level"
              value="Advanced"
              checked={values.level === "Advanced"}
              onChange={handleChange}
            />
          </div>
          {errors.level && <p style={{ color: "red" }}>{errors.level}</p>}
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
          style={styles.button}
        >
          {isSubmitting ? "Submitting..." : "Update"}
        </Button>

        <Button
          variant="secondary"
          type="button"
          onClick={resetForm}
          style={styles.resetButton}
        >
          Reset
        </Button>
      </Form>
    </div>
  );
}
