import useGetMethod from "../hooks/useGetMethod";
import JobItem from "./JobItem";

export default function ApplicationsShow({ profileId }) {
  const [jobs, setJobs, isLoading] = useGetMethod(
    [],
    "http://localhost:3030/data/jobs"
  );
  const userApplications = jobs.filter(
    (job) =>
      job.candidates &&
      Object.values(job.candidates).some(
        (candidate) => candidate._id === profileId
      )
  );
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (userApplications.length === 0) {
    return <p>No job applications found.</p>;
  }

  return (
    <section>
    <h2>Your applications</h2>
    {userApplications.map((job) => (<JobItem  key={job._id} {...job} />))}
    </section>
  );
}
