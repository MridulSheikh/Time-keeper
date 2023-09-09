import Link from "next/link";
import React from "react";

const NotFound = () => {
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
