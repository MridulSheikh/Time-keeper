"use client";
import Image from "next/image";
import {
  MdOutlineArrowForwardIos,
  MdOutlineArrowBackIosNew,
} from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { use, useEffect, useState } from "react";
import carousel_mock_data from "@/mockdata/CAROUSEL_MOCK_DATA";
import Link from "next/link";

type sliderTypes = {
  no: number;
  title: string;
  productImg: string;
  banner: string;
  description: string;
};
type dataTypes = {
  title: string;
  productImg: string;
  banner: string;
  description: string;
};
// this banner should be carousel latter
const Slider = ({ title, productImg, banner, description }: dataTypes) => {
  return (
    <div className=" lg:grid grid-cols-2 h-[570px] lg:h-[600px] lg:relative font-oswald overflow-hidden">
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        alt="watch"
        src={productImg}
        width={350}
        height={300}
        className="xl:right-[37%] 2xl:right-[39%] top-[10%] absolute z-30 hidden xl:inline-block"
      />
      <motion.div
        initial={{ opacity: 0, width: "0%" }}
        animate={{ opacity: 1, width: "100%" }}
        exit={{ opacity: 0, width: "0%" }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden lg:relative"
      >
        <Image
          src={banner}
          alt="banner image"
          fill
          className="object-cover object-center"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: "0%" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-center lg:items-center px-4 lg:px-0 pt-10 lg:pt-0 relative z-30"
      >
        <div className="lg:ml-10 xl:ml-32 xl:w-3/5">
          <h1 className="text-5xl md:text-7xl text-white lg:text-cs-black md:leading-[80px] font-oswoald">
            {title}
          </h1>
          <p
            className={`mt-5 text-md font-roboto text-white lg:text-cs-black/70 w-3/4`}
          >
            {description}
          </p>
          <Link href='/shop'>
            <button className="border py-2 px-5 border-white lg:border-black font-oswoald mt-5 hover:bg-white lg:hover:bg-black lg:hover:text-white text-white lg:text-black hover:text-black ease-in duration-200">
              SHOP NOW
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

const NextButton = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className="pr-4 flex font-oswoald items-center gap-x-5 hover:gap-x-1 group transition-all"
    >
      <div className="border bg-white lg:bg-black border-white lg:border-cs-black w-4 lg:w-16" />
      <p className=" group-hover:w-0 text-white lg:text-black  overflow-hidden ease-in duration-300">
        NEXT
      </p>
      <MdOutlineArrowForwardIos className="text-white lg:text-black" />
    </button>
  );
};
const PreviousButton = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className="font-oswoald pl-4 flex flex-row-reverse items-center gap-x-5 hover:gap-x-1 group transition-all"
    >
      <div className="border bg-white border-white w-4 lg:w-16" />
      <p className=" text-white group-hover:w-0  overflow-hidden ease-in-out duration-700">
        PREVIOUS
      </p>
      <MdOutlineArrowBackIosNew className="text-white" />
    </button>
  );
};

export const HomeBanner = () => {
  const [carouselData, setCarouselData] =
    useState<sliderTypes[]>(carousel_mock_data);
  const [count, setCount] = useState(0);
  const handleNext = () => {
    if (count < carouselData.length - 1) {
      setCount((pre) => pre + 1);
      return;
    }
    setCount(0);
  };
  const handlePrev = () => {
    if (count < 1) {
      setCount(carousel_mock_data.length - 1);
      return;
    }
    setCount((pre) => pre - 1);
  };
  return (
    <div className="relative bg-cs-pink-200">
      {carouselData.map(
        (currentData) =>
          currentData.no === count && (
            <motion.div
              key={currentData.no}
              className="max-w-screen-2xl mx-auto relative"
            >
              <Slider
                title={currentData?.title}
                productImg={currentData?.productImg}
                banner={currentData?.banner}
                description={currentData?.description}
              />
              <div className=" flex w-full justify-between items-center z-30 absolute bottom-10 ">
                <PreviousButton onClick={handlePrev} />
                <NextButton onClick={handleNext} />
              </div>
            </motion.div>
          )
      )}
    </div>
  );
};
