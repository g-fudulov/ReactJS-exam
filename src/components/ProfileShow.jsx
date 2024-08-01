import { useParams } from "react-router-dom";
import { useAuth } from "../context/Auth";

export default function ProfileShow() {
  const { profileId } = useParams();
  const { currentUser } = useAuth();
  return (
    <main>
      <h1>Welcome, {currentUser.firstName}</h1>
      <section>
        <p>Email: {currentUser.email}</p>
        <p>First Name: {currentUser.firstName}</p>
        <p>Second Name: {currentUser.secondName}</p>
        <p>Country: {currentUser.location}</p>
        <p>Joined: {new Date(currentUser._createdOn).toString()}</p>
        <p>Public Profile ID: {profileId}</p>
      </section>
    </main>
  );
}
