"use client";
import Link from "next/link";
import React, { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineUser, AiOutlineMenu, AiOutlineHistory } from "react-icons/ai";
import { FaRegAddressBook } from "react-icons/fa";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import NavbarCart from "./NavbarCart";
import VerifyEmail from "../Shared/VerifyEmail";

type linktype = {
  name: string;
  href: string;
};

const link = [
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Journal&blog",
    href: "/blog",
  },
  {
    name: "Contact us",
    href: "/contact",
  },
];

const NavLink = ({ name, href }: linktype) => {
  return (
    <li className=" cursor-pointer font-semibold hover:text-cs-pink-800 ease-in-out duration-200">
      <Link href={href}>{name}</Link>
    </li>
  );
};

const UserIdentity = ({ text, signout }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const {user} = useAuth()
  return (
    <div className="relative font-semibold ease-in-out duration-700">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center hover:text-cs-pink-800 ease-in-out duration-200"
      >
        <p>{text}</p>{" "}
        {open ? (
          <MdOutlineKeyboardArrowUp className="text-2xl pt-1" />
        ) : (
          <MdOutlineKeyboardArrowDown className="text-2xl pt-1" />
        )}
      </button>
      {open && (
        <div className="absolute top-14 left-0 bg-white p-3 rounded-md w-full z-50 ease-in transition-all duration-200 text-cs-pink-800 shadow-md">
          <p
            onClick={() => setOpen(!open)}
            className=" hover:bg-cs-pink-200 rounded-md ease-in-out duration-200 px-2 flex gap-x-3 items-center text-lg"
          >
            <MdOutlineSpaceDashboard />
            <Link href={"/dashboard"}>Dashboard</Link>
          </p>
          <p
            onClick={() => setOpen(!open)}
            className="hover:bg-cs-pink-200 rounded-md ease-in-out duration-200 px-2 flex gap-x-3 items-center mt-5 text-lg"
          >
            <AiOutlineHistory />
            <Link href={"/order"}>My order</Link>
          </p>
          <p
            onClick={() => setOpen(!open)}
            className="hover:bg-cs-pink-200 rounded-md ease-in-out duration-200 px-2 flex gap-x-3 items-center mt-5 text-lg"
          >
            <BsCart4 />
            <Link href={"/cart"}>My cart</Link>
          </p>
          <button
            onClick={signout}
            className=" w-full text-white py-1 mt-4 px-2 rounded-md bg-cs-pink-800"
          >
            Logout
          </button>
          {
            !user?.verified && <VerifyEmail />
          }
        </div>
      )}
    </div>
  );
};

export const Nav = () => {
  const router = useRouter();
  const { user, sign_out, authLoading } = useAuth();
  return (
    <header className="py-5 top-0 bg-white z-40">
      <div className=" max-w-screen-2xl mx-auto flex justify-between items-center text-cs-black px-4">
        <h1
          onClick={() => router.push("/")}
          className="font-bold text-3xl font-oswoald cursor-pointer"
        >
          Time Kepeer
        </h1>
        <div className="gap-x-10 flex">
          <ul
            className={`gap-x-10 font-light text-md  hidden lg:flex items-center`}
          >
            {link.map((link: linktype) => (
              <NavLink key={link.href} name={link.name} href={link.href} />
            ))}
          </ul>
          <div
            className={`text-md font-light flex items-center gap-x-5 md:gap-x-10`}
          >
            {user?.email ? (
              <UserIdentity text={user.email} signout={sign_out} />
            ) : (
              <div
                onClick={() => router.push("/login")}
                className="flex items-center gap-x-2 cursor-pointer hover:text-cs-pink-800 ease-in-out duration-200"
              >
                <AiOutlineUser className=" text-2xl md:text-lg" />
                <p className="hidden md:inline-block font-semibold">Login</p>
              </div>
            )}
            <NavbarCart />
            <button>
              <AiOutlineMenu className="text-2xl md:text-lg lg:hidden" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
