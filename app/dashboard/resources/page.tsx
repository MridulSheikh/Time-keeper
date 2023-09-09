"use client";
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { AiFillFolder } from "react-icons/ai";
import { RotatingLines } from "react-loader-spinner";
import DateFormate from "../../../lib/DateFormate";
import { useRouter } from "next/navigation";
import { AddFolder, DeleteFolder, FolderDetails, RenameFolder } from "@/components";
import useAuth from "@/hooks/useAuth";
import { GrRefresh } from "react-icons/gr";

interface foldertype {
  _id: string;
  name: string;
  create_by: string;
  modified_date: string;
  resources : any;
}

const FolderCard = ({ _id, name, create_by, modified_date, resources }: foldertype) => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-5 p-2 mt-5 bg-white border rounded-sm cursor-pointer hover:bg-slate-100 ease-in-out duration-200">
      <div
        onClick={() => router.push(`/dashboard/resources/${_id}`)}
        className=" flex items-center gap-x-3 text-lg col-span-2"
      >
        <h1 className=" font-xl">
          <AiFillFolder />
        </h1>
        <h1>{name}</h1>
      </div>
      <div onClick={() => router.push(`/dashboard/resources/${_id}`)}>{DateFormate(modified_date)}</div>
      <div onClick={() => router.push(`/dashboard/resources/${_id}`)}>{resources?.length}</div>
      <div className="flex gap-x-4">
        <DeleteFolder id={_id} name={name} resources={resources} />
        <FolderDetails _id={_id} name={name} create_by={create_by} modified_date={modified_date} />
        <RenameFolder id={_id} name={name} />
      </div>
    </div>
  );
};

const Folder = () => {
  const [folder, setFolder] = useState<any>();
  const [loading, setLoading] = useState(false);
  const {token} = useAuth();
  useEffect(() => {
    getFolderHandler();
  }, []);
  const getFolderHandler = () => {
    setLoading(true);
    axios
      .get("https://free-time-server.onrender.com/api/v1/folder",{
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer" + " " + token,
        },
      })
      .then((res) => {
        setFolder(res?.data?.data);
      })
      .catch((error) => {
        console.log(error.response.data.errormessage);
      })
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <div className="px-5 sticky top-0 pt-5 w-full bg-white border-b">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Resources</h1>
          <div className="flex space-x-3 items-center">
            <AddFolder />
            <button
              onClick={getFolderHandler}
              className="bg-blue-800 text-white py-2 px-4 rounded-md active:opacity-80 flex justify-center items-center gap-x-2"
            >
              <GrRefresh className="text-white text-xl" />
              <p>Refresh</p>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-5 p-2 text-cs-black mt-5 rounded-md">
          <h2 className=" col-span-2">Name</h2>
          <h2>Date Modified</h2>
          <h2>Files</h2>
          <h2>Action</h2>
        </div>
      </div>
      <div className="mx-5">
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
            {folder?.length > 0 ? (
              <div>
                {folder?.map((fl: any) => (
                  <FolderCard
                    key={fl?._id}
                    _id={fl?._id}
                    name={fl?.name}
                    create_by={fl?.create_by}
                    modified_date={fl.updatedAt}
                    resources={fl?.resources}
                  />
                ))}
              </div>
            ) : (
              <div className=" h-96 w-full flex justify-center items-center">
                  <h1 className=" text-cs-black/75">Folder Not Found!</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Folder;
