"use client";
import React, { useState } from "react";
import { Modal } from "../Modal";
import DateFormate from "../../lib/DateFormate"

interface propsType {
  _id: string;
  name: string;
  create_by: string;
  modified_date: string;
}

const FolderDeatailsModal = ({
  _id,
  name,
  create_by,
  modified_date,
  setCondition,
}: any) => {
  return (
    <Modal>
      <div className="bg-white p-5 rounded-md border relative ">
        <div
          onClick={() => setCondition(false)}
          className=" bg-red-800 text-lg text-white w-6 h-6 rounded-full absolute -top-3 -right-3 flex justify-center items-center cursor-pointer"
        >
          X
        </div>
        <div className="grid grid-cols-3 gap-y-5">
            <p className="font-bold">Id</p>
            <p className=" col-span-2">: {_id}</p>
            <p className="font-bold">Name</p>
            <p className=" col-span-2">: {name}</p>
            <p className="font-bold">Create By</p>
            <p className=" col-span-2">: {create_by}</p>
            <p className="font-bold">Modified</p>
            <p className=" col-span-2">: {DateFormate(modified_date)}</p>
        </div>
      </div>
    </Modal>
  );
};

export const FolderDetails = ({
  _id,
  name,
  create_by,
  modified_date,
}: propsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      {
        isOpen && <FolderDeatailsModal _id ={_id} name={name} create_by={create_by} modified_date={modified_date} setCondition={setIsOpen} />
      }
      <button onClick={()=>setIsOpen(true)} className="bg-green-800 text-white p-1 rounded-sm hover:opacity-70">
        Details
      </button>
    </div>
  );
};
