import Image from "next/image";
import React from "react";
import formatDate from "@/lib/DateFormate";
import Link from "next/link";

export interface blog_card_type {
  _id: string;
  title: string;
  cover: string;
  publish_date: string;
  publisher: string;
}

export const ManageBlogCard = ({
  _id,
  title,
  cover,
  publish_date,
  publisher,
}: blog_card_type) => {
  return (
    <Link href={`/dashboard/blog/edit?title=${title}`}>
      <div className="grid grid-cols-4 gap-x-2 mt-5 bg-white border p-2 rounded-md mx-5 cursor-pointer hover:bg-cs-nural">
        <div className=" col-span-2 flex gap-x-3 justify-start items-center">
          <div className=" w-10 h-10 relative overflow-hidden">
            <Image
              src={cover}
              fill
              alt="cover photo"
              className="object-cover"
            />
          </div>
          <h1>{title.substring(0,50)}</h1>
        </div>
        <div className=" flex items-center">
          <h1>{formatDate(publish_date)}</h1>
        </div>
        <div className="flex items-center">
          <h1>{publisher}</h1>
        </div>
      </div>
    </Link>
  );
};
