import { useParams } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { Link } from "react-router-dom";
import serverRequest from "../../api/serverRequest";

export default function DeleteJobForm() {
  const { jobId } = useParams();
  const { currentUser } = useAuth();

  const handleDelete = async () => {
    const confirmation = await serverRequest(
      `http://localhost:3030/data/jobs/${jobId}`,
      "DELETE",
      null,
      null,
      currentUser.accessToken
    );
    if (confirmation._deletedOn) {
      alert("Job Post Deleted");
    }
  };

  return (
    <main>
      <h1>Deleting job with Id: {jobId}?</h1>
      <Link onClick={handleDelete} to={`/profile/view/${currentUser._id}`}>
        Delete
      </Link>
      <Link to={`/jobs/edit/${jobId}`}>No</Link>
    </main>
  );
}
