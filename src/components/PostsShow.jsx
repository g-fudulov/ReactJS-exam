import useGetMethod from "../hooks/useGetMethod";
import JobItem from "./JobItem";

export default function PostsShow({ profileId }) {
  const searchParams = new URLSearchParams({
    where: `_ownerId="${profileId}"`,
  });
  const [jobs, setJobs, isLoading] = useGetMethod(
    [],
    `http://localhost:3030/data/jobs?${searchParams.toString()}`
  );

  return (
    <section>
    <h2>Your Job Posts</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs posted</p>
      ) : (
        jobs.map((job) => <JobItem key={job._id} {...job} />)
      )}
    </section>
  );
}
