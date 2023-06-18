"use client"
import {Body, IdealHasNever, Sidebar, TopBanner } from "@/components";
const page = () => {
  return (
    <div>
      <TopBanner page="Shop" route={"home / shop"} />
      <div className="relative grid lg:grid-cols-12 gap-x-5  max-w-screen-2xl mx-auto my-10 px-4 ">
        <Sidebar />
        <Body />
      </div>
      <IdealHasNever />
    </div>
  );
};

export default page;
