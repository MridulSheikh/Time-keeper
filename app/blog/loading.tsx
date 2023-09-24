import { SideBar, TopBanner } from "@/components";
import React from "react";

const loading = () => {
  return (
    <div>
      <TopBanner page="BLOGS" route={"home / blog"} />
      <div className="lg:grid lg:grid-cols-12 gap-x-5  max-w-screen-2xl mx-auto my-10 px-4">
        <div className="col-span-9">
          {[...new Array(9)].map((el: any, index: number) => (
            <div
              key={index}
              className="relative mt-5 w-full space-y-3 overflow-hidden rounded-md p-3 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20  before:animate-[shimmer_1.5s_infinite]"
            >
              <div className="h-96 w-full rounded-lg bg-cs-pink-800"></div>
              <div className="space-y-3 text-center">
                <div className="h-5 w-1/5 rounded-full bg-cs-pink-800"></div>
                <div className="h-5 rounded-full bg-cs-pink-800"></div>
                <div className="h-5 w-6/12 rounded-full bg-cs-pink-800"></div>
                <div className="h-5 w-2/5 rounded-full bg-cs-pink-800"></div>
              </div>
            </div>
          ))}
        </div>
        <SideBar />
      </div>
    </div>
  );
};

export default loading;
