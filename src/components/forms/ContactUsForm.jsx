import useForm from "../../hooks/useForm";
import { Form, Button } from "react-bootstrap";
import serverRequest from "../../api/serverRequest";

export default function ContactUsForm() {
  const initialValues = { name: "", email: "", message: "" };
  const validate = (values) => {
    let errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.message) {
      errors.message = "Message is required";
    }
    return errors;
  };

  const callback = async (values) => {
    resetForm();
    const question = await serverRequest(
      "http://localhost:3030/jsonstore/questions/",
      "POST",
      values
    );
    alert("Message is sent");
  };
  const {
    handleChange,
    handleSubmit,
    resetForm,
    values,
    errors,
    isSubmitting,
  } = useForm(initialValues, callback, validate);
  return (
    <>
      {" "}
      <h5>Contact Us</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your name"
            name="name"
            value={values.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email"
            name="email"
            value={values.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
        </Form.Group>
        <Form.Group controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Your question"
            name="message"
            value={values.message}
            onChange={handleChange}
            isInvalid={!!errors.message}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
          style={{ marginTop: "10px" }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </Form>
    </>
  );
}
