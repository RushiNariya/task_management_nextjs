import React from "react";
import TaskList from "./components/TaskList";

export const metadata = {
  title: "Tasks",
  description: "checkout the tasks",
};

function page() {
  return <TaskList />;
}

export default page;
