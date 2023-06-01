import React from "react";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

const count = [1, 2, 3, 4, 5];

export const Pagination = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center mt-20">
      <div className=" flex gap-x-5">
        {count.map((cn) => (
          <button key={cn} className=" border-2 border-black px-3">{cn}</button>
        ))}
      </div>
      <div className=" flex gap-x-10 mt-10 lg:mt-0">
        <button className="font-oswoald pl-4 flex flex-row-reverse items-center gap-x-5 hover:gap-x-1 group transition-all">
          <div className="border bg-black border-black w-7" />
          <p className=" text-black group-hover:w-0  overflow-hidden ease-in-out duration-700">
            PREVIOUS
          </p>
          <MdOutlineArrowBackIosNew className="text-black" />
        </button>
        <button className="pr-4 flex font-oswoald items-center gap-x-5 hover:gap-x-1 group transition-all">
          <div className="border bg-black border-black w-7" />
          <p className=" group-hover:w-0 text-black  overflow-hidden ease-in duration-300">
            NEXT
          </p>
          <MdOutlineArrowForwardIos className="text-black" />
        </button>
      </div>
    </div>
  );
};
