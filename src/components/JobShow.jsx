import { useParams, useNavigate } from "react-router-dom";
import useGetMethod from "../hooks/useGetMethod";
import { useAuth } from "../context/Auth";
import { Link } from "react-router-dom";
import serverRequest from "../api/serverRequest";

export default function JobShow() {
  const { jobId } = useParams();
  const { currentUser, isLoggedIn } = useAuth();
  const searchParams = new URLSearchParams({ load: "employer=_ownerId:users" });
  const [job, setJob, isLoading] = useGetMethod(
    {},
    `http://localhost:3030/data/jobs/${jobId}?${searchParams.toString()}`
  );

  const applyHandler = async () => {
    const response = await serverRequest(
      `http://localhost:3030/data/jobs/${jobId}?select=candidates`
    );
    const previousCandidates = response.candidates;
    const data = {
      candidates: {
        ...previousCandidates,
        [currentUser._id]: {
          email: currentUser.email,
          firstName: currentUser.firstName,
          secondName: currentUser.secondName,
          location: currentUser.location,
          level: currentUser.level,
          _id: currentUser._id,
        },
      },
    };

    const confirmation = await serverRequest(
      `http://localhost:3030/data/jobs/${jobId}`,
      "PATCH",
      data,
      null,
      currentUser.accessToken,
      true
    );
    setJob((oldJob) => ({
      ...oldJob,
      candidates: {
        ...oldJob.candidates,
        ...data.candidates,
      },
    }));

    alert("Aplication has been sent");
  };

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
        <p>
          Employer Name: {job.employer.firstName} {job.employer.secondName}
        </p>
        <p>Employer Email: {job.employer.email}</p>
        <p>Posted: {new Date(job._createdOn).toString()}</p>
        <p>Public Job ID: {job._id}</p>
        {currentUser._id === job._ownerId && (
          <Link to={`/jobs/edit/${jobId}`}>Edit</Link>
        )}
        {currentUser._id === job._ownerId && (
          <Link to={`/jobs/delete/${jobId}`}>Delete</Link>
        )}
        {Object.keys(job.candidates).includes(currentUser._id) ? (
          <p>Application has been sent</p>
        ) : (
          currentUser._id !== job._ownerId &&
          isLoggedIn && (
            <button onClick={applyHandler} disabled={isLoading}>
              Apply
            </button>
          )
        )}
        <p>
          Current aplications:{" "}
          {Object.keys(job.candidates).length !== 0
            ? Object.keys(job.candidates).length
            : 0}
        </p>
      </section>
      {/* TODO Show applicants when the user is the employer */}
    </main>
  );
}
