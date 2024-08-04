import { useNavigate } from "react-router-dom";
import serverRequest from "../../api/serverRequest";
import { useAuth } from "../../context/Auth";
import useForm from "../../hooks/useForm";

export default function CreateJobForm() {
  const { currentUser } = useAuth();
  const navigator = useNavigate();
  const initialValues = {
    title: "",
    description: "",
    salary: "",
    location: "",
    level: "Beginner",
  };

  const callback = async (values) => {
    resetForm();
    const newJob = await serverRequest(
      "http://localhost:3030/data/jobs",
      "POST",
      values,
      null,
      currentUser.accessToken
    );
    navigator(`/jobs/view/${newJob._id}`);
    // Implement enrolled profiles when doing the POST request
  };

  const validate = (values) => {
    let errors = {};
    const numeric = /^[0-9]+$/;
    // const alphabetical = /^[a-zA-Z]+$/;
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
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={values.title}
          onChange={handleChange}
        />
        {errors.title && <p>{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={values.description}
          onChange={handleChange}
        />
        {errors.description && <p>{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="salary">Salary</label>
        <input
          type="number"
          min="900"
          max="100000"
          name="salary"
          id="salary"
          value={values.salary}
          onChange={handleChange}
        />
        {errors.salary && <p>{errors.salary}</p>}
      </div>

      <div>
        <label htmlFor="location">Country</label>
        <input
          type="text"
          name="location"
          id="location"
          value={values.location}
          onChange={handleChange}
        />
        {errors.location && <p>{errors.location}</p>}
      </div>

      <div>
        <label>Level</label>
        <div>
          <input
            type="radio"
            name="level"
            value="Beginner"
            checked={values.level === "Beginner"}
            onChange={handleChange}
          />
          Beginner
        </div>
        <div>
          <input
            type="radio"
            name="level"
            value="Intermediate"
            checked={values.level === "Intermediate"}
            onChange={handleChange}
          />
          Intermediate
        </div>
        <div>
          <input
            type="radio"
            name="level"
            value="Advanced"
            checked={values.level === "Advanced"}
            onChange={handleChange}
          />
          Advanced
        </div>
        {errors.level && <p>{errors.level}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        Create Job
      </button>
    </form>
  );
}
