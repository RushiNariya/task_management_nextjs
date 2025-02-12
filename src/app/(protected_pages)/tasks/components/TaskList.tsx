"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  fetchTasksListThunkAction,
  deleteTaskThunkAction,
} from "@/redux/features/tasks/thunk";
import { TasksParamsType } from "@/types/task";
import NewPagination from "@/components/NewPagination";
import Loader from "@/components/Loader";
import confirmationPopup from "@/utils/confirmationPopup";
import { useRouter } from "next/navigation";
import Tasks from "./Tasks";

function TaskList() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  const { isTasksListLoading, tasksList, totalPages, tasksListError } = useAppSelector(
    (state) => state.task,
  );

  useEffect(() => {
    const params: TasksParamsType = {
      page: 1,
      perPage: 10,
    };
    setCurrentPage(1);

    callArtistListThunkHandler({
      ...params,
    });
  }, []);

  function callArtistListThunkHandler(params: TasksParamsType) {
    try {
      dispatch(
        fetchTasksListThunkAction({
          ...params,
        }),
      );
    } catch (error: any) {
      console.log(error);
    }
  }

  function handlePageChange(page: number) {
    const params: TasksParamsType = {
      page: page,
      perPage: 10,
    };

    callArtistListThunkHandler({
      ...params,
    });
    setCurrentPage(page);
  }

  function handlePreviousPage() {
    if (currentPage === 1) {
      return;
    }

    const params: TasksParamsType = {
      page: currentPage - 1,
      perPage: 10,
    };

    callArtistListThunkHandler({
      ...params,
    });

    setCurrentPage(currentPage - 1);
  }

  function handleNextPage() {
    if (currentPage === totalPages) {
      return;
    }

    const params: TasksParamsType = {
      page: currentPage + 1,
      perPage: 10,
    };

    callArtistListThunkHandler({
      ...params,
    });

    setCurrentPage(currentPage + 1);
  }

  async function deleteTaskHandler(id: number) {
    try {
      const result = await confirmationPopup();

      if (result.isConfirmed) {
        await dispatch(deleteTaskThunkAction(id)).unwrap();
        if (tasksList.length === 1 && currentPage !== 1) {
          handlePreviousPage();
        } else {
          const params: TasksParamsType = {
            page: currentPage,
            perPage: 10,
          };
          setCurrentPage(1);

          callArtistListThunkHandler({
            ...params,
          });
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="h-screen">
        <div className="flex justify-between  p-4 my-4 items-center">
          <h1 className="text-2xl font-bold">Task List</h1>
          <button
            onClick={() => router.push("/tasks/new")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Task
          </button>
        </div>
        {isTasksListLoading ? (
          <div className="text-center h-[80%] flex justify-center items-center">
            <Loader />
          </div>
        ) : null}
        {!isTasksListLoading && tasksList ? (
          <div className="w-full min-h-[90vh] p-4">
            <div className="flex flex-col">
              <div className=" overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                  <div className="overflow-hidden ">
                    <Tasks
                      tasksList={tasksList || []}
                      deleteTaskHandler={deleteTaskHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {!isTasksListLoading && tasksListError ? (
          <div className="text-red-400 w-full text-center">{tasksListError}</div>
        ) : null}
        {!isTasksListLoading && !tasksListError && tasksList.length === 0 ? (
          <div className="text-center flex justify-center items-center">no task</div>
        ) : null}

        {tasksList?.length && !isTasksListLoading ? (
          <div className="w-full col-span-12 flex justify-center md:justify-end">
            <NewPagination
              pageIndex={currentPage}
              pageCount={totalPages}
              gotoPage={handlePageChange}
              previousPage={handlePreviousPage}
              nextPage={handleNextPage}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}

export default TaskList;
