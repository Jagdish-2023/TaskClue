import { configureStore } from "@reduxjs/toolkit";
import { taskSlice } from "../features/taskSlice";

export default configureStore({ reducer: { tasks: taskSlice.reducer } });
