import { useState, useRef, useEffect } from "react";
import Select from "react-select";
import "../css/dashboard.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { useSelector, useDispatch } from "react-redux";

import {
  fetchTeamsAsync,
  fetchTagsAsync,
  fetchOwnersAsync,
  addNewTaskAsync,
  fetchProjectsAsync,
} from "../features/taskSlice";

const AddTaskModalForm = ({ openTaskModalBtnRef }) => {
  const dispatch = useDispatch();
  const { storageToken, projects, teams, owners, tags, error, status } =
    useSelector((state) => state.tasks);

  const [taskName, setTaskName] = useState("");

  const [projectSelect, setProjectSelect] = useState("");
  const [ownersSelect, setOwnersSelect] = useState([]);
  const [tagsSelect, setTagsSelect] = useState([]);
  const [teamSelect, setTeamSelect] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [daysToComplete, setDaysToComplete] = useState("");

  const [ownersWithLabel, setOwnersWithLabel] = useState([]);
  const [tagsWithLabel, setTagsWithLabel] = useState([]);

  useEffect(() => {
    if (!storageToken) {
      return;
    }

    if (teams.length < 1) dispatch(fetchTeamsAsync());
    if (owners.length < 1) dispatch(fetchOwnersAsync());
    if (tags.length < 1) dispatch(fetchTagsAsync());
    if (projects.length < 1) dispatch(fetchProjectsAsync());

    if (owners.length > 0) {
      const labeledOwners = owners.map((owner) => ({
        value: owner.id,
        label: owner.name,
      }));
      setOwnersWithLabel(labeledOwners);
    }

    if (tags.length > 0) {
      const tagsWithLabel = tags.map((tag) => ({
        value: tag.name,
        label: tag.name,
      }));
      setTagsWithLabel(tagsWithLabel);
    }
  }, [owners, tags]);

  // const modalRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      project: projectSelect,
      name: taskName,
      team: teamSelect,
      owners: ownersSelect.map((owner) => owner.value),
      tags: tagsSelect.map((tag) => tag.value),
      timeToComplete: parseInt(daysToComplete),
      status: taskStatus,
    };

    dispatch(addNewTaskAsync(newTask));

    if (openTaskModalBtnRef.current) {
      openTaskModalBtnRef.current.focus();
    }

    setProjectSelect("");
    setTaskName("");
    setTeamSelect("");
    setOwnersSelect([]);
    setTagsSelect([]);
    setDaysToComplete("");
    setTaskStatus("");

    // if (modalRef.current) {
    //   const modal = bootstrap.Modal.getInstance(modalRef.current);
    //   console.log(modal);
    //   console.log(modalRef.current);

    //   modal.hide();
    // }
  };

  return (
    <>
      <div
        className="modal fade"
        id="taskModal"
        tabIndex="-1"
        aria-labelledby="taskModalLabel"
        aria-hidden="true"
        // ref={modalRef}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="taskModalLabel">
                Create New Task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="taskForm" onSubmit={handleSubmit}>
                <div id="form-container" className="d-flex flex-column gap-3">
                  <div className="w-100">
                    <label htmlFor="project-list">Select Project</label>
                    <select
                      id="project-list"
                      className="form-select"
                      value={projectSelect}
                      onChange={(e) => setProjectSelect(e.target.value)}
                    >
                      <option value="">Select</option>
                      {projects.length > 0 &&
                        projects.map((project) => (
                          <option key={project._id} value={project._id}>
                            {project.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-100">
                    <label htmlFor="task-name">Task Name</label>
                    <input
                      id="task-name"
                      type="text"
                      placeholder="Enter Task Name"
                      className="form-control"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                    />
                  </div>

                  <div className="w-100">
                    <label htmlFor="team-list">Select Team</label>

                    <select
                      id="team-list"
                      className="form-select"
                      value={teamSelect}
                      onChange={(e) => setTeamSelect(e.target.value)}
                    >
                      <option value="">Select</option>
                      {teams.length > 0 &&
                        teams.map((t) => (
                          <option key={t._id} value={t._id}>
                            {t.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-100">
                    <label htmlFor="owners-select">Owners</label>
                    <Select
                      id="owners-select"
                      options={ownersWithLabel}
                      isMulti
                      placeholder="Select or search owners"
                      onChange={(owners) => setOwnersSelect(owners)}
                      value={ownersSelect}
                    />
                  </div>

                  <div className="w-100">
                    <label htmlFor="tags-select">Tags</label>
                    <Select
                      id="tags-select"
                      options={tagsWithLabel}
                      isMulti
                      placeholder="Select or search tags"
                      onChange={(tags) => setTagsSelect(tags)}
                      value={tagsSelect}
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="task-status">Select status</label>

                      <select
                        id="task-status"
                        className="form-select"
                        onChange={(e) => setTaskStatus(e.target.value)}
                        value={taskStatus}
                      >
                        <option value="">Select</option>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Blocked">Blocked</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="estimate-time">Estimate Time</label>
                      <input
                        type="text"
                        id="estimate-time"
                        placeholder="Enter Time in Days"
                        className="form-control"
                        onChange={(e) => setDaysToComplete(e.target.value)}
                        value={daysToComplete}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                form="taskForm"
                data-bs-dismiss="modal"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTaskModalForm;
