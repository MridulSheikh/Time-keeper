import { ManageBologsList } from "@/components";
import Link from "next/link";
import React from "react";
import { IoIosAdd } from "react-icons/io";

const getData = async () => {
  const res = await fetch("https://free-time-server.onrender.com/api/v1/blog", {
    cache: "no-cache",
  });
  return res.json();
};

const page = async () => {
  const blogs = await getData();
  return (
    <div>
      <nav className="bg-white border-b px-5 py-2">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-cs-black">Blog</h1>
          <Link href={"/dashboard/blog/create"}>
            <button className="flex justify-between p-2 rounded-sm hover:underline items-center gap-x-2 text-md">
              <IoIosAdd className="text-xl mt-1" />
              <p>create blog</p>
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-x-2 mt-5">
          <h1 className=" col-span-2">Title</h1>
          <h1>Published Date</h1>
          <h1>Publisher</h1>
        </div>
      </nav>
      {blogs? (
        <ManageBologsList blogs={blogs.data} />
      ) : (
        <div className=" w-full h-96 flex justify-center items-center">
          <div>
            <h1 className=" text-xl text-gray-500">blogs not found!</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
