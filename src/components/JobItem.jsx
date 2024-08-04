import { Link } from "react-router-dom";

export default function JobItem({
  title,
  description,
  salary,
  location,
  level,
  employer,
  _id,
}) {
  return (
    <div className="job-item">
      <h1>{title}</h1>
      <p>Location: {location}</p>
      <p>Salary: {salary}</p>
      <p>Experience: {level}</p>
      <Link to={`/jobs/view/${_id}`}>View More</Link>
    </div>
  );
}
