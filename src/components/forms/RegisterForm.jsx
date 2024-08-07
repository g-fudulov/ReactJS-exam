import { useNavigate } from "react-router-dom";
import serverRequest from "../../api/serverRequest";
import { useAuth } from "../../context/Auth";
import useForm from "../../hooks/useForm";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default function RegisterForm() {
  const { loginUser } = useAuth();
  const navigator = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    secondName: "",
    location: "",
    level: "Beginner",
  };

  const callback = async (values) => {
    const { confirmPassword: _, ...data } = values;
    resetForm();
    const newUser = await serverRequest(
      "http://localhost:3030/users/register",
      "POST",
      data
    );
    if (newUser.status === 409) {
      return alert("User with this email already exists");
    }
    const {
      accessToken: _2,
      password: _3,
      _id: key,
      ...jsonStoreData
    } = newUser;
    await serverRequest("http://localhost:3030/jsonstore/users/", "POST", {
      ...jsonStoreData,
      key,
    });
    const { password: __, ...user } = newUser;
    loginUser(user);
    navigator(`/profile/view/${user._id}`);
  };

  const validate = (values) => {
    let errors = {};
    const alphabetical = /^[a-zA-Z\s]+$/;

    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.password || !values.confirmPassword) {
      errors.password = "Password is required";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (values.password.length < 6) {
      errors.password = "Password must be longer than 6 characters";
    }
    if (!values.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!values.secondName) {
      errors.secondName = "Second Name is required";
    }
    if (!values.location) {
      errors.location = "Country is required";
    } else if (!alphabetical.test(values.location)) {
      errors.location = "Country must contain only letters";
    }
    return errors;
  };

  const {
    handleChange,
    handleSubmit,
    resetForm,
    values,
    errors,
    isSubmitting,
  } = useForm(initialValues, callback, validate);

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
      maxWidth: "500px",
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
    button: {
      marginTop: "20px",
    },
    resetButton: {
      marginTop: "20px",
      marginLeft: "10px",
    },
    link: {
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <Form onSubmit={handleSubmit} style={styles.form}>
        <Form.Group controlId="formEmail" style={styles.formGroup}>
          <Form.Label style={styles.label}>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            style={styles.input}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword" style={styles.formGroup}>
          <Form.Label style={styles.label}>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
            style={styles.input}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formConfirmPassword" style={styles.formGroup}>
          <Form.Label style={styles.label}>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            isInvalid={!!errors.confirmPassword}
            style={styles.input}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formFirstName" style={styles.formGroup}>
          <Form.Label style={styles.label}>First Name:</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            isInvalid={!!errors.firstName}
            style={styles.input}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formSecondName" style={styles.formGroup}>
          <Form.Label style={styles.label}>Second Name:</Form.Label>
          <Form.Control
            type="text"
            name="secondName"
            value={values.secondName}
            onChange={handleChange}
            isInvalid={!!errors.secondName}
            style={styles.input}
          />
          <Form.Control.Feedback type="invalid">
            {errors.secondName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formLocation" style={styles.formGroup}>
          <Form.Label style={styles.label}>Country:</Form.Label>
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
          <Form.Label style={styles.label}>Experience:</Form.Label>
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
              id="levelExpert"
              label="Expert"
              name="level"
              value="Expert"
              checked={values.level === "Expert"}
              onChange={handleChange}
            />
          </div>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
          style={styles.button}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
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
      <p style={styles.link}>
        If you already have an account, please <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
