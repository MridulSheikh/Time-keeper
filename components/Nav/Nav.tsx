"use client";
import Link from "next/link";
import React, { useState } from "react";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineUser, AiOutlineMenu } from "react-icons/ai";
import { useRouter } from "next/navigation";
import useFirebase from "@/hooks/useFirebase";
import useAuth from "@/hooks/useAuth";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type linktype = {
  name: string;
  href: string;
};

const link = [
  {
    name: "shop",
    href: "/shop",
  },
  {
    name: "about",
    href: "/about",
  },
  {
    name: "journal&blog",
    href: "/blog",
  },
  {
    name: "contact us",
    href: "/contact",
  },
];

const NavLink = ({ name, href }: linktype) => {
  return (
    <li className=" cursor-pointer">
      <Link href={href}>{name}</Link>
    </li>
  );
};

const UserIdentity = ({text, signout} : any) => {
  const [open, setOpen] = useState<boolean>(false)
  return(
    <div className="relative">
      <button onClick={()=>setOpen(!open)} className="flex items-center gap-x-2"><p>{text.substring(0, 10)}...</p> <MdOutlineKeyboardArrowDown/></button>
      { open &&
        <div className="absolute top-7 left-0 bg-white p-3 rounded-md w-full z-50 ease-in transition-all duration-200">
          <p className=" hover:bg-slate-300 px-2"><Link href={""}>dashboard</Link></p>
          <p className=" hover:bg-slate-300 mt-4 px-2"><Link href={""}>my order</Link></p>
          <button onClick={signout} className=" w-full bg-cs-black text-white py-1 mt-4 px-2">Logout</button>
        </div>
      }
    </div>
  )
}

export const Nav = () => {
  const router = useRouter();
  const { user, sign_out } = useAuth();
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
          <ul className={`gap-x-10 font-light text-md  hidden lg:flex`}>
            {link.map((link: linktype) => (
              <NavLink key={link.href} name={link.name} href={link.href} />
            ))}
          </ul>
          <div className={`text-md font-light flex gap-x-5 md:gap-x-10`}>
            {user?.email ? (
              <UserIdentity text={user.email} signout={sign_out} />
            ) : (
              <div
                onClick={() => router.push("/login")}
                className="flex items-center gap-x-2 cursor-pointer"
              >
                <AiOutlineUser className=" text-2xl md:text-lg" />
                <p className="hidden md:inline-block">login</p>
              </div>
            )}

            <div className="flex items-center gap-x-2 cursor-pointer">
              <BsHandbag className="text-2xl md:text-lg" />
              <p className="hidden md:inline-block">cart</p>
              <p>(0)</p>
            </div>
            <button>
              <AiOutlineMenu className="text-2xl md:text-lg lg:hidden" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
