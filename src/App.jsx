import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

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
  // const token = localStorage.getItem("userToken");

  // useEffect(() => {
  //   const handleChangeInLocalStorage = () => {
  //     setToken(localStorage.getItem("userToken"));
  //   };

  //   window.addEventListener("storage", handleChangeInLocalStorage);

  //   return () => {
  //     window.removeEventListener("storage", handleChangeInLocalStorage);
  //   };
  // }, []);

  useEffect(() => {
    if (path !== "/") {
      return;
    }

    if (storageToken) {
      navigate("/dashboard");
    }
  }, [storageToken]);

  return (
    <div className={path !== "/reports" ? "row vh-100 m-0" : "row m-0"}>
      {!storageToken && <LoginSignup />}

      {storageToken && (
        <>
          <section
            className={
              path !== "/reports"
                ? "col-md-2 h-100 side-nav-section"
                : "col-md-2 side-nav-section"
            }
          >
            <Sidebar />
          </section>

          <section className="col-md-10">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/project" element={<ProjectDetails />} />
              <Route path="/task/:taskId" element={<TaskDetails />} />
              <Route path="/teams" element={<Team />} />
              <Route path="/teams/:teamId" element={<TeamDetails />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </section>
        </>
      )}
    </div>
  );
}

export default App;
