import { useNavigate } from "react-router-dom";
import serverRequest from "../../api/serverRequest";
import { useAuth } from "../../context/Auth";
import useForm from "../../hooks/useForm";
import { Link } from "react-router-dom";

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
    if (!values.firstName) {
      values.firstName = "First Name is requred";
    }
    if (!values.secondName) {
      values.secondName = "Second Name is requred";
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>
        <div>
          <label>Second Name:</label>
          <input
            type="text"
            name="secondName"
            value={values.secondName}
            onChange={handleChange}
            required
          />
          {errors.secondName && <p>{errors.secondName}</p>}
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="location"
            value={values.location}
            onChange={handleChange}
            required
          />
          {errors.location && <p>{errors.location}</p>}
        </div>
        <div>
          <label>Experience:</label>
          <div>
            <label>
              <input
                type="radio"
                name="level"
                value="Beginner"
                checked={values.level === "Beginner"}
                onChange={handleChange}
              />
              Beginner
            </label>
            <label>
              <input
                type="radio"
                name="level"
                value="Intermediate"
                checked={values.level === "Intermediate"}
                onChange={handleChange}
              />
              Intermediate
            </label>
            <label>
              <input
                type="radio"
                name="level"
                value="Expert"
                checked={values.lvel === "Expert"}
                onChange={handleChange}
              />
              Expert
            </label>
          </div>
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <button type="button" onClick={resetForm}>
          Reset
        </button>
      </form>
      <p>If already have an account, please <Link to="/login">Login</Link> </p>
    </>
  );
}
