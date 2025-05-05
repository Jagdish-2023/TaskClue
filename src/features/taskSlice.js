import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getAuthHeaders = () => {
  const token = localStorage.getItem("userToken");
  return token ? { Authorization: `Bearer ${token}` } : null;
};
const removeLocalStorageToken = () => {
  localStorage.removeItem("userToken");
};

export const fetchTasksAsync = createAsyncThunk("tasks/fetch", async () => {
  try {
    const response = await axios.get("https://taskclue-be.vercel.app/tasks", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      removeLocalStorageToken();
      throw new Error("Unauthorized");
    }

    throw new Error("Failed to fetch Tasks");
  }
});

export const filterTasksAsync = createAsyncThunk(
  "filteredTasks/fetch",
  async (queryParams) => {
    try {
      const response = await axios.get("https://taskclue-be.vercel.app/tasks", {
        headers: getAuthHeaders(),
        params: queryParams,
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        removeLocalStorageToken();
        throw new Error("Unauthorized");
      }
      console.error(error);
      throw new Error("Failed to fetch Tasks");
    }
  }
);

export const fetchTaskDetailsAsync = createAsyncThunk(
  "task/fetch",
  async (taskId) => {
    try {
      const response = await axios.get(
        `https://taskclue-be.vercel.app/task/${taskId}`,
        {
          headers: getAuthHeaders(),
        }
      );

      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        removeLocalStorageToken();
        throw new Error("Unauthorized");
      }
      console.error(error);
      throw new Error("Failed to fetch Task");
    }
  }
);

export const updateTaskStatusAsync = createAsyncThunk(
  "task/status",
  async (taskInfo) => {
    try {
      const response = await axios.post(
        "https://taskclue-be.vercel.app/task",
        taskInfo,
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        removeLocalStorageToken();
        throw new Error("Unauthorized");
      }
      console.error(error);
      throw new Error("Failed to update Task Status");
    }
  }
);

export const fetchProjectsAsync = createAsyncThunk(
  "projects/fetch",
  async () => {
    try {
      const response = await axios.get(
        "https://taskclue-be.vercel.app/projects",
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        removeLocalStorageToken();
        throw new Error("Unauthorized");
      }
      throw new Error("Failed to fetch Projects");
    }
  }
);

