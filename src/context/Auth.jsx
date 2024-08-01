import { useContext, createContext, useState } from "react";

const AuthContext = createContext({ email: "" });

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({ email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginUser = (value) => {
    setCurrentUser(value);
    setIsLoggedIn(true);
  };

  const logoutUser = () => {
    setCurrentUser({ email: "" });
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{ currentUser, isLoggedIn, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth, AuthProvider };
