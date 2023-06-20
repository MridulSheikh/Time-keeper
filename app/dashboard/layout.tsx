import Link from "next/link";
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

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <h1 className="font-semibold uppercase text-3xl p-3 bg-cs-pink-200">Dashboard</h1>
      <div className="max-w-screen-2xl mx-auto px-4 py-8 grid grid-cols-12 gap-x-20">
        <div className="col-span-3">
          {links.map((link) => (
            <Link key={link.link} href={`/dashboard/${link.link}`} className="border-b">
              <div className="py-3 border-b uppercase text-cs-black">
                {link.name}
              </div>
            </Link>
          ))}
        </div>
        <div className="col-span-9">{children}</div>
      </div>
    </div>
  );
};

export default layout;