export const fetchTeamsAsync = createAsyncThunk("teams/fetch", async () => {
  try {
    const response = await axios.get("https://taskclue-be.vercel.app/teams", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      removeLocalStorageToken();
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to fetch Teams");
  }
});

export const fetchOwnersAsync = createAsyncThunk("users/fetch", async () => {
  try {
    const response = await axios.get("https://taskclue-be.vercel.app/users", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      removeLocalStorageToken();
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to fetch Users");
  }
});

export const fetchTagsAsync = createAsyncThunk("tags/fetch", async () => {
  try {
    const response = await axios.get("https://taskclue-be.vercel.app/tags", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      removeLocalStorageToken();
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to fetch Tags");
  }
});

export const newUserSignupAsync = createAsyncThunk(
  "user/signup",
  async (newUser) => {
    try {
      const response = await axios.post(
        "https://taskclue-be.vercel.app/auth/signup",
        newUser
      );

      return response.data;
    } catch (error) {
      console.error(error);
      if (error.response?.status === 409) {
        throw new Error("This Email is already Registered.");
      }

      throw new Error("Failed creating your account.");
    }
  }
);

export const signInuserAsync = createAsyncThunk(
  "user/login",
  async (loginCredentials) => {
    try {
      const response = await axios.post(
        "https://taskclue-be.vercel.app/auth/login",
        loginCredentials
      );

      return response.data;
    } catch (error) {
      if (error.status === 400)
        throw new Error("Email and Password are required");
      if (error.status === 401) {
        throw new Error("Invalid Email or Password");
      }

      throw new Error("Failed to Log In your account");
    }
  }
);

export const addNewProjectAsync = createAsyncThunk(
  "project/post",
  async (projectData) => {
    try {
      const response = await axios.post(
        "https://taskclue-be.vercel.app/projects",
        projectData,
        { headers: getAuthHeaders() }
      );

      return response.data;
    } catch (error) {
      if (error.status === 400) {
        throw new Error(" Error: Project name is required");
      }
      if (error.status === 401) {
        removeLocalStorageToken();
      }

      throw new Error("Failed to create Project");
    }
  }
);

export const addNewTaskAsync = createAsyncThunk(
  "task/post",
  async (taskData) => {
    try {
      const response = await axios.post(
        "https://taskclue-be.vercel.app/tasks",
        taskData,
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      if (error.status === 401) {
        removeLocalStorageToken();
      }

      if (error.status === 400) {
        throw new Error("Every fields are required");
      }

      throw new Error("Failed to create Task");
    }
  }
);

export const addNewTeamAsync = createAsyncThunk(
  "team/post",
  async (teamData) => {
    try {
      const response = await axios.post(
        "https://taskclue-be.vercel.app/teams",
        teamData,
        {
          headers: getAuthHeaders(),
        }
      );

      return response.data;
    } catch (error) {
      if (error.status === 401) {
        removeLocalStorageToken();
      }

      if (error.status === 400) {
        throw new Error("Every fields are required");
      }

      throw new Error("Failed to create Team");
    }
  }
);

export const fetchTeamDetailsAsync = createAsyncThunk(
  "team/fetch",
  async (teamId) => {
    try {
      const response = await axios.get(
        `https://taskclue-be.vercel.app/team/${teamId}`,
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      if (error.status === 401) {
        removeLocalStorageToken();
      }

      throw new Error("Failed to fetch Team Details");
    }
  }
);

export const lastWeekDoneReportsAsync = createAsyncThunk(
  "lastWeekDone/reports",
  async () => {
    try {
      const response = await axios.get(
        "https://taskclue-be.vercel.app/report/last-week",
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      if (error.status === 401) {
        removeLocalStorageToken();
      }

      throw new Error("Failed to fetch Reports");
    }
  }
);

export const totalTasksClosedByTeamAsync = createAsyncThunk(
  "totalTasksClosed/reports",
  async () => {
    try {
      const response = await axios.get(
        "https://taskclue-be.vercel.app/report/closed-tasks",
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      if (error.status === 401) {
        removeLocalStorageToken();
      }

      throw new Error("Failed to get Reports");
    }
  }
);

export const totalRemainingDaysOfTasksAsync = createAsyncThunk(
  "tasks-pending/reports",
  async () => {
    try {
      const response = await axios.get(
        "https://taskclue-be.vercel.app/report/pending",
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      if (error.status === 401) {
        removeLocalStorageToken();
      }

      throw new Error("Failed to get Reports");
    }
  }
);

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    storageToken: localStorage.getItem("userToken") || null,
    isRegistered: false,
    projects: [],
    tasks: [],
    filteredTasks: {},
    taskDetails: {},
    teamDetails: {},
    owners: [],
    tags: [],
    teams: [],
    reports: { lastWeekDone: [], closedTasksByTeam: [], pendingTasks: [] },
    status: "idle",
    error: null,
  },
  reducers: {
    logOutUser: (state) => {
      localStorage.removeItem("userToken");
      state.storageToken = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(newUserSignupAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.isRegistered = true;
      state.error = null;
    });
    builder.addCase(newUserSignupAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(signInuserAsync.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(signInuserAsync.fulfilled, (state, action) => {
      const { token } = action.payload;
      state.status = "success";
      state.error = null;

      if (token) {
        localStorage.setItem("userToken", token);
        state.storageToken = token;
      }
    });
    builder.addCase(signInuserAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //task
    builder.addCase(fetchTasksAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTasksAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasksAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;

      if (action.error.message === "unauthorized") {
        state.storageToken = null;
      }
    });
    builder.addCase(filterTasksAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(filterTasksAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.filteredTasks = action.payload;
    });
    builder.addCase(filterTasksAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;

      if (action.error.message === "unauthorized") {
        state.storageToken = null;
      }
    });

    builder.addCase(addNewTaskAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNewTaskAsync.fulfilled, (state, action) => {
      state.status = "success";
      const savedTask = action.payload;
      state.tasks.push(savedTask);
    });
    builder.addCase(addNewTaskAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;

      if (action.error.message === "unauthorized") {
        state.storageToken = null;
      }
    });
    builder.addCase(fetchTaskDetailsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTaskDetailsAsync.fulfilled, (state, action) => {
      state.status = "success";

      state.taskDetails = action.payload;
    });
    builder.addCase(fetchTaskDetailsAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;

      if (action.error.message === "unauthorized") {
        state.storageToken = null;
      }
    });
    builder.addCase(updateTaskStatusAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateTaskStatusAsync.fulfilled, (state, action) => {
      const updatedTask = action.payload;
      state.status = "success";
      state.taskDetails = updatedTask;

      if (state.tasks.length > 0) {
        const taskIndex = state.tasks.findIndex(
          (task) => task._id === updatedTask._id
        );

        if (taskIndex >= 0) {
          state.tasks[taskIndex] = updatedTask;
        }
      }
    });
    builder.addCase(updateTaskStatusAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;

      if (action.error.message === "unauthorized") {
        state.storageToken = null;
      }
    });

    //projects
    builder.addCase(fetchProjectsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProjectsAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.projects = action.payload;
    });
    builder.addCase(fetchProjectsAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;

      if (action.error.message === "unauthorized") {
        state.storageToken = null;
      }
    });

    builder.addCase(addNewProjectAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNewProjectAsync.fulfilled, (state, action) => {
      state.status = "success";
      const savedProject = action.payload;
      state.projects.push(savedProject);
    });
    builder.addCase(addNewProjectAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;

      if (action.error.message === "unauthorized") {
        state.storageToken = null;
      }
    });

    //teams
    builder.addCase(fetchTeamsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTeamsAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.teams = action.payload;
    });
    builder.addCase(fetchTeamsAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;

      if (action.error.message === "unauthorized") {
        state.storageToken = null;
      }
    });

    //user
    builder.addCase(fetchOwnersAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchOwnersAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.owners = action.payload;
    });
    builder.addCase(fetchOwnersAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;

      if (action.error.message === "unauthorized") {
        state.storageToken = null;
      }
    });

    //tags
    builder.addCase(fetchTagsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTagsAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.tags = action.payload;
    });
    builder.addCase(fetchTagsAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;

      if (action.error.message === "unauthorized") {
        state.storageToken = null;
      }
    });

    //teams
    builder.addCase(addNewTeamAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addNewTeamAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.teams.push(action.payload);
    });
    builder.addCase(addNewTeamAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;

      if (action.error.message === "unauthorized") {
        state.storageToken = null;
      }
    });
    builder.addCase(fetchTeamDetailsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTeamDetailsAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.teamDetails = action.payload;
    });
    builder.addCase(fetchTeamDetailsAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;

      if (action.error.message === "unauthorized") {
        state.storageToken = null;
      }
    });

    //report
    builder.addCase(lastWeekDoneReportsAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(lastWeekDoneReportsAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.reports.lastWeekDone = action.payload;
    });
    builder.addCase(lastWeekDoneReportsAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;

      if (action.error.message === "unauthorized") {
        state.storageToken = null;
      }
    });
    builder.addCase(totalTasksClosedByTeamAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(totalTasksClosedByTeamAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.reports.closedTasksByTeam = action.payload;
    });
    builder.addCase(totalTasksClosedByTeamAsync.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;

      if (action.error.message === "unauthorized") {
        state.storageToken = null;
      }
    });

    builder.addCase(totalRemainingDaysOfTasksAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      totalRemainingDaysOfTasksAsync.fulfilled,
      (state, action) => {
        state.status = "success";
        state.reports.pendingTasks = action.payload;
      }
    );
    builder.addCase(
      totalRemainingDaysOfTasksAsync.rejected,
      (state, action) => {
        state.status = "error";
        state.error = action.error.message;

        if (action.error.message === "unauthorized") {
          state.storageToken = null;
        }
      }
    );
  },
});

export const { logOutUser } = taskSlice.actions;
export default taskSlice.reducer;
