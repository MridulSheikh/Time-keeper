"use client";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import DateFormate from "../../../../lib/DateFormate";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";
import { AddImage } from "@/components";

interface propTypes {
  name: string;
  imageUrl: string;
  id: string;
  create_by: string;
  createdAt: string;
}

const ImageCard = ({ name, imageUrl, id, create_by, createdAt }: propTypes) => {
  return (
    <div className=" cursor-pointer shadow-md rounded-md overflow-hidden relative">
      <button className=" absolute top-2 left-2 border-2 border-white/60 bg-transparent z-20 w-4 h-4 " />
      <a target="_blank" href={imageUrl}>
        <div className=" w-full h-36 relative overflow-hidden mx-auto bg-slate-300">
          <Image
            alt={name + " " + "images"}
            src={imageUrl}
            fill
            className="object-cover"
          />
        </div>
      </a>
      <div className="p-3">
        <p className="mt-2 text-center font-semibold">{name}</p>
        <p className="mt-2 text-center font-semibold text-sm">
          Create By {create_by}
        </p>
        <p className="mt-2 text-center font-semibold text-sm">
          Created At {DateFormate(createdAt)}
        </p>
        <div className="flex justify-between gap-x-3 mt-3">
        <button className="bg-blue-800 text-white p-1 rounded-sm hover:opacity-70 w-full">
          Rename
        </button>
        <button className="bg-red-800 text-white p-1 rounded-sm hover:opacity-70 w-full">
          Delete
        </button>
        </div>
      </div>
    </div>
  );
};

const FolderDetails = () => {
  const [folder, setFolder] = useState<null | any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const getFolderData = () => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/api/v1/folder/${params.id}`)
      .then((res) => {
        setFolder(res.data.data);
      })
      .catch((err) => {
        toast.error(err.response.data.errormessage);
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => getFolderData(), []);
  return (
    <div>
      <div className="px-5 py-2 bg-cs-black text-white flex justify-between items-center sticky top-0 z-30">
        <h1 className="text-2xl font-bold">Resources / {folder?.name}</h1>
        <div className="flex items-center justify-center gap-x-4 text-cs-black">
          <AddImage id={params.id} />
          <button
            onClick={getFolderData}
            className="bg-white p-1 rounded-sm hover:opacity-70"
          >
            Refresh
          </button>
        </div>
      </div>
      <div>
        {isLoading ? (
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
          <div className=" grid grid-cols-4 gap-5 m-5">
            {folder?.resources?.map((fl: any) => (
              <ImageCard
                key={fl._id}
                name={fl?.name}
                imageUrl={fl?.imageUrl}
                id={fl.id}
                create_by={fl?.create_by}
                createdAt={fl?.createdAt}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderDetails;
