import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTasksAsync, fetchTeamDetailsAsync } from "../features/taskSlice";
import BackButton from "./BackButton";
import Spinner from "./Spinner";

const TeamDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teamId } = useParams();

  const { storageToken, teams, tasks, teamDetails, error, status } =
    useSelector((state) => state.tasks);

  const getAllMembers = () => {
    const allNames = tasks
      .filter((task) => task.team === teamDetails._id)
      .map((task) => task.owners.map((owner) => owner.name))
      .flat();

    const uniqueNames = [...new Set(allNames)];
    return uniqueNames;
  };

  useEffect(() => {
    if (!storageToken) {
      navigate("/");
    }
    if (tasks.length < 1) {
      dispatch(fetchTasksAsync());
    }

    dispatch(fetchTeamDetailsAsync(teamId));
  }, [storageToken, teams, tasks, teamId]);
  return (
    <div className="p-3">
      {teamDetails?.name && (
        <div className="pb-3">
          <BackButton />
        </div>
      )}
      {error && <p>{error}</p>}
      {!teamDetails?.name && <Spinner />}
      {teamId && storageToken && teamDetails?.name && (
        <div>
          <h3>{teamDetails.name}</h3>
          <p>{teamDetails.description}</p>

          <div className="mt-5">
            <strong className="text-secondary">Members</strong>

            <div className="mt-3">
              {getAllMembers().map((member, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <div
                    className="d-flex justify-content-center align-items-center bg-secondary text-white rounded-circle"
                    style={{ width: "35px", height: "35px" }}
                  >{`${member.charAt(0)}${member
                    .split(" ")[1]
                    .charAt(0)}`}</div>

                  <div className="ms-2">{member}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetails;
