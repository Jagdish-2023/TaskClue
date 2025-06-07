import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { useEffect } from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import LoginSignup from "./components/LoginSignup";
import ProjectDetails from "./components/ProjectDetails";
import TaskDetails from "./components/TaskDetails";
import Team from "./components/Team";
import TeamDetails from "./components/TeamDetails";
import Reports from "./components/Reports";

function App() {
  const url = useLocation();
  const path = url.pathname;
  const navigate = useNavigate();
  const { storageToken } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (path !== "/") {
      return;
    }

    if (storageToken) {
      navigate("/dashboard");
    }
  }, [storageToken, path]);

  return (
    <>
      {!storageToken && <LoginSignup />}

      {storageToken && (
        <>
          <Sidebar />

          <main className="main-section">
            <ToastContainer
              position="top-center"
              autoClose={4000}
              newestOnTop
              closeOnClick
            />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/project" element={<ProjectDetails />} />
              <Route path="/task/:taskId" element={<TaskDetails />} />
              <Route path="/teams" element={<Team />} />
              <Route path="/teams/:teamId" element={<TeamDetails />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </main>
        </>
      )}
    </>
  );
}

export default App;
