"use client";
import { EmblaOptionsType } from "embla-carousel-react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const OurBrandsCard = ({ id, logo }: { id: string; logo: string }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/shop?brands=${id}`)}
      className="relative h-60 cursor-pointer w-60 p-3 rounded-md bg-cs-pink-200"
    >
      <Image
        alt="logo"
        fill
        src={logo}
        className="object-contain object-center"
      />
    </div>
  );
};

interface brandTypes {
  _id: string;
  logo: string;
  number: string;
  products: string[];
  cratedAt: string;
  updatedAt: string;
  _v: number;
}

const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      className=" text-cs-black text-2xl flex justify-center items-center w-10 h-10 rounded-full"
      onClick={onClick}
    >
      <AiOutlineArrowRight />
    </button>
  );
};

const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      className=" text-cs-black text-2xl flex justify-center items-center w-10 h-10 rounded-full"
      onClick={onClick}
    >
      <AiOutlineArrowLeft />
    </button>
  );
};

const options: EmblaOptionsType = {
    loop: false,  
};

const OurBrands = ({ brands }: { brands: brandTypes[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()) // Access API
    }
  }, [emblaApi])
  return (
    <div className="max-w-screen-2xl mx-auto mt-28 px-4">
      <div className="flex justify-between">
        <h1 className="text-center font-oswoald text-5xl font-normal text-cs-black">
          Our Brands
        </h1>
        <div className=" flex gap-x-10 items-center">
          <CustomNextArrow onClick={scrollNext} />
          <CustomPrevArrow onClick={scrollPrev} />
        </div>
      </div>
      <div className="relative overflow-x-hidden embla__viewport" ref={emblaRef}>
        <div className="flex w-[2000px] gap-x-3 py-10">
          {brands.map((brand: brandTypes) => (
            <OurBrandsCard key={brand._id} id={brand._id} logo={brand.logo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurBrands;
