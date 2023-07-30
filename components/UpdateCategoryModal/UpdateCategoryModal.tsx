"use client";
import React, { useState } from "react";
import { Modal } from "../Modal";

const UpdateModal = ({ name, id, setIsOpen }: any) => {
  return (
    <Modal>
      <div className="bg-white border rounded-md p-7 w-96 relative">
        <button
          onClick={() => setIsOpen(false)}
          className=" w-8 h-8 bg-red-800 rounded-full absolute -top-4 -right-4 text-white"
        >
          X
        </button>
        <form>
          <div>
            <p className="mt-3">If you change this category name. Your products may change</p>
            <input
              type="text"
              className="px-5 py-2 w-full outline-none border rounded-md mt-4"
              placeholder={name}
              required
            />
          </div>
          <button className="bg-green-800 text-white p-1 rounded-md mt-5 hover:opacity-70">
            Change
          </button>
        </form>
      </div>
    </Modal>
  );
};

export const UpdateCategoryModal = ({name, id} : any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {isOpen && <UpdateModal setIsOpen={setIsOpen} name={name} />}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-800 text-white p-1 rounded-sm hover:opacity-70"
      >
        Change name
      </button>
    </div>
  );
};
