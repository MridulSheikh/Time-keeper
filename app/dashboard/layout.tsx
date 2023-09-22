"use client";
import { AdminProtectRoute } from "@/components";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { AiFillHome } from "react-icons/ai";
import { BsSmartwatch } from "react-icons/bs";
import { FaBloggerB, FaOpencart } from "react-icons/fa";
import {
  MdCategory,
  MdImage,
  MdOutlineAdminPanelSettings,
  MdSpaceDashboard,
} from "react-icons/md";
import { TbBrandAdobe } from "react-icons/tb";

const admin_links = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <MdSpaceDashboard />,
  },
  {
    name: "Category",
    link: "/dashboard/category",
    icon: <MdCategory />,
  },
  {
    name: "Brands",
    link: "/dashboard/brands",
    icon: <TbBrandAdobe />,
  },
  {
    name: "Product",
    link: "/dashboard/product",
    icon: <BsSmartwatch />,
  },
  {
    name: "Admin",
    link: "/dashboard/admin",
    icon: <MdOutlineAdminPanelSettings />,
  },
  {
    name: "Resources",
    link: "/dashboard/resources",
    icon: <MdImage />,
  },
  {
    name : "Order",
    link : "/dashboard/order",
    icon : <FaOpencart />
  },
  {
    name : "Blog",
    link : "/dashboard/blog",
    icon : <FaBloggerB />
  },
  {
    name : "Home",
    link : "/",
    icon : <AiFillHome />
  }
];

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const { user } = useAuth();
  // console.log(pathname)
  return (
    <AdminProtectRoute>
      <div className="flex">
        <div className=" w-full hidden fixed lg:inline-block lg:static z-50 lg:z-0 lg:w-80 bg-cs-black text-white h-screen">
          <div className="flex flex-col gap-y-3 items-center justify-center py-3 border-b">
            <MdOutlineAdminPanelSettings className="text-5xl" />
            <h1>{user?.email}</h1>
          </div>
          <div>
            {admin_links.map((link) => (
              <Link key={link.link} href={`${link.link}`}>
                <div
                  className={`p-3 flex justify-start items-center gap-x-2 ${
                    pathname === `${link.link}` && "bg-slate-800"
                  }`}
                >
                  {link.icon}
                  <p>{link.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full h-screen overflow-y-scroll bg-cs-nural">
          {children}
        </div>
      </div>
    </AdminProtectRoute>
  );
};

export default Layout;
