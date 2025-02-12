/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import ArrowLeftIcon from "./Icons/ArrowLeftIcon";
import ArrowRightIcon from "./Icons/ArrowRightIcon";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from: number, to: number, step = 1): Array<number | string> => {
  let i = from;
  const range = [];
  while (i <= to) {
    range.push(i);
    i += step;
  }
  return range;
};

interface NewPaginationPropsType {
  pageCount: number;
  pageIndex: number;
  gotoPage: (page: number) => void;
  previousPage: () => void;
  nextPage: () => void;
}
const NewPagination = ({
  pageCount,
  pageIndex,
  gotoPage,
  previousPage,
  nextPage,
}: NewPaginationPropsType) => {
  const fetchPageNumbers = () => {
    const pageNeighbours = 1;
    const totalNumbers = pageNeighbours;
    const totalBlocks = Math.min(totalNumbers, pageCount);
    const currentPage = pageIndex;
    const totalPages = pageCount;
    if (totalPages > totalBlocks) {
      const startPage = Math.max(1, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      // const spillOffset = totalNumbers - (pages.length + 1);
      switch (true) {
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [...pages];
    }
    return range(1, totalPages);
  };
  const pages = fetchPageNumbers();

  return (
    <>
      <Fragment>
        <nav
          className="flex items-center rounded-full"
          aria-label="Pagination"
          key={pageIndex}
        >
          <div
            onClick={() => {
              if (pageIndex === 1) {
                return;
              }
              gotoPage(1);
            }}
            className={` ${
              pageIndex === 1 ? "" : "!text-eventYellow-100"
            } relative mr-2 cursor-pointer inline-flex items-center rounded-full px-1 py-1 md:px-2 md:py-2 text-darkText-100 focus:z-20 focus:outline-offset-0`}
          >
            <ArrowLeftIcon />
          </div>

          {pages.map((page) => {
            if (page === LEFT_PAGE)
              return (
                <div
                  key={page}
                  onClick={() => previousPage()}
                  className="relative cursor-pointer mx-1 inline-flex items-center rounded-full md:px-2 md:py-2 px-1 py-1 !text-black bg-zinc-400 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              );
            if (page === RIGHT_PAGE)
              return (
                <div
                  key={page}
                  onClick={() => nextPage()}
                  className="relative cursor-pointer mx-1 inline-flex items-center rounded-full md:px-2 md:py-2 px-1 py-1 !text-black bg-zinc-400 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              );

            if (typeof page === "number") {
              return (
                <div
                  key={page}
                  className={
                    page === pageIndex
                      ? "relative cursor-pointer mx-1 rounded-full z-10 inline-flex items-center bg-gradient-to-b from-slate-200 to-slate-300 md:px-2 md:py-2 px-1 py-1 text-sm font-semibold text-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      : "relative cursor-pointer mx-1 rounded-full inline-flex items-center md:px-2 md:py-2 px-1 py-1 text-sm font-semibold text-black bg-slate-100 focus:z-20 focus:outline-offset-0"
                  }
                  onClick={() => gotoPage(page)}
                >
                  <span className="flex items-center justify-center w-5 h-5 ">
                    {page}
                  </span>
                </div>
              );
            }
          })}

          <div
            onClick={() => {
              if (pageCount === pageIndex) {
                return;
              }
              gotoPage(pageCount);
            }}
            className={`relative ml-2 cursor-pointer inline-flex items-center rounded-full md:px-2 md:py-2 px-1 py-1 text-darkText-100 focus:z-20 focus:outline-offset-0`}
          >
            <ArrowRightIcon />
          </div>
        </nav>
      </Fragment>
    </>
  );
};
export default NewPagination;
