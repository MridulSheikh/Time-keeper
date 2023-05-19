import React from "react";
import { HiOutlinePhone } from "react-icons/hi";
import { MdOutlineMail } from "react-icons/md";

const TopNav = () => {
  return (
    <div className="bg-cs-black text-white py-2">
      <div className=" max-w-screen-2xl px-4 flex justify-between mx-auto">
      <p className=" text-white/50">Developed by <a target="_blank" href="https://www.linkedin.com/in/mridul-sheikh/" className="underline">Mridul sheikh</a></p>
        <div className="flex gap-x-7 text-white/50">
          <div className="flex gap-x-3 items-center">
            <MdOutlineMail />
            <p>sheikhmridul833@gmail.com</p>
          </div>
          <div className="flex gap-x-3 items-center">
            <HiOutlinePhone />
            <p>+880 1883992408</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
