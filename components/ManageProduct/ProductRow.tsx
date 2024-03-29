"use client";
import useSelectItem from "@/hooks/useSelectItem";
import { Brand_data_types, Category_data_types } from "@/typedeclaration/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

interface productRowPropsType {
  _id: string;
  img: string;
  name: string;
  brand: Brand_data_types;
  category: Category_data_types;
  price: number;
  handleSingleItemSelect: any;
  findItemFromArray: any;
  selectItem: any;
}

export const PorductRow = ({
  _id,
  name,
  img,
  category,
  brand,
  price,
  handleSingleItemSelect,
  findItemFromArray,
  selectItem,
}: productRowPropsType) => {
  const [find, setFind] = useState<boolean>(false);
  useEffect(() => {
    setFind(findItemFromArray(_id));
  }, [selectItem]);
  return (
    <div className="grid grid-cols-7 px-5 py-2 my-3 relative bg-white border mx-4">
      <div className="col-span-3 flex justify-start gap-x-2">
        <button
          onClick={() =>
            handleSingleItemSelect({
              _id: _id,
              category: category,
              brand: brand,
            })
          }
          className="text-xl"
        >
          {find ? <IoIosCheckbox /> : <MdCheckBoxOutlineBlank />}
        </button>
        <div className="w-10 h-10 relative overflow-hidden z-10">
          <Image
            src={img}
            alt={"product image"}
            fill
            className="object-contain"
          />
        </div>
        <Link href={`/shop/${_id}`}>
        <h1 className=" hover:underline">{name}</h1>
        </Link>
      </div>
      <Link href={`/dashboard/brands/${category?._id}`}>
        <h1 className=" hover:underline">
          {category?.name ? category.name : "Category not found"}
        </h1>
      </Link>
      <Link href={`/dashboard/brands/${brand?._id}`}>
        <h1 className=" hover:underline">
          {brand?.name ? brand.name : "Brand not found"}
        </h1>
      </Link>
      <h1>${price}</h1>
      <div className=" flex justify-end">
        <Link href={`/dashboard/product/${_id}`}>
          <button className="py-1 bg-cs-black active:opacity-80 text-white rounded-md px-5">
            update
          </button>
        </Link>
      </div>
    </div>
  );
};
