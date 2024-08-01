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
    // validation
    return errors;
  };

  const callback = async (values) => {
    const newUser = await serverRequest(
      "http://localhost:3030/users/login",
      "POST",
      values
    );
    const { password: _, ...user } = newUser;
    loginUser(user);
    resetForm();
    navigator(`/profile/view/${user._id}`);
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
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
