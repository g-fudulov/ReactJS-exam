import { useAuth } from "../../context/Auth";
import useForm from "../../hooks/useForm";
import serverRequest from "../../api/serverRequest";
import { useNavigate } from "react-router-dom";

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

  return (
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
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
