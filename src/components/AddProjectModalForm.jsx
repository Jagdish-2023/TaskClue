import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewProjectAsync } from "../features/taskSlice";

const AddProjectModalForm = ({ openProjectModalRef }) => {
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.tasks);

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(addNewProjectAsync({ name: projectName, description }));

    setProjectName("");
    setDescription("");

    if (openProjectModalRef.current) {
      openProjectModalRef.current.focus();
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="projectModal"
        tabIndex="-1"
        aria-labelledby="projectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="projectModalLabel">
                Create New Project
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="project-form" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="project-name">Project Name</label>
                  <input
                    id="project-name"
                    type="text"
                    placeholder="Enter Project Name"
                    className="form-control"
                    required
                    onChange={(e) => setProjectName(e.target.value)}
                    value={projectName}
                  />
                </div>

                <div className="mt-3">
                  <label htmlFor="project-description">
                    Project Description
                  </label>

                  <textarea
                    id="project-description"
                    placeholder="Enter Project Description"
                    className="form-control"
                    style={{ height: "100px" }}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  ></textarea>
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
                form="project-form"
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

export default AddProjectModalForm;
