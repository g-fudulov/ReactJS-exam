import "./App.css";
import CreateJobForm from "./components/forms/CreateJobForm";
import DeleteJobForm from "./components/forms/DeleteJobForm";
import DeleteUserForm from "./components/forms/DeleteUserForm";
import EditJobForm from "./components/forms/EditJobForm";
import EditUserForm from "./components/forms/EditUserForm";
import LoginForm from "./components/forms/LoginForm";
import LogoutForm from "./components/forms/LogoutForm";
import RegisterForm from "./components/forms/RegisterForm";
import Header from "./components/Header";
import Home from "./components/Home";
import ProfileShow from "./components/ProfileShow";
import { AuthProvider } from "./context/Auth";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/logout" element={<LogoutForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile/view/:profileId" element={<ProfileShow />} />
        <Route path="/profile/edit/:profileId" element={<EditUserForm />} />
        <Route path="/profile/delete/:profileId" element={<DeleteUserForm />} />
        {/* <Route path="/market" element={<Home />} /> */}
        <Route path="/jobs/create" element={<CreateJobForm />} />
        <Route path="/jobs/edit/:jobId" element={<EditJobForm />} />
        <Route path="/jobs/delete/:jobId" element={<DeleteJobForm />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
