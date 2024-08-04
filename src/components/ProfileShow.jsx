import { useParams } from "react-router-dom";
import { useAuth } from "../context/Auth";
import useGetMethod from "../hooks/useGetMethod";
import JobItem from "./JobItem";

export default function ProfileShow() {
  const { profileId } = useParams();
  const { currentUser } = useAuth();
  const searchParams = new URLSearchParams({
    where: `_ownerId="${profileId}"`,
  });
  const [jobs, setJobs, isLoading] = useGetMethod(
    [],
    `http://localhost:3030/data/jobs?${searchParams.toString()}`
  );

  return (
    <main>
      <h1>Welcome, {currentUser.firstName}</h1>
      <section>
        <p>Email: {currentUser.email}</p>
        <p>First Name: {currentUser.firstName}</p>
        <p>Second Name: {currentUser.secondName}</p>
        <p>Country: {currentUser.location}</p>
        <p>Experience: {currentUser.level}</p>
        <p>Joined: {new Date(currentUser._createdOn).toString()}</p>
        <p>Public Profile ID: {profileId}</p>
      </section>
      <section>
        {isLoading ? (
          <p>Loading...</p>
        ) : jobs.length === 0 ? (
          <p>No jobs posted</p>
        ) : (
          jobs.map((job) => <JobItem key={job._id} {...job} />)
        )}
      </section>
    </main>
  );
}
