import useGetMethod from "../hooks/useGetMethod";
import JobItem from "./JobItem";

export default function Market() {
  const [allJobs, setAllJobs, isLoading] = useGetMethod(
    [],
    "http://localhost:3030/data/jobs"
  );

  return (
    <main>
    <h1>Recent Jobs</h1>
      <section>
        {isLoading ? (
          <p>Loading...</p>
        ) : allJobs.length === 0 ? (
          <p>No Recent Jobs</p>
        ) : (
          allJobs.map((job) => <JobItem key={job._id} {...job} />)
        )}
      </section>
    </main>
  );
}
