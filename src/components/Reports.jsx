import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import {
  lastWeekDoneReportsAsync,
  totalRemainingDaysOfTasksAsync,
  totalTasksClosedByTeamAsync,
} from "../features/taskSlice";

import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Legend,
  Title,
  Tooltip,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  scales,
} from "chart.js";
import Spinner from "./Spinner";

ChartJS.register(
  Legend,
  Tooltip,
  Title,
  scales,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
);

const Reports = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { storageToken, tasks, reports, teams, status, error } = useSelector(
    (state) => state.tasks
  );

  const lastWeekCompletedTasksData = {
    labels: ["Completed Tasks"],
    datasets: [
      {
        label: "Tasks Completed Last Week",
        data: [reports?.lastWeekDone?.length || 0, null],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        barThickness: 100,
      },
    ],
  };

  const lastWeekCompletedTasksOptions = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: reports?.lastWeekDone?.length + 5,
        ticks: { stepSize: 1 },
      },
    },
  };

  const totalTasksCompletedByTeamData = {
    labels: reports.closedTasksByTeam.map((team) => team.name),
    datasets: [
      {
        data: reports.closedTasksByTeam.map((team) => team.completedTasks),
        backgroundColor: [
          "rgba(114, 96, 209, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(96, 210, 204, 0.5)",
        ],
        hoverBackgroundColor: [
          "rgba(114, 96, 209, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(96, 210, 204, 1)",
        ],
      },
    ],
  };

  const totalTasksCompletedByTeamOptions = {
    responsive: true,
  };

  const totalPendingTasksData = {
    labels: reports.pendingTasks.map((task) => task.project),
    datasets: [
      {
        data: reports.pendingTasks.map((task) => task.remainingDaysToClose),
        backgroundColor: ["rgba(114, 96, 209, 0.5)", "rgba(255, 99, 132, 0.5)"],
        hoverBackgroundColor: [
          "rgba(114, 96, 209, 1)",
          "rgba(255, 99, 132, 1)",
        ],
      },
    ],
  };

  useEffect(() => {
    if (!storageToken) {
      navigate("/");
    }

    dispatch(lastWeekDoneReportsAsync());
    dispatch(totalTasksClosedByTeamAsync());
    dispatch(totalRemainingDaysOfTasksAsync());
  }, [storageToken, tasks]);
  return (
    <div className="p-3">
      <h2>Reports</h2>
      {/* <hr /> */}
      {error && <p>{error}</p>}
      {status === "loading" && <Spinner />}
      {status !== "loading" && storageToken && (
        <div className="mt-4">
          {reports.lastWeekDone.length > 0 && (
            <div id="lastWeekDone-barChart">
              <hr />
              <h6>Total work done last week: </h6>

              <div style={{ width: "50%", margin: "auto" }}>
                <Bar
                  data={lastWeekCompletedTasksData}
                  options={lastWeekCompletedTasksOptions}
                />
              </div>
            </div>
          )}

          {reports.closedTasksByTeam && (
            <div>
              <hr />
              <h6>Total Task completed by Team:</h6>

              <div style={{ width: "400px", height: "auto", margin: "auto" }}>
                <Pie
                  data={totalTasksCompletedByTeamData}
                  options={totalTasksCompletedByTeamOptions}
                />
              </div>
            </div>
          )}

          {reports.pendingTasks && (
            <div>
              <hr />
              <h6>Total pending Tasks:</h6>

              <div style={{ width: "400px", height: "auto", margin: "auto" }}>
                <Pie
                  data={totalPendingTasksData}
                  options={{ responsive: true }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reports;
