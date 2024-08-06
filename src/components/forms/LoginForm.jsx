import { useAuth } from "../../context/Auth";
import useForm from "../../hooks/useForm";
import serverRequest from "../../api/serverRequest";
import { Link, useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default function LoginForm() {
  const { currentUser, loginUser } = useAuth();
  const navigator = useNavigate();
  const initialValues = { email: "", password: "" };

  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const callback = async (values) => {
    const newUser = await serverRequest(
      "http://localhost:3030/users/login",
      "POST",
      values
    );
    if (newUser.code === 403) {
      alert(`${newUser.message}`);
    } else {
      resetForm();
      const { password: _, ...user } = newUser;
      loginUser(user);
      navigator(`/profile/view/${user._id}`);
    }
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
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
    },
    form: {
      width: "100%",
      maxWidth: "400px",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#ffffff",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
    },
    link: {
      marginTop: "20px",
    },
    button: {
      marginTop: "18px",
    },
  };

  return (
    <div style={styles.container}>
      <Form onSubmit={handleSubmit} style={styles.form}>
        <Form.Group controlId="formEmail">
          <Form.Label style={styles.label}>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
          />
          {errors.email && <Alert variant="danger">{errors.email}</Alert>}
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label style={styles.label}>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            required
          />
          {errors.password && <Alert variant="danger">{errors.password}</Alert>}
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
          style={styles.button}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </Form>
      <p style={styles.link}>
        If you do not have an account, please{" "}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
