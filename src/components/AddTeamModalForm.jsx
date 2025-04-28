import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTeamAsync } from "../features/taskSlice";

const AddTeamModalForm = ({ openTeamModalRef }) => {
  const dispatch = useDispatch();
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addNewTeamAsync({ name: teamName, description }));

    if (openTeamModalRef.current) {
      openTeamModalRef.current.focus();
    }
  };
  return (
    <div
      className="modal fade"
      id="teamModal"
      tabIndex="-1"
      aria-labelledby="teamModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="teamModalLabel">
              Create New Team
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form id="team-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="team-name">Team Name</label>
                <input
                  id="team-name"
                  type="text"
                  placeholder="Enter Team Name"
                  className="form-control"
                  required
                  onChange={(e) => setTeamName(e.target.value)}
                  value={teamName}
                />
              </div>

              <div className="mt-3">
                <label htmlFor="team-description">Team Description</label>

                <textarea
                  id="team-description"
                  placeholder="Enter Team Description"
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
              form="team-form"
              data-bs-dismiss="modal"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeamModalForm;
