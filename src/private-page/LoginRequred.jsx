import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Auth";

export default function LoginRequired({ children }) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/login" />
  }
}