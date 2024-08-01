import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { useEffect, useState } from "react";
import serverRequest from "../../api/serverRequest";

export default function LogoutForm() {
  const { currentUser, logoutUser } = useAuth();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await serverRequest(
        "http://localhost:3030/users/logout",
        "GET",
        null,
        null,
        currentUser.accessToken
      );
      if (response.status === 204) {
        setIsLoggedOut(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (isLoggedOut) {
      logoutUser();
    }
  }, [isLoggedOut]);

  if (isLoggedOut) {
    return <Navigate to="/" />;
  }

  return <p>Logging out...</p>;
}
