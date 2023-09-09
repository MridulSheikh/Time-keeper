import React from "react";
import { IoMdClipboard } from "react-icons/io";
import { BiPackage } from "react-icons/bi";
import { MdOutlineLocalShipping } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";

const fakeStatus = [
  {
    status: "pending",
    icon: <IoMdClipboard />,
  },
  {
    status: "packed",
    icon: <BiPackage />,
  },
  {
    status: "shipped",
    icon: <MdOutlineLocalShipping />,
  },
  {
    status: "delivered",
    icon: <AiOutlineHome />,
  },
];

export const TrackOrder = ({ status }: { status: string }) => {
  return (
    <div className="mt-10 flex flex-col items-center">
      <h1 className="text-xl font-bold text-cs-black mb-3">Track Order</h1>
      <div className="mt-5 flex flex-col flex-wrap md:flex-row justify-start items-center gap-y-2 md:gap-y-0 md:gap-x-2">
        {/* pending ui */}
        <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row items-center">
          <div>
            <div
              className={`text-6xl text-white ${
                status === "pending" ||
                status === "packed" ||
                status === "shipped" ||
                status === "delivered"
                  ? "bg-cs-pink-800"
                  : "bg-gray-500"
              } w-32 h-32 rounded-full flex justify-center items-center`}
            >
              <IoMdClipboard />
            </div>
            <p
              className={`text-center text-xl  ${
                status === "pending" ||
                status === "packed" ||
                status === "shipped" ||
                status === "delivered"
                  ? "text-cs-pink-800"
                  : "text-gray-500"
              }`}
            >
              Pending
            </p>
          </div>
          <div
            className={` h-10 md:h-3  ${
              status === "pending" ||
              status === "packed" ||
              status === "shipped" ||
              status === "delivered"
                ? "bg-cs-pink-800"
                : "bg-gray-500"
            } rounded-md w-3 md:w-20 xl:w-44 md:ml-2`}
          />
        </div>
        {/* packed ui */}
        <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row items-center">
          <div>
            <div
              className={`text-6xl text-white ${
                status === "packed" ||
                status === "shipped" ||
                status === "delivered"
                  ? "bg-cs-pink-800"
                  : "bg-gray-500"
              } w-32 h-32 rounded-full flex justify-center items-center`}
            >
              <BiPackage />
            </div>
            <p
              className={`text-center text-xl  ${
                status === "packed" ||
                status === "shipped" ||
                status === "delivered"
                  ? "text-cs-pink-800"
                  : "text-gray-500"
              }`}
            >
              Packed
            </p>
          </div>
          <div
            className={` h-10 md:h-3  ${
              status === "packed" ||
              status === "shipped" ||
              status === "delivered"
                ? "bg-cs-pink-800"
                : "bg-gray-500"
            } rounded-md w-3 md:w-20 xl:w-44 md:ml-2`}
          />
        </div>
        {/* shipped ui */}
        <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row items-center">
          <div>
            <div
              className={`text-6xl text-white ${
                status === "shipped" || status === "delivered"
                  ? "bg-cs-pink-800"
                  : "bg-gray-500"
              } w-32 h-32 rounded-full flex justify-center items-center`}
            >
              <MdOutlineLocalShipping />
            </div>
            <p
              className={`text-center text-xl  ${
                status === "shipped" || status === "delivered"
                  ? "text-cs-pink-800"
                  : "text-gray-500"
              }`}
            >
              Shipped
            </p>
          </div>
          <div
            className={` h-10 md:h-3  ${
              status === "shipped" || status === "delivered"
                ? "bg-cs-pink-800"
                : "bg-gray-500"
            } rounded-md w-3 md:w-20 xl:w-44 md:ml-2`}
          />
        </div>
        {/* delivered ui */}
        <div className="flex flex-col gap-y-2 md:gap-y-0 md:flex-row items-center">
          <div>
            <div
              className={`text-6xl text-white ${
                status === "delivered" ? "bg-cs-pink-800" : "bg-gray-500"
              } w-32 h-32 rounded-full flex justify-center items-center`}
            >
              <AiOutlineHome />
            </div>
            <p
              className={`text-center text-xl  ${
                status === "delivered" ? "text-cs-pink-800" : "text-gray-500"
              }`}
            >
              Delivered
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
