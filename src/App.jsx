import "./App.css";
import CreateJobForm from "./components/forms/CreateJobForm";
import DeleteJobForm from "./components/forms/DeleteJobForm";
import EditJobForm from "./components/forms/EditJobForm";
import LoginForm from "./components/forms/LoginForm";
import LogoutForm from "./components/forms/LogoutForm";
import RegisterForm from "./components/forms/RegisterForm";
import Header from "./components/Header";
import Home from "./components/Home";
import ProfileShow from "./components/ProfileShow";
import { AuthProvider } from "./context/Auth";
import { Route, Routes } from "react-router-dom";
import LoginRequired from "./private-page/LoginRequred";
import JobShow from "./components/JobShow";
import Market from "./components/Market";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  //
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/logout"
          element={
            <LoginRequired>
              <LogoutForm />
            </LoginRequired>
          }
        />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/profile/view/:profileId"
          element={
            <LoginRequired>
              <ProfileShow />
            </LoginRequired>
          }
        />
        <Route path="/market" element={<Market />} />
        <Route path="/jobs/view/:jobId" element={<JobShow />} />
        <Route
          path="/jobs/create"
          element={
            <LoginRequired>
              <CreateJobForm />
            </LoginRequired>
          }
        />
        <Route
          path="/jobs/edit/:jobId"
          element={
            <LoginRequired>
              <EditJobForm />
            </LoginRequired>
          }
        />
        <Route
          path="/jobs/delete/:jobId"
          element={
            <LoginRequired>
              <DeleteJobForm />
            </LoginRequired>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
