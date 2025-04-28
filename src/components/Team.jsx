import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTasksAsync, fetchTeamsAsync } from "../features/taskSlice";
import AddTeamModalForm from "./AddTeamModalForm";

const Team = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { storageToken, teams, tasks, status, error } = useSelector(
    (state) => state.tasks
  );

  const openTeamModalRef = useRef(null);

  const getOwnersName = (team) => {
    const allNames = tasks
      .filter((task) => task.team === team._id)
      .map((task) => task.owners.map((owner) => owner.name))
      .flat();

    const uniqueNames = [...new Set(allNames)];
    const firstCharOfNames = uniqueNames.map((name) => name.split(" ")[0]);

    return firstCharOfNames;
  };

  const handleTeamCard = (teamId) => {
    navigate(`/teams/${teamId}`);
  };

  useEffect(() => {
    if (!storageToken) {
      return navigate("/");
    }

    if (teams.length < 1) {
      dispatch(fetchTeamsAsync());
    }

    if (tasks.length < 1) {
      dispatch(fetchTasksAsync());
    }
  }, [storageToken, teams, tasks]);
  return (
    <div className="p-3">
      {error && <p>{error}</p>}
      {status === "loading" && <p>Loading...</p>}
      <div className="d-flex justify-content-between align-items-center">
        <h2>Teams</h2>
        <div>
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#teamModal"
            ref={openTeamModalRef}
          >
            {" "}
            + New Team
          </button>
        </div>
      </div>
      {teams.length > 0 && (
        <div className="row mt-2">
          {teams.map((team) => (
            <div className="col-md-4 mb-4" key={team._id}>
              <div
                className="card bg-light"
                style={{ cursor: "pointer" }}
                onClick={() => handleTeamCard(team._id)}
              >
                <div className="card-body">
                  <h4 className="card-title">{team.name}</h4>
                  <div className="d-flex gap-1 mt-4">
                    {tasks.length > 0 &&
                      getOwnersName(team).map((owner, index) => (
                        <div
                          className="d-flex justify-content-center align-items-center bg-secondary text-white rounded-circle"
                          style={{ width: "30px", height: "30px" }}
                          key={index}
                        >
                          {owner.charAt(0)}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddTeamModalForm openTeamModalRef={openTeamModalRef} />
    </div>
  );
};

export default Team;
