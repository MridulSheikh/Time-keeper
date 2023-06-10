import Ratting from "@/lib/Ratting";
import React from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export const ProductBanner = () => {
  return (
    <div className=" grid grid-cols-2 gap-x-10 my-10">
      <div className="bg-cs-pink-200"></div>
      <div>
        <div className="flex justify-between">
          <div className="font-oswoald text-3xl flex gap-x-7">
            <del className="text-cs-gray">$450.00</del>
            <h2 className="text-cs-black">$430.00</h2>
          </div>
          <Ratting rating={{ rate: 4.5 }} className="text-cs-pink-800" />
        </div>
        <p className=" text-md mt-5 text-cs-gray">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiati.
        </p>
        <div className="flex gap-x-6 mt-5">
            <div className=" flex border-4 border-r-0 border-cs-pink-800">
                <p className="px-3 py-1 text-xl text-cs-gray">1</p>
                <div className="flex flex-col">
                    <button className="bg-cs-pink-800 text-white text-xl border-b border-white"><MdKeyboardArrowUp /></button>
                    <button className="bg-cs-pink-800 text-white text-xl border-t border-white"><MdKeyboardArrowDown /></button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
