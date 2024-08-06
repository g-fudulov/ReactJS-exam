import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import serverRequest from "../../api/serverRequest";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function DeleteJobForm() {
  const { jobId } = useParams();
  const { currentUser } = useAuth();
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();

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
      navigate(`/profile/view/${currentUser._id}`);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    navigate(`/jobs/view/${jobId}`);
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete the job with ID: {jobId}?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
