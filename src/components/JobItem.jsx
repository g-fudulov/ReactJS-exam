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
      <p>{location}</p>
      <p>{description}</p>
      <p>{salary}</p>
      <p>{level}</p>
      <Link to={`/jobs/view/${_id}`}>View More</Link>
    </div>
  );
}
