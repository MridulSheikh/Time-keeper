"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard/track-order");
  }, []);
  return (
    <div className="w-full h-full flex justify-center items-center">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="20"
        visible={true}
      />
    </div>
  );
};

export default Page;
