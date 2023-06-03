"use client";
import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const week = ["M", "T", "W", "T", "F", "S", "S"];
const date = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];

export function DatePicker() {
  const [from, setFrom] = useState<any>(null);
  const [to, setTo] = useState<any>(null);
  const handlesetdate = (date: number) => {
    if ((from != date) && (from != null) && (date > from)) {
      if (to === date) {
        setTo(null);
      } else {
        setTo(date);
      }
    }
    else {
      if (from === date) {
        setFrom(null);
      } else {
        if(to > date && to != null){
            setFrom(date);
        }else{
            setTo(date);
        }
      }
    }
  };
  return (
    <div className="bg-cs-pink-200 p-5 mt-10">
      <h1 className="text-center text-2xl font-semibold">CALENDER</h1>
      <div className=" flex items-center justify-between mt-10">
        <button>
          <AiOutlineLeft />
        </button>
        <span>May 2023</span>
        <button>
          <AiOutlineRight />
        </button>
      </div>
      <div className=" grid grid-cols-7 font-bold w-full mt-7 text-center">
        {week.map((wk) => (
          <p key={wk} className="px-1">{wk}</p>
        ))}
      </div>
      <div className=" grid grid-cols-7 gap-y-7 w-full mt-5">
        {date.map((wk) => (
          <div
            key={wk}
            onClick={() => handlesetdate(wk)}
            className={`text-cs-gray p-1 text-center cursor-pointer ${
              from === wk && "bg-cs-pink-800 rounded-l-md text-white"
            } ${
              from < wk && from != null &&
              (to > wk && "text-cs-pink-800")
            } ${
                to === wk && "bg-cs-pink-800 rounded-r-md text-white"
            }`}
          >
            {wk}
          </div>
        ))}
      </div>
    </div>
  );
}
