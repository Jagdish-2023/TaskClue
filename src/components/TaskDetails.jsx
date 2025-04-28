import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  fetchTaskDetailsAsync,
  updateTaskStatusAsync,
} from "../features/taskSlice";

const TaskDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { taskDetails, storageToken, status, error } = useSelector(
    (state) => state.tasks
  );

  const [remainingDays, setRemainingDays] = useState(null);

  const getRemainingTime = () => {
    const todayDate = new Date();
    const closingDate = new Date(taskDetails.createdAt);
    closingDate.setDate(closingDate.getDate() + taskDetails.timeToComplete);

    const daysDiff = closingDate - todayDate;
    const remainingDays = Math.ceil(daysDiff / (1000 * 60 * 60 * 24));

    setRemainingDays(remainingDays);
  };

  const handleStausChangeInput = (e) => {
    if (e.target.checked) {
      dispatch(
        updateTaskStatusAsync({ taskId: taskDetails._id, status: "Completed" })
      );
    }
  };

  useEffect(() => {
    if (!storageToken) {
      return navigate("/");
    }

    if (!taskDetails._id || taskDetails._id !== taskId) {
      dispatch(fetchTaskDetailsAsync(taskId));
    }

    if (taskDetails._id) {
      getRemainingTime();
    }
  }, [taskId, storageToken, taskDetails]);
  return (
    <>
      <div className="p-3">
        {error && <p>{error}</p>}
        {status === "loading" && <p>Loading...</p>}
        {taskDetails?._id && (
          <>
            <h3>{taskDetails.name}</h3>
            {/* <hr /> */}
            <div className="mt-5">
              <p>
                <strong>Project Name: </strong>
                {taskDetails?.project?.name}
              </p>
              <p>
                <strong>Team: </strong>
                {taskDetails.team.name}
              </p>
              <p>
                <strong>Owners: </strong>
                {taskDetails.owners.map((owner) => owner.name).join(", ")}
              </p>
              <p>
                <strong>Tags: </strong>
                {taskDetails.tags.join(", ")}
              </p>
              <p>
                <strong>Time to Complete: </strong>
                {taskDetails.timeToComplete} days
              </p>
              {taskDetails.status !== "Completed" && (
                <p>
                  <strong>Remaining Time: </strong>
                  {remainingDays < 0
                    ? `Overdue (${-remainingDays} days)`
                    : `${remainingDays} days`}
                </p>
              )}
              <p>
                <strong>Status: </strong>
                {taskDetails.status}
              </p>

              <div>
                {taskDetails.status !== "Completed" && (
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="statusSwitch"
                      role="switch"
                      onChange={handleStausChangeInput}
                    />
                    <label className="form-check-label" htmlFor="statusSwitch">
                      Mark as Complete
                    </label>
                  </div>
                )}
                {taskDetails.status === "Completed" && (
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="statusCheckedDisabled"
                      role="switch"
                      checked
                      disabled
                    />
                    <label
                      className="form-check-label"
                      htmlFor="statusCheckedDisabled"
                    >
                      Mark as Complete
                    </label>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TaskDetails;
