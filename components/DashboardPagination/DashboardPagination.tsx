import React from "react";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

export const DahsboardPagination = ({
  page,
  setPage,
  pageCount,
}: {
  page: number;
  setPage: any;
  pageCount: number;
}) => {
  const handlePage = () => {
    if (page <= 1) {
      setPage(1);
      return;
    }
    setPage(page - 1);
  };
  const handlenextPage = () => {
    if (page >= pageCount) return;
    setPage(page + 1);
  };
  return (
    <div className="flex flex-col lg:flex-row gap-x-5 justify-center items-center mt-20">
      <div className=" flex gap-x-5">
        <button
          onClick={handlePage}
          className="font-oswoald pl-4 flex flex-row-reverse items-center gap-x-5 hover:gap-x-1 group transition-all"
        >
          <p className=" text-black  overflow-hidden ease-in-out duration-700">
            PREVIOUS
          </p>
          <MdOutlineArrowBackIosNew className="text-black" />
        </button>
        {[...new Array(pageCount)].map((cn, index) => (
          <button
            onClick={() => setPage(index + 1)}
            key={index}
            className={`border-2 border-cs-black hover:bg-cs-black hover:text-white ease-in-out duration-300 px-3 ${
              page === index + 1 && "bg-cs-black text-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        onClick={handlenextPage}
        className="pr-4 flex font-oswoald items-center gap-x-5 hover:gap-x-1 group transition-all"
      >
        <p className=" text-black  overflow-hidden ease-in duration-300">
          NEXT
        </p>
        <MdOutlineArrowForwardIos className="text-black" />
      </button>
    </div>
  );
};
