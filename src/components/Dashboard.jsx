import { useEffect, useRef, useState } from "react";
import LoginSignup from "./LoginSignup";
// import { fetchTasks, fetchAllProjects } from "../axios/axios.api";
import { fetchTasksAsync, fetchProjectsAsync } from "../features/taskSlice";
import "../css/dashboard.css";
import AddTaskModalForm from "./AddTaskModalForm";
import AddProjectModalForm from "./AddProjectModalForm";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, status, projects, tasks, storageToken } = useSelector(
    (state) => state.tasks
  );

  const openTaskModalBtnRef = useRef(null);
  const openProjectModalRef = useRef(null);

  const handleProjectCard = (projectId) => {
    navigate(`/project?project=${projectId}`);
  };

  const handleTaskCard = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  const getProjectStatus = (projectId) => {
    const findPendingTask = tasks.find(
      (task) => task.project._id === projectId && task.status !== "Completed"
    );
    if (findPendingTask) {
      return "In Progress";
    }

    return "Completed";
  };

  useEffect(() => {
    if (!storageToken) {
      navigate("/");
    }

    if (projects.length < 1) {
      dispatch(fetchProjectsAsync());
    }

    if (tasks.length < 1) {
      dispatch(fetchTasksAsync());
    }
  }, [storageToken, projects, tasks]);

  return (
    <div className="p-3">
      {error && <p>{error}</p>}
      {status === "loading" && <p>Loading...</p>}
      {storageToken && tasks.length > 0 && (
        <div>
          <section>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex">
                <div>
                  <h3 className="fw-bold">Projects</h3>
                </div>
                {/* <div className="ps-4">
                  <select className="form-select">
                    <option value="">Filter</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div> */}
              </div>

              <div>
                <button
                  className="btn btn-primary"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#projectModal"
                  ref={openProjectModalRef}
                >
                  + New Project
                </button>
              </div>
            </div>

            {/* projects cards */}
            {projects.length > 0 && (
              <div className="row mt-2">
                {projects.map((project) => (
                  <div className="col-md-4" key={project._id}>
                    <div
                      className="card bg-light dashboard-cards"
                      onClick={() => handleProjectCard(project._id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card-body">
                        <div className="bg-warning bg-opacity-10 status-container rounded-1 px-1">
                          <span className="text-warning">
                            {getProjectStatus(project._id)}
                          </span>
                        </div>
                        <div className="mt-3">
                          <h5 className="card-title fw-bold">{project.name}</h5>

                          {project?.description && (
                            <p className="card-text">{project.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Tasks section */}
          <section className="mt-5">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex">
                <div>
                  <h3 className="fw-bold">Tasks</h3>
                </div>
                {/* <div className="ps-4">
                  <select name="" id="" className="form-select">
                    <option value="">Filter</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div> */}
              </div>

              <div>
                <button
                  className="btn btn-primary"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#taskModal"
                  ref={openTaskModalBtnRef}
                >
                  + New Task
                </button>
              </div>
            </div>

            {/* Task cards */}
            {tasks.length > 0 && (
              <div className="row mt-2">
                {tasks.map((task, index) => {
                  if (index <= 2) {
                    return (
                      <div className="col-md-4" key={task._id}>
                        <div
                          className="card bg-light dashboard-cards"
                          onClick={() => handleTaskCard(task._id)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="card-body">
                            <div
                              className={`${
                                task.status === "Completed"
                                  ? "bg-success"
                                  : "bg-warning"
                              } bg-opacity-10 status-container rounded-1 px-1`}
                            >
                              <span
                                className={
                                  task.status !== "Completed"
                                    ? "text-warning"
                                    : "text-success"
                                }
                              >
                                {task.status}
                              </span>
                            </div>
                            <div className="mt-3">
                              <h5 className="card-title fw-bold">
                                {task.name}
                              </h5>
                              <p className="task-date">
                                {task.timeToComplete} days to Complete
                              </p>
                              <div className="d-flex gap-1">
                                {task.owners.map((owner) => (
                                  <div
                                    className="d-flex justify-content-center align-items-center bg-secondary text-white rounded-circle"
                                    style={{ width: "30px", height: "30px" }}
                                    key={owner._id}
                                  >
                                    {owner.name.charAt(0)}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </section>
        </div>
      )}

      {/* <!-- Modal --> */}
      <AddTaskModalForm openTaskModalBtnRef={openTaskModalBtnRef} />
      <AddProjectModalForm openProjectModalRef={openProjectModalRef} />
    </div>
  );
};

export default Dashboard;
