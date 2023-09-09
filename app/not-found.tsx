"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="text-center  rounded-md p-4">
        <h1 className=" text-7xl font-bold text-red-500 mx-auto">4O4</h1>
        <h1 className=" text-2xl font-bold text-red-500">Page not found!</h1>
      </div>
    </div>
  );
};

export default NotFound;
