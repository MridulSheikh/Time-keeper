import { dubaifont } from "@/fonts/font";
import Image from "next/image";
import {MdOutlineArrowForwardIos, MdOutlineArrowBackIosNew} from "react-icons/md"

type sliderTypes = {
  title: string;
  productImg: string;
  banner: string;
  description: string;
};

const Slider = ({ title, productImg, banner, description }: sliderTypes) => {
  return (
    <div className=" grid grid-cols-2 h-[590px] relative">
      <Image alt="watch" src="/images/slider3_slide1_01-copyright (1).png" width={300} height={300} className=" right-[39%] top-[20%] absolute z-50" />
      <div className="overflow-hidden relative">
        <Image
          src="/images/slider3_slide1_02-copyright.jpg"
          alt="banner image"
          fill
          className="object-cover object-center"
        />
      </div>
      <div className=" bg-cs-pink-200 flex flex-col justify-center items-center">
        <div className=" ml-32 w-3/5">
          <h1 className=" text-7xl text-cs-black leading-[80px]">
            Small <br /> Pleasures From Time keeper
          </h1>
          <p className={`mt-5 text-md text-cs-black/70 ${dubaifont.className} w-3/4`}>
            we transparently build high-quality minimal watches from the finest
            components and materials.
          </p>
          <button className="border py-2 px-5 border-black mt-5 hover:bg-black hover:text-white ease-in duration-200">
            SHOP NOW
          </button>
        </div>
      </div>
    </div>
  );
};

const NextButton = () => {
  return (
    <button className=" absolute bottom-10 right-14 flex items-center gap-x-5 hover:gap-x-1 group transition-all">
      <div className="border bg-black border-cs-black w-16" />
      <p className=" group-hover:w-0  overflow-hidden ease-in duration-300">NEXT</p>
      <MdOutlineArrowForwardIos />
    </button>
  )
}
const PreviousButton = () => {
  return (
    <button className=" absolute bottom-10 left-14 flex flex-row-reverse items-center gap-x-5 hover:gap-x-1 group transition-all">
      <div className="border bg-white border-white w-16" />
      <p className=" text-white group-hover:w-0  overflow-hidden ease-in-out duration-700">PREVIOUS</p>
      <MdOutlineArrowBackIosNew className="text-white" />
    </button>
  )
}

export const HomeBanner = () => {
  return (
    <div className="relative">
      <Slider title="" productImg="" banner="" description="" />
      <NextButton />
      <PreviousButton />
    </div>
  );
};
