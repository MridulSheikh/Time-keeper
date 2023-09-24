import { BlogTopBanner } from "@/components";
import formatDate from "@/lib/DateFormate";
import React from "react";
import parse from 'html-react-parser';

const page = async ({params} : {params : {slug : string}}) => {
  const res = await fetch(`https://free-time-server.onrender.com/api/v1/blog/getbytitle/${params.slug}`)
  const data = await res.json()
  const {data : blog} = data;
  return (
    <div>
      <BlogTopBanner img={blog?.cover} />
      <div className=" max-w-screen-md mx-auto px-4 my-14">
        <h1 className="text-2xl md:text-4xl lg:text-6xl leading-normal font-oswoald text-cs-black">
          {blog.title}
        </h1>
        <h2 className="mt-4 text-md font-roboto text-cs-gray">
         Published by{" "} <span className="text-cs-pink-800">{blog.author}</span>{" "}on{" "}{formatDate(blog.updatedAt)}
        </h2>
        <div className="mt-7">
          {parse(blog.body)}
        </div>
      </div>
    </div>
  );
};

export default page;
