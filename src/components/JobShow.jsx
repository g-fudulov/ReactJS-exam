import { useParams } from "react-router-dom";
import useGetMethod from "../hooks/useGetMethod";
import { useAuth } from "../context/Auth";
import { Link } from "react-router-dom";

export default function JobShow() {
  const { jobId } = useParams();
  const { currentUser } = useAuth();
  const searchParams = new URLSearchParams({ load: "employer=_ownerId:users" });
  const [job, setJob, isLoading] = useGetMethod(
    {},
    `http://localhost:3030/data/jobs/${jobId}?${searchParams.toString()}`
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <h1>{job.title}</h1>
      <section>
        <p>Description: {job.description}</p>
        <p>Salary: {job.salary}</p>
        <p>Experience: {job.level}</p>
        <p>Location: {job.location}</p>
        {/* <Link to={`/profile/view/${job.employer._id}`}> */}
          <p>
            Employer Name: {job.employer.firstName} {job.employer.secondName}
          </p>
        {/* </Link> */}
        <p>Employer Email: {job.employer.email}</p>
        <p>Posted: {new Date(job._createdOn).toString()}</p>
        <p>Public Job ID: {job._id}</p>
        {currentUser._id === job._ownerId && <Link to={`/jobs/edit/${jobId}`}>Edit</Link>}
        {currentUser._id === job._ownerId && <Link to={`/jobs/delete/${jobId}`}>Delete</Link>}
        {/* Show the count of enrolled users */}
      </section>
    </main>
  );
}
