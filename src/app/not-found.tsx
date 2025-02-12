"use client";

import { useRouter } from "next/navigation";
import React, { Fragment } from "react";

function NotFound() {
  const router = useRouter();
  return (
    <Fragment>
      <section className="flex-1 flex justify-center items-center h-screen bg-slate-50">
        <div className="container px-6 py-12 mx-auto flex justify-center items-center gap-12">
          <div className="text-center mx-auto">
            <p className="text-5xl font-medium text-eventOrange-500">404</p>
            <h1 className="mt-3 text-2xl font-semibold text-eventBlack-400 md:text-3xl">
              Page not found
            </h1>
            <p className="mt-4 text-gray-500">
              Sorry, the page you are looking for does not exist.
            </p>
            <div className="flex mt-10">
              <button
                onClick={() => router.back()}
                className="inline-flex bg-slate-500 text-white w-full items-center justify-center text-eventBlack-800 md:text-base font-bold leading-6 whitespace-nowrap rounded-xl md:rounded-2xl border px-3 py-2 md:px-5 md:py-3"
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default NotFound;
