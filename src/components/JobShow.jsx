import { useParams } from "react-router-dom";
import useGetMethod from "../hooks/useGetMethod"

export default function JobShow() {
  const { jobId } = useParams();
  const [job, setJob] = useGetMethod(`http://localhost:3030/data/jobs/${jobId}`);
  return (
    <main>
      <h1>{job.title}</h1>
      <section>
        <p>Description{job.description}</p>
        <p>Salary: {job.salary}</p>
        <p>Experience: {job.level}</p>
        <p>Location: {job.location}</p>
        <p>Posted: {new Date(job._createdOn).toString()}</p>
        <p>Public Job ID: {job._id}</p>
      </section>
    </main>
  );
}
