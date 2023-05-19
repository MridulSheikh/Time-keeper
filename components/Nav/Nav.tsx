import Link from "next/link";
import React from "react";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

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
    href: "/journal&blog",
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

export const Nav = () => {
  return (
    <header className="py-5 top-0 bg-white z-40">
      <div className=" max-w-screen-2xl mx-auto flex justify-between items-center text-cs-black px-4">
        <h1 className="font-bold text-3xl font-oswoald">Time Kepeer</h1>
        <div className="flex gap-x-10">
          <ul
            className={`flex gap-x-10 font-light text-md`}
          >
            {link.map((link: linktype) => (
              <NavLink key={link.href} name={link.name} href={link.href} />
            ))}
          </ul>
          <div
            className={`text-md font-light flex gap-x-10`}
          >
            <div className="flex items-center gap-x-2 cursor-pointer">
              <AiOutlineUser className=" w-4 font-bold" />
              <p>login</p>
            </div>
            <div className="flex items-center gap-x-2 cursor-pointer">
              <BsHandbag className=" w-4 font-bold" />
              <p>cart (0)</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
