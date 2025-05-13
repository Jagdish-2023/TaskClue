import { useRef, useEffect, useState } from "react";

import AddTaskModalForm from "./AddTaskModalForm";

import { fetchProjectsAsync, filterTasksAsync } from "../features/taskSlice";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { storageToken, filteredTasks, projects, tags, error, status } =
    useSelector((state) => state.tasks);

  const openTaskModalBtnRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  const [selectedTag, setSelectedTag] = useState(queryParams?.tags || "");
  const [sortOptions, setSortOptions] = useState({
    dueDate: false,
    AtoZ: false,
    ZtoA: false,
  });

  const handleProjectCard = (projectId) => {
    setSearchParams({ project: projectId });
  };

  const handleSort = (e) => {
    const { checked: isChecked, value } = e.target;

    if (value === "dueDate")
      return setSortOptions({ dueDate: isChecked, AtoZ: false, ZtoA: false });
    if (value === "AtoZ")
      return setSortOptions({ dueDate: false, AtoZ: isChecked, ZtoA: false });
    if (value === "ZtoA")
      return setSortOptions({ dueDate: false, AtoZ: false, ZtoA: isChecked });
  };

  const handleTagSelect = (e) => {
    const tag = e.target.value;
    setSelectedTag(tag);

    if (tag === "All" || tag === "") {
      setSearchParams({ project: queryParams.project });
    } else {
      setSearchParams({ ...queryParams, tag });
    }
  };

  const getRemainingDays = (timeToComplete, createdAt) => {
    const todayDate = new Date();
    const closingDate = new Date(createdAt);
    closingDate.setDate(closingDate.getDate() + timeToComplete);

    const daysDiff = closingDate - todayDate;
    const remainingDays = Math.ceil(daysDiff / (1000 * 60 * 60 * 24));

    if (remainingDays < 0) {
      return "Overdue";
    } else {
      return `${remainingDays} days`;
    }
  };

  useEffect(() => {
    if (!storageToken) {
      navigate("/");
    }

    if (queryParams.project) {
      dispatch(filterTasksAsync(queryParams));
    } else {
      if (projects.length < 1) {
        dispatch(fetchProjectsAsync());
      }
    }
  }, [searchParams, storageToken]);
  return (
    <>
      {storageToken && !queryParams?.project && (
        <div className="p-3">
          <h2>All Projects</h2>
          <div className="mt-4">
            <div className="row">
              {projects.map((project) => (
                <div className="col-md-4" key={project._id}>
                  <div
                    style={{ cursor: "pointer" }}
                    className="card bg-light dashboard-cards"
                    onClick={() => handleProjectCard(project._id)}
                  >
                    <div className="card-body">
                      <div className="bg-warning bg-opacity-10 status-container rounded-1 px-1">
                        <span className="text-warning">In Progress</span>
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
          </div>
        </div>
      )}
      {storageToken && queryParams?.project && (
        <div className="p-3">
          {status === "loading" && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {filteredTasks?.project && status === "success" && (
            <>
              <div>
                <h2>{filteredTasks.project.name}</h2>
                <p>{filteredTasks.project.description}</p>
              </div>

              <section className="mt-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-between align-items-center gap-2">
                    <div>Sort by:</div>

                    <div>
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-2-outlined-dueDate"
                        value="dueDate"
                        autoComplete="off"
                        checked={sortOptions.dueDate}
                        onChange={handleSort}
                      />
                      <label
                        className="btn btn-outline-secondary  rounded-pill"
                        htmlFor="btn-check-2-outlined-dueDate"
                      >
                        Due Date
                      </label>
                    </div>

                    <div>
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-2-outlined-AtoZ"
                        autoComplete="off"
                        value="AtoZ"
                        checked={sortOptions.AtoZ}
                        onChange={handleSort}
                      />
                      <label
                        className="btn btn-outline-secondary  rounded-pill"
                        htmlFor="btn-check-2-outlined-AtoZ"
                      >
                        A to Z
                      </label>
                    </div>

                    <div>
                      <input
                        type="checkbox"
                        className="btn-check"
                        id="btn-check-2-outlined-ZtoA"
                        autoComplete="off"
                        value="ZtoA"
                        checked={sortOptions.ZtoA}
                        onChange={handleSort}
                      />
                      <label
                        className="btn btn-outline-secondary  rounded-pill"
                        htmlFor="btn-check-2-outlined-ZtoA"
                      >
                        Z to A
                      </label>
                    </div>
                  </div>
                  <div className="d-flex gap-2 justify-content-between align-items-center">
                    <div>
                      <select
                        className="form-select"
                        onChange={handleTagSelect}
                        value={selectedTag}
                      >
                        <option value="">Filter by tags</option>
                        <option value="All">All</option>
                        {tags &&
                          tags.map((tag) => (
                            <option key={tag._id} value={tag.name}>
                              {tag.name}
                            </option>
                          ))}
                      </select>
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
                </div>
              </section>

              <section>
                <div className="mt-3">
                  {filteredTasks && (
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="bg-info-subtle text-info-emphasis"
                          >
                            Tasks
                          </th>
                          <th
                            scope="col"
                            className="bg-info-subtle text-info-emphasis"
                          >
                            Owners
                          </th>
                          <th
                            scope="col"
                            className="bg-info-subtle text-info-emphasis"
                          >
                            Remaining Time
                          </th>
                          <th
                            scope="col"
                            className="bg-info-subtle text-info-emphasis"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="bg-info-subtle text-info-emphasis"
                          ></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTasks.tasks.map((task) => (
                          <tr key={task._id}>
                            <th scope="row">{task.name}</th>
                            <td>
                              {task.owners
                                .map((owner) => owner.name.split(" ")[0])
                                .join(", ")}
                            </td>
                            <td>
                              {getRemainingDays(
                                task.timeToComplete,
                                task.createdAt
                              )}
                            </td>
                            <td
                              className={`${
                                task.status === "Completed"
                                  ? "text-success"
                                  : "text-warning"
                              }`}
                            >
                              {task.status}
                            </td>
                            <td>
                              <Link to={`/task/${task._id}`}>See details</Link>
                            </td>
                          </tr>
                        ))}

                        {filteredTasks.tasks.length < 1 && (
                          <tr>
                            <td colSpan="4">No match found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      )}
      <AddTaskModalForm options={{ openTaskModalBtnRef, projects }} />
    </>
  );
};

export default ProjectDetails;
