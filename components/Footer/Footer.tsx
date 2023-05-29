import React from "react";
import {GoLocation} from "react-icons/go"
import {AiOutlineMail} from "react-icons/ai"
import {FiPhone} from "react-icons/fi"
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="bg-cs-black text-white">
      <div className="max-w-screen-2xl mx-auto px-4 grid gap-10 lg:grid-cols-2 py-[42px]">
        <div className=" lg:border-r border-r-white/50 flex flex-col justify-center">
          <h1 className=" text-2xl font-oswoald font-normal">
            Sign up for our newsletter to receive <br />
            special offers, news, and great sales notifications.
          </h1>
          <form className=" border-2 border-[#707070] bg-[#343333] lg:w-4/6 flex justify-between mt-[38px]">
            <input className=" bg-transparent px-3 outline-none lg:w-3/4" placeholder="EMAIL ADDRESS" />
            <button className=" px-4 py-3  bg-white text-black font-oswoald font-semibold">SING UP</button>
          </form>
        </div>
        <div className=" lg:pl-10">
          <h1 className=" font-oswoald text-3xl">TIME KEEPER</h1>
          <div className=" grid lg:grid-cols-3 mt-[40px] gap-10">
            <div className=" flex flex-col gap-y-3">
              <div className="flex gap-x-2 items-center"><GoLocation /><h2>Dhaka , Bangladesh</h2></div>
              <div  className="flex gap-x-2 items-center"><AiOutlineMail /><h2>timekepper@gmail.com</h2></div>
              <div  className="flex gap-x-2 items-center"><FiPhone /><h2>+880 1883992405</h2></div>
            </div>
            <div className=" flex flex-col gap-y-3 lg:pl-10">
              <Link href="/">Home</Link>
              <Link href="/about">About us</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div className=" flex flex-col gap-y-3 lg:pl-10">
              <a href="https://www.facebook.com" target="_blank">Facebook</a>
              <a href="https://www.twitter.com" target="_blank">Twitter</a>
              <a href="https://www.instagram.com" target="_blank">Instagram</a>
            </div>
          </div>
        </div>
      </div>
      <h3 className=" text-center font-extralight text-sm pb-5">Time keeper © 2023. All Rights Reserved.</h3>
    </div>
  );
};
