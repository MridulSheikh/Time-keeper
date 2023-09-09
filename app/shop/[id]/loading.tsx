"use client";
import React from "react";
import { RotatingLines } from "react-loader-spinner";

const loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-cs-nural">
      <div className="flex items-center">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="20"
          visible={true}
        />
        <p>loading....</p>
      </div>
    </div>
  );
};

export default loading;
