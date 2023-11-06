import Image from "next/image";
import React from "react";

export const SwissEssence = () => {
  return (
    <div className="max-w-screen-2xl mx-auto grid-cols-2 px-4 h-auto lg:h-[700px] hidden lg:grid mt-10">
      <div className="relative">
        <Image
          alt="owmen"
          src="/images/image-3763-copyright.png"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex pl-20 justify-center items-center">
        <div>
          <h1 className=" text-cs-black font-semibold text-7xl font-oswoald">
            Swiss Essence
          </h1>
          <p className="text-sm font-roboto text-cs-gray w-3/5 my-[31px]">
            Here go three good news. First: some things will never get old.
            Second, we believe a good watch is a great opportunity to complement
            the look. Third: watches have come in fashion again. Doesn’t matter
            retro or modern, watches now are essential elements of a great look.
          </p>
          <button className="border px-7 py-3 border-cs-black hover:bg-cs-black hover:text-white ease-in duration-200 font-oswoald ">
            READ OUR STORY
          </button>
        </div>
      </div>
    </div>
  );
};
