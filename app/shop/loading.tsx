"use client";
import { IdealHasNever, TopBanner } from "@/components";
import React from "react";

const loading = () => {
  return (
    <div>
      <TopBanner page="Shop" route={"home / shop"} />
      <div className="relative grid lg:grid-cols-12 gap-x-5  max-w-screen-2xl mx-auto my-10 px-4 ">
        <div className="lg:col-span-3">
          <div className="relative space-y-3 overflow-hidden rounded-md bg-cs-pink-200 p-3 shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_1.5s_infinite]">
            <div className="h-5 rounded-full bg-cs-pink-800"></div>
            <div className="h-5 rounded-full bg-cs-pink-800"></div>
            <div className="h-5 rounded-full bg-cs-pink-800"></div>
          </div>
          <div className="relative space-y-3 overflow-hidden rounded-md bg-cs-pink-200 p-3 shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_1.5s_infinite] mt-10 grid grid-cols-2 gap-5">
            <div className=" h-28 bg-cs-pink-800"></div>
            <div className="h-28  bg-cs-pink-800"></div>
            <div className="h-28  bg-cs-pink-800"></div>
            <div className="h-28  bg-cs-pink-800"></div>
          </div>
        </div>
        <div className="col-span-9 ">
          <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...new Array(9)].map((el: any, index: number) => (
              <div
                key={index}
                className="relative w-72 space-y-3 overflow-hidden rounded-md bg-cs-pink-200 p-3 shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_1.5s_infinite]"
              >
                <div className="h-36 w-full rounded-lg bg-cs-pink-800"></div>
                <div className="space-y-3 text-center">
                  <div className="h-5 rounded-full bg-cs-pink-800"></div>
                  <div className="h-5 rounded-full bg-cs-pink-800"></div>
                  <div className="h-5 rounded-full bg-cs-pink-800"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <IdealHasNever />
    </div>
  );
};

export default loading;
