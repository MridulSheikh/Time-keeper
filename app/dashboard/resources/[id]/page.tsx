"use client";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import DateFormate from "../../../../lib/DateFormate";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { AddImage, DeleteOneImage, RenameImage } from "@/components";
import useAuth from "@/hooks/useAuth";
import { GrRefresh } from "react-icons/gr";

interface propTypes {
  name: string;
  imageUrl: string;
  id: string;
  create_by: string;
  createdAt: string;
  folder : string
}

const ImageCard = ({ name, imageUrl, id, create_by, createdAt, folder }: propTypes) => {
  return (
    <div className=" cursor-pointer rounded-md overflow-hidden relative bg-white border">
      {/* <button className=" absolute top-2 left-2 border-2 border-white/60 bg-transparent z-20 w-4 h-4 " /> */}
      <a target="_blank" href={imageUrl}>
        <div className=" w-full h-36 relative overflow-hidden mx-auto">
          <Image
            alt={name + " " + "images"}
            src={imageUrl}
            fill
            className="object-contain"
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
        <RenameImage id ={id} name={name} />
        <DeleteOneImage imageUrl={imageUrl} folder={folder} id={id} />
        </div>
      </div>
    </div>
  );
};

const FolderDetails = () => {
  const [folder, setFolder] = useState<null | any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {token} = useAuth()
  const params = useParams();
  const getFolderData = () => {
    setIsLoading(true);
    axios
      .get(`https://free-time-server.onrender.com/api/v1/folder/${params.id}`,{
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer" + " " + token,
        },
      })
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
      <ToastContainer />
      <div className="px-5 py-2 text-cs-black bg-white border-b flex justify-between items-center sticky top-0 z-30">
        <h1 className="text-2xl font-bold">Resources / {folder?.name}</h1>
        <div className="flex items-center justify-center gap-x-4 text-cs-black">
          <AddImage id={params.id} />
          <button
              onClick={getFolderData}
              className="p-1 rounded-sm hover:opacity-70 flex gap-x-2 items-center"
            >
              <GrRefresh className="text-xl" />
              <p>Refresh</p>
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
          <div>
            {
              folder?.resources?.length > 0 ? 
              (
                <div className=" grid grid-cols-4 gap-5 m-5">
                {folder?.resources?.map((fl: any) => (
                  <ImageCard
                    key={fl._id}
                    name={fl?.name}
                    imageUrl={fl?.imageUrl}
                    id={fl._id}
                    create_by={fl?.create_by}
                    createdAt={fl?.createdAt}
                    folder ={fl?.folder}
                  />
                ))}
              </div>
              )
              :
              <div className="w-full h-96 flex justify-center items-center">
                  <h1 className=" text-cs-black/50">Your folder is empty!</h1>
              </div>
            }
          </div>
         
        )}
      </div>
    </div>
  );
};

export default FolderDetails;
