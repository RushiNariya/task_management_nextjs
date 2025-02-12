import { createSlice } from "@reduxjs/toolkit";

import { messages } from "@/utils/constant";
import { fetchTasksListThunkAction } from "./thunk";

interface initialTaskStateType {
  isTasksListLoading: boolean;
  tasksList: any[];
  totalPages: number;
  tasksListError: string | null;
}

const initialTaskState: initialTaskStateType = {
  isTasksListLoading: true,
  tasksList: [],
  totalPages: 0,
  tasksListError: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState: initialTaskState,
  reducers: {
    onDeleteTask: (state, action) => {
      state.tasksList = state.tasksList.filter((task) => task.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksListThunkAction.pending, (state) => {
        state.isTasksListLoading = true;
      })
      .addCase(fetchTasksListThunkAction.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isTasksListLoading = false;
        state.tasksList = action.payload?.todos || [];
        state.totalPages = Math.ceil(action.payload?.total / 10);
      })
      .addCase(fetchTasksListThunkAction.rejected, (state, action) => {
        state.isTasksListLoading = false;
        state.tasksList = [];
        state.totalPages = 0;
        state.tasksListError = (action.payload as string) || messages.ERROR_MESSAGE;
      });
  },
});

export const { onDeleteTask } = taskSlice.actions;
export default taskSlice.reducer;
