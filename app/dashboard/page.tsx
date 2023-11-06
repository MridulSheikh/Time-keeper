"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";

const Page = () => {
 
  return (
    <div className="h-screen flex justify-center items-center">
       <div className="relative w-full h-56">
          <Image alt="page under construction image" fill className="object-contain object-center" src={'/images/page-under-construction.png'} />
       </div>
    </div>
  );
};

export default Page;
