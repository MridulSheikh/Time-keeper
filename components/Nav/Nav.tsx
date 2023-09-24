"use client";
import Link from "next/link";
import React, { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineMenu, AiOutlineHistory } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import {
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { MdOutlineSpaceDashboard, MdVerified } from "react-icons/md";
import NavbarCart from "./NavbarCart";
import { MenuBar } from "./MenuBar";

export type linktype = {
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

export const NavLink = ({ name, href }: linktype) => {
  const pathname = usePathname()
  return (
    <li className={`cursor-pointer h-full font-semibold ${pathname === href && 'text-cs-pink-800 border-b-2 border-cs-pink-800'} hover:text-gray-500 ease-in-out duration-200`}>
      <Link href={href}>{name}</Link>
    </li>
  );
};

const UserIdentity = ({ text, signout }: any) => {
  const { user } = useAuth();
  return (
    <div className="relative group font-semibold ease-in-out duration-700 py-5">
      <button className="flex items-center hover:text-cs-pink-800 ease-in-out duration-200">
        <BiUserCircle className="text-3xl" />
      </button>
      <div className="absolute hidden group-hover:inline-block top-14 right-0 w-40 bg-white p-3 rounded-md z-40 ease-in transition-all duration-500 text-cs-pink-800 shadow-md overflow-hidden">
        {user?.role === "admin" && (
          <p className=" hover:bg-cs-pink-200 rounded-md ease-in-out duration-200 px-2 flex gap-x-3 items-center text-lg mb-5">
            <MdOutlineSpaceDashboard />
            <Link href={"/dashboard"}>Dashboard</Link>
          </p>
        )}
        <p className="hover:bg-cs-pink-200 rounded-md ease-in-out duration-200 px-2 flex gap-x-3 items-center text-lg">
          <AiOutlineHistory />
          <Link href={"/order"}>My order</Link>
        </p>
        <p className="hover:bg-cs-pink-200 rounded-md ease-in-out duration-200 px-2 flex gap-x-3 items-center mt-5 text-lg">
          <BsCart4 />
          <Link href={"/cart"}>My cart</Link>
        </p>
        {!user?.verified && (
          <p className="hover:bg-cs-pink-200 rounded-md ease-in-out duration-200 px-2 flex gap-x-3 items-center mt-5 text-lg">
            <MdVerified />
            <Link href={"/verifyemail"}>verificaiton</Link>
          </p>
        )}
        <button
          onClick={signout}
          className=" w-full text-white py-1 mt-4 px-2 rounded-md bg-cs-pink-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export const Nav = () => {
  const router = useRouter();
  const { user, sign_out, authLoading } = useAuth();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prvious = scrollY.getPrevious();
    if (latest > prvious && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: "100%" },
        hidden: { y: "-100%", opacity: "0%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="sticky w-full top-0 bg-white z-40"
    >
      <div className=" max-w-screen-2xl mx-auto flex justify-between items-center text-cs-black px-4">
        <h1
          onClick={() => router.push("/")}
          className="font-bold text-3xl font-oswoald cursor-pointer"
        >
          Time Kepeer
        </h1>
        <div className="gap-x-10 flex items-center">
          <ul
            className={`gap-x-10 font-light text-md  h-full hidden lg:flex items-center`}
          >
            {link.map((link: linktype) => (
              <NavLink key={link.href} name={link.name} href={link.href} />
            ))}
          </ul>
        </div>
        <div className=" flex items-center gap-x-6">
          <NavbarCart />
          <div
            className={`text-md font-light flex items-center gap-x-5 md:gap-x-10`}
          >
            {user?.email ? (
              <UserIdentity text={user.email} signout={sign_out} />
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="hidden lg:flex items-center gap-x-2 cursor-pointer hover:border-cs-pink-800 hover:text-white hover:bg-cs-pink-800 ease-in-out duration-200 px-4 py-2 rounded-md border-2 border-cs-black"
              >
                <p className="hidden md:inline-block font-semibold text-md">
                  Login
                </p>
              </button>
            )}
            <MenuBar links={link} />
          </div>
        </div>
      </div>
    </motion.header>
  );
};
