import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  const order = false;
  return (
    <div>
      {order ? (
        <div>order</div>
      ) : (
        <div className=" w-full flex justify-center items-center">
          <div className="py-5 text-center">
            <div className="relative w-60 h-60">
              <Image
                alt="image"
                src={"/images/26.jpg"}
                fill
                className="object-contain object-center"
              />
            </div>
            <h1>No Order&apos;s Yet. <Link href={"/shop"} className="underline" >Start Shopping</Link></h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
