"use client";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { AiFillFolder } from "react-icons/ai";
import { RotatingLines } from "react-loader-spinner";
import DateFormate from "../../../lib/DateFormate"

interface foldertype {
  _id: string;
  name: string;
  create_by: string;
  modified_date: string;
}

const FolderCard = ({ _id, name, create_by, modified_date }: foldertype) => {
  return (
    <div className="grid grid-cols-5 p-2">
      <div className=" flex items-center gap-x-3 text-lg col-span-2">
        <h1 className=" font-xl">
          <AiFillFolder />
        </h1>
        <h1>{name}</h1>
      </div>
      <div>{DateFormate(modified_date)}</div>
      <div>0</div>
      <div></div>
    </div>
  );
};

const Folder = () => {
  const [folder, setFolder] = useState<any>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/v1/folder")
      .then((res) => {
        setFolder(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="px-5">
      <div className=" sticky top-0 pt-5 w-full bg-white">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Resources</h1>
          <div className="flex space-x-3 items-center">
            <button className="bg-cs-black text-white px-3 py-1.5 h-full rounded-md">
              Add folder
            </button>
            <button className="bg-cs-black text-white px-3 py-1.5 h-full rounded-md">
              Refresh
            </button>
          </div>
        </div>
        <div className="bg-cs-black grid grid-cols-5 p-2 text-white mt-5 rounded-md">
          <h2 className=" col-span-2">Name</h2>
          <h2>Date Modified</h2>
          <h2>Size</h2>
          <h2>Action</h2>
        </div>
      </div>
      <div>
        {loading ? (
          <div className=" w-full h-96 flex justify-center items-center">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="20"
              visible={true}
            />
          </div>
        ) : (
          <div>
            {folder ? (
              <div>
                {folder?.map((fl: any) => (
                  <FolderCard
                    key={fl?._id}
                    _id={fl?._id}
                    name={fl?.name}
                    create_by={fl?.create_by}
                    modified_date={fl.updatedAt}
                  />
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Folder;
