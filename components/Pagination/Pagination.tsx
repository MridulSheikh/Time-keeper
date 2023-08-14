"use client";
import { useRouter } from "next/navigation";
import React from "react";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

export const Pagination = ({
  page,
  pageCount,
}: {
  page: number;
  pageCount: number;
}) => {
  const router = useRouter();

  // handle next prev button pagination
  const handlePagination = (type: string) => {
    let queryParams: any;
    let path: string;
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
    }
    switch (type) {
      case "prev":
        if (queryParams.has("page")) {
          queryParams.set("page", page >= 1 ? 1 : page - 1);
        } else {
          queryParams.append("page", page >= 1 ? 1 : page - 1);
        }
        path = window.location.pathname + `?` + queryParams.toString();
        router.push(path);
        break;
      case "next":
        if (queryParams.has("page")) {
          queryParams.set("page", page >= pageCount ? pageCount : page + 1);
        } else {
          queryParams.append("page", page >= pageCount ? pageCount : page + 1);
        }
        path = window.location.pathname + `?` + queryParams.toString();
        router.push(path);
        break;
    }
  };

  // handle single button pagination
  const handleSingleButton = (index: number) => {
    let queryParams: any;
    let path: string;
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
    }
    if (queryParams.has("page")) {
      queryParams.set("page", index + 1);
    } else {
      queryParams.append("page", index + 1);
    }
    path = window.location.pathname + `?` + queryParams.toString();
    router.push(path);
  };
  return (
    <div className="flex flex-col lg:flex-row gap-x-5 justify-center items-center mt-20">
      <div className=" flex gap-x-5">
        <button
          onClick={() => handlePagination("prev")}
          className="font-oswoald pl-4 flex flex-row-reverse items-center gap-x-5 hover:gap-x-1 group transition-all"
        >
          <p className=" text-black  overflow-hidden ease-in-out duration-700">
            PREVIOUS
          </p>
          <MdOutlineArrowBackIosNew className="text-black" />
        </button>
        {[...new Array(pageCount || 0)].map((cn, index) => (
          <button
            key={index}
            onClick={() => handleSingleButton(index)}
            className={`border-2 border-cs-black hover:bg-cs-black hover:text-white ease-in-out duration-300 px-3 ${
              page === index + 1 && "bg-cs-black text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        onClick={() => handlePagination("next")}
        className="pr-4 flex font-oswoald items-center gap-x-5 hover:gap-x-1 group transition-all"
      >
        <p className=" text-black  overflow-hidden ease-in duration-300">
          NEXT
        </p>
        <MdOutlineArrowForwardIos className="text-black" />
      </button>
    </div>
  );
};
