"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export const Select = ({
  name,
  value,
  state,
  setState,
  className,
}: {
  name: string;
  value: any[];
  state: any;
  setState: any;
  className: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div onClick={() => setIsOpen(!isOpen)} className={className + " relative"}>
      <div className=" border rounded-md px-4 py-2 cursor-pointer">
        <div className=" flex justify-between items-center">
          {state ? <p>{state?.name}</p> : <p>{name}</p>}
          <p>
            <IoIosArrowDown />
          </p>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-9 z-30 bg-cs-nural rounded-md w-full border">
          {value ? (
            <div>
              {value?.map((vl: any) => (
                <button
                  key={vl?._id}
                  onClick={() => {
                    setState({ name: vl?.name, id: vl?._id });
                    setIsOpen(false)
                  }}
                  className="py-3 px-5 hover:bg-zinc-200 block w-full text-start"
                >
                  {vl?.name}
                </button>
              ))}
            </div>
          ) : (
            <div className="w-full h-20 flex justify-center items-center text-gray-500 ">
              <p>items not found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
