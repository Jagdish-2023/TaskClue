import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../css/sidebar.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "../features/taskSlice";

const Sidebar = () => {
  const url = useLocation();
  const navigate = useNavigate();
  const { storageToken } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const path = url.pathname;

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  useEffect(() => {
    if (!storageToken) {
      return navigate("/");
    }
  }, [storageToken]);
  return (
    <div className="">
      <div>
        <nav className="nav flex-column py-1">
          <NavLink className="nav-brand" to="/dashboard">
            TaskClue
          </NavLink>
          <div className="d-flex flex-column gap-2 nav-links">
            <NavLink
              to="/dashboard"
              className={`nav-link ${
                (path === "/" || path === "/dashboard") && "nav-link-active"
              }`}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/project"
              className={`nav-link ${path === "/project" && "nav-link-active"}`}
            >
              Project
            </NavLink>
            <NavLink
              to="/teams"
              className={`nav-link ${path === "/teams" && "nav-link-active"}`}
            >
              Team
            </NavLink>
            <NavLink
              to="/reports"
              className={`nav-link ${path === "/reports" && "nav-link-active"}`}
            >
              Reports
            </NavLink>
          </div>

          <div className="logout-container">
            <span className="logout-btn" onClick={handleLogout}>
              Logout
            </span>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
