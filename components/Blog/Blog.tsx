import React from "react"; 
import blog_mock_data from "../../mockdata/BLOG_MOCK_DATAT"
import { BlogCard } from "../BlogCard";
export const Blog = () => {
  return (
    <div className="max-w-screen-2xl mx-auto mt-28 px-4">
      <h1 className="text-center font-oswoald text-5xl font-normal text-cs-black">
        Journal & Blog
      </h1>
      <p className="mt-[34px] text-sm text-cs-gray text-center w-1/2 mx-auto">
        Apart from repair services, we are keeping a blog where we post useful
        tips on how to choose and maintain wrist watches and jewelry, and many
        other topics to educate and entertain our readers.
      </p>
      <div className="mt-16 grid grid-cols-3 gap-x-[1px] bg-slate-400">
            {
                blog_mock_data.slice(0,3).map((data) => <BlogCard key={data.id} title={data.title} cover={data.cover} create_at={data.create_at} slug={data.slug} id={data.id} />)
            }
      </div>
    </div>
  );
};
