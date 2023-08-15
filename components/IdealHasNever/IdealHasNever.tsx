import React from "react";
import { ProductCard } from "../ProductCard";
import Image from "next/image";

export const IdealHasNever = () => {
  return (
    <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 pl-4 mt-[113px] lg:h-[700px]">
      <div className="flex justify-center items-center">
        <div className="mb-10 lg:mb-0 px-4">
          <h1 className=" text-cs-black font-semibold text-5xl sm:text-7xl font-oswoald">
            Ideal Has Never <br /> Been Closer
          </h1>
          <p className="text-sm font-roboto text-cs-gray lg:w-3/5 my-[31px]">
            Have you ever come across a thing that is impossible to resist? Meet
            the Lawson Jefferson 38! Run by the vibration of a quartz crystal
            (32,786 times per second) under current to keep possibly accurate
            time. You will feel absolutely over the moon with it, we guarantee!
          </p>
          <button className="border px-7 py-3 border-cs-black hover:bg-cs-black hover:text-white ease-in duration-200 font-oswoald ">
            Learn More
          </button>
        </div>
      </div>
      <div className="grid grid-cols-6">
        <div className=" col-span-5">
          <ProductCard
            img="/images/slider3_slide2_02-copyright.png"
            name="FAAST  TRACK ANALOG GOLDEN DEAL MEN WATCH"
            _id={1}
            reviews={4.5}
            price={500}
            isbig={true}
          />
        </div>
        <div className="col-span-1 relative">
          <Image
            fill
            src="/images/05.jpg"
            className=" object-cover"
            alt="image"
          />
        </div>
      </div>
    </div>
  );
};
