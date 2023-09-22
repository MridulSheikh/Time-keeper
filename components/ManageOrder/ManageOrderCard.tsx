import React from "react";
import formatDate from "@/lib/DateFormate";
import Link from "next/link";
interface propsTypes {
  date: string;
  item: number;
  paid: boolean;
  price: number;
  confirmed: boolean;
  _id: string;
  status : string;
}

export const ManageOrderCard = ({
  date,
  item,
  paid,
  price,
  confirmed,
  _id,
  status
}: propsTypes) => {
  return (
    <Link href={`/dashboard/order/${_id}`}>
      <div className="px-2 py-2 hover:bg-cs-nural ease-in duration-300 rounded-md border bg-white mt-5 mx-5 grid grid-cols-6 cursor-pointer">
        <h1>{formatDate(date)}</h1>
        <h1>{item}</h1>
        <h1>${price}</h1>
        <h1>{paid ? "Yes" : "No"}</h1>
        <h1>{confirmed ? "Yes" : "No"}</h1>
        <h1>{status}</h1>
      </div>
    </Link>
  );
};
