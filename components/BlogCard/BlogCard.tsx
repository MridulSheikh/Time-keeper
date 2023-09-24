import { Blog_card_data_types } from "@/typedeclaration/types";
import Image from "next/image";
import React from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";

interface propsType {
  id : string
  title : string;
  cover : string;
  create_at : string;
  slug : string
}

export const BlogCard = ({
  id,
  title,
  cover,
  create_at,
  slug,
}: propsType) => {
  return (
    <div className="relative h-[400px]">
      <Image src={cover} alt="cover image" fill className="object-cover" />
      <div className="absolute top-0 w-full h-full bg-gradient-to-t bg-gradient-from-b from-cs-black/70 to-cs-black/10 px-5 flex flex-col justify-end gap-y-7 pb-5">
        <h3 className="text-white font-oswoald">{create_at}</h3>
        <h1 className="text-white font-oswoald text-4xl">{title}</h1>
        <button className="flex font-oswoald items-center gap-x-5 hover:gap-x-1 group transition-all">
          <div className="border bg-white border-white w-10" />
          <p className=" group-hover:w-0 font-roboto  overflow-hidden ease-in duration-300 text-white">
            READ MORE
          </p>
          <MdOutlineArrowForwardIos className="text-white" />
        </button>
      </div>
    </div>
  );
};
