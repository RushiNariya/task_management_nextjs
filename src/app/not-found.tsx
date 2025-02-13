"use client";

import { useRouter } from "next/navigation";
import React, { Fragment } from "react";

function NotFound() {
  const router = useRouter();
  return (
    <Fragment>
      <section className="flex h-screen flex-1 items-center justify-center bg-slate-50">
        <div className="container mx-auto flex items-center justify-center gap-12 px-6 py-12">
          <div className="mx-auto text-center">
            <p className="text-eventOrange-500 text-5xl font-medium">404</p>
            <h1 className="text-eventBlack-400 mt-3 text-2xl font-semibold md:text-3xl">
              Page not found
            </h1>
            <p className="mt-4 text-gray-500">
              Sorry, the page you are looking for does not exist.
            </p>
            <div className="mt-10 flex">
              <button
                onClick={() => router.back()}
                className="text-eventBlack-800 inline-flex w-full items-center justify-center whitespace-nowrap rounded-xl border bg-slate-500 px-3 py-2 font-bold leading-6 text-white md:rounded-2xl md:px-5 md:py-3 md:text-base"
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
