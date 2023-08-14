import Image from "next/image";
import React from "react";
import { DeleteBrand } from "./DeleteBrand";
import { UpadteBrand } from "./UpdateBrand";
import Link from "next/link";

interface propsType {
  logo: string;
  name: string;
  _id: string;
  product: any;
  number: string;
}

export const BrandCard = ({ logo, name, _id, product, number }: propsType) => {
  return (
    <div className="grid grid-cols-5 p-2 bg-white rounded-md shadow-md border mb-5">
      <div className=" h-10 relative overflow-hidden z-20">
        <Image
          src={logo}
          alt="brand logo image"
          fill
          className="object-contain"
        />
      </div>
      <div className=" flex items-center">
        <h1>{name}</h1>
      </div>
      <div className=" flex items-center">
        <h1>{product?.length}</h1>
      </div>
      <div className=" flex items-center">
        <h1>{number}</h1>
      </div>

      <div className="flex justify-center items-center gap-x-3">
        <DeleteBrand id={_id} name={name} />
        <UpadteBrand id={_id} name={name} logo={logo} number={number} />
        <Link href={`/dashboard/brands/${_id}`}>
        <button className="w-full py-1 px-4 text-sm rounded-md bg-green-800 text-white active:opacity-50">
          more
        </button>
        </Link>
      </div>
    </div>
  );
};
