import { Link } from "react-router-dom";
import { useAuth } from "../context/Auth";

export default function Header() {
  const { currentUser, isLoggedIn } = useAuth();
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/market">Jobs Market</Link>
      {isLoggedIn ? (
        <>
          <Link to="/logout">LogOut</Link>
          <Link to={`/profile/view/${currentUser._id}`}>
            {currentUser.email}
          </Link>
        </>
      ) : (
        <>
          <Link to="/login">LogIn</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </header>
  );
}
