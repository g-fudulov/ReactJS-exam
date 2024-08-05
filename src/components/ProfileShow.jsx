import { useParams } from "react-router-dom";
import { useAuth } from "../context/Auth";
import PublicProfile from "./PublicProfile";
import PrivateProfile from "./PrivateProfile";

export default function ProfileShow() {
  const { profileId } = useParams();
  const { currentUser } = useAuth();

  if (currentUser._id === profileId) {
    return <PrivateProfile profileId={profileId} currentUser={currentUser} />;
  } else {
    return <PublicProfile profileId={profileId} />;
  }
}
