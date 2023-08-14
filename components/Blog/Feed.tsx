import { newBlogdata } from "@/mockdata/NewBlog_MOCK_DATA";
import React from "react";
import { BlogFeedCard } from "../BlogCard";
import { Pagination } from "../Pagination";

export const Feed = () => {
  return (
    <div className="col-span-9">
      {newBlogdata.map((dt) => (
        <BlogFeedCard
          key={dt.id}
          title={dt.title}
          slug={dt.slug}
          discription={dt.discription}
          create_at={dt.create_at}
          id={dt.id}
          cover={dt.cover}
        />
      ))}
      {/* <Pagination /> */}
    </div>
  );
};
