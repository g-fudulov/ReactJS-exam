import { Link } from "react-router-dom";
import Banner from "./Banner";

export default function Home() {
  return (
    <>
      <Banner />
      <h1>Home</h1>
      <Link to="/jobs/create">Create a Job</Link>
    </>
  );
}
