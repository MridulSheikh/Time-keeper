'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

const links = [
  {
    name: "Track order",
    link: "track-order",
  },
  {
    name: "Cart",
    link: "cart",
  },
  {
    name: "Shipping address",
    link: "shipping-address",
  },
];

const admin_links = [
  {
    name: "Category",
    link: "category",
  },
  {
    name: "Brands",
    link: "brands",
  },
  {
    name: "Product",
    link: "product",
  },
  {
    name : "Admin",
    link : "admin"
  }
];

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  // console.log(pathname)
  return (
      <div className="max-w-screen-2xl mx-auto flex border-t">
        <div className="w-80 bg-cs-black text-white h-screen overflow-y-scroll pt-5">
          {links.map((link) => (
            <Link key={link.link} href={`/dashboard/${link.link}`}>
              <div className={`p-3 uppercase hover:bg-slate-800 ${pathname === `/dashboard/${link.link}` && 'bg-slate-800'}`}>
                {link.name}
              </div>
            </Link>
          ))}
           {admin_links.map((link) => (
            <Link key={link.link} href={`/dashboard/${link.link}`}>
              <div className={`p-3 uppercase hover:bg-slate-800 ${pathname === `/dashboard/${link.link}` && 'bg-slate-800'}`}>
                {link.name}
              </div>
            </Link>
          ))}
        </div>
        <div className="w-full h-screen overflow-y-scroll">{children}</div>
      </div>
  );
};

export default Layout;
