"use client";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import {linktype } from "./Nav";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MenuBar = ({ links }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname()
  return (
    <div className="md:text-lg lg:hidden">
      <button onClick={() => setIsOpen(true)}>
        <AiOutlineMenu className="text-2xl" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="bg-white border-l overflow-hidden fixed h-screen right-0 top-0 opacity-95 w-2/4"
          >
            <div className="m-5 relative">
              {isOpen && (
                <div className="flex justify-end">
                  <button onClick={() => setIsOpen(false)}>
                    <AiOutlineClose className="text-2xl" />
                  </button>
                </div>
              )}
              <div className="flex list-none flex-col z-40 gap-y-7 justify-center mt-5">
                {links.map((link: linktype) => (
                  <li
                    key={link.name}
                    onClick={() => setIsOpen(false)}
                    className={`cursor-pointer h-full font-semibold ${pathname === link.href && 'text-cs-pink-800 border-b-2 border-cs-pink-800'} hover:text-gray-500 ease-in-out duration-200`}
                  >
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
                <li
                    onClick={() => setIsOpen(false)}
                    className={`cursor-pointer h-full font-semibold ${pathname === "/login" && 'text-cs-pink-800 border-b-2 border-cs-pink-800'} hover:text-gray-500 ease-in-out duration-200`}
                  >
                    <Link href={"/login"}>Login</Link>
                  </li>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
