import React from "react";
import { BlogFeedCard } from "../BlogCard";
import { Pagination } from "../Pagination";

interface blogtypes {
     _id : string;
     title : string;
     cover : string;
     body : string;
     author : string;
     updatedAt : string;
     createdAt : string;
}

export const Feed = ({blog} : {blog : blogtypes[]}) => {
  return (
    <div className="col-span-9">
      {blog.map((dt) => (
        <BlogFeedCard
          key={dt._id}
          title={dt.title}
          slug={dt.title}
          create_at={dt.updatedAt}
          id={dt._id}
          cover={dt.cover}
        />
      ))}
      <Pagination page={1} pageCount={10} />
    </div>
  );
};
