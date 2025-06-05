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
      navigate("/");
    }
  }, [storageToken]);
  return (
    <>
      <nav
        className="navbar d-md-none"
        style={{ backgroundColor: "rgb(239 236 249)" }}
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/dashboard">
            TaskClue
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSidebar"
            aria-controls="offcanvasSidebar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      {/* offcanvas */}
      <div
        className="offcanvas offcanvas-start d-md-none"
        tabIndex="-1"
        id="offcanvasSidebar"
        aria-labelledby="offcanvasSidebarLabel"
        style={{ width: "300px" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasSidebarLabel">
            TaskClue
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <nav className="navbar-nav flex-column">
            <NavLink
              className={`nav-link ${
                path === "/dashboard" && "nav-link-active"
              }`}
              to="/dashboard"
            >
              Dashboard
            </NavLink>
            <NavLink
              className={`nav-link ${path === "/project" && "nav-link-active"}`}
              to="/project"
            >
              Project
            </NavLink>
            <NavLink
              className={`nav-link ${path === "/teams" && "nav-link-active"}`}
              to="/teams"
            >
              Team
            </NavLink>
            <NavLink
              className={`nav-link ${path === "/reports" && "nav-link-active"}`}
              to="/reports"
            >
              Reports
            </NavLink>

            <div className="logout-container">
              <span className="logout-btn" onClick={handleLogout}>
                Logout
              </span>
            </div>
          </nav>
        </div>
      </div>

      {/* for md+ screen */}
      <div
        className="position-fixed vh-100 d-none d-md-block"
        style={{ width: "250px", backgroundColor: "rgb(239 236 249)" }}
      >
        <nav className="navbar flex-column py-1">
          <div>
            <NavLink className="navbar-brand" to="/dashboard">
              TaskClue
            </NavLink>
          </div>
          <div className="d-flex flex-column gap-4 mt-4 nav-links">
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

            <div className="logout-container">
              <span className="logout-btn" onClick={handleLogout}>
                Logout
              </span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
