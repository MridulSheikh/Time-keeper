"use client"
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import DateFormate from "../../../../lib/DateFormate"
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

interface  propTypes{
name : string,
imageUrl : string,
id : string,
create_by : string,
createdAt : string
}

const ImageCard = ({name, imageUrl, id, create_by, createdAt} : propTypes) => {
  return(
    <div className=" cursor-pointer shadow-md rounded-md p-3">
       <div className=" w-28 h-28 relative overflow-hidden mx-auto">
          <Image alt={name + " " +"images"} src={imageUrl} fill className="object-contain" />
       </div>
       <p className="mt-2 text-center font-semibold">{name}</p>
       <p className="mt-2 text-center font-semibold text-sm">Create By {create_by}</p>
       <p className="mt-2 text-center font-semibold text-sm">Created At {DateFormate(createdAt)}</p>
       <button className="bg-red-800 text-white p-1 mt-3 rounded-sm hover:opacity-70 w-full">
        Delete
      </button>
    </div>
  )
}

const FolderDetails = () => {
  const [folder, setFolder] = useState<null | any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false) 
  const params = useParams();
  const getFolderData = () =>{
    setIsLoading(true);
    axios.get(`http://localhost:5000/api/v1/folder/${params.id}`)
    .then(res => {
      setFolder(res.data.data)
    })
    .catch(err => {
      toast.error(err.response.data.errormessage)
    })
    .finally(() => setIsLoading(false))
  }
  useEffect(() => getFolderData(),[])
  return (
    <div>
      <div className="px-5 py-2 bg-cs-black text-white flex justify-between items-center">
        <h1 className="text-2xl font-bold">Resources / {folder?.name}</h1>
        <div className="flex items-center justify-center gap-x-4 text-cs-black">
        <button className="bg-white p-1 rounded-sm hover:opacity-70">
          Upload Image
        </button>
        <button onClick={getFolderData} className="bg-white p-1 rounded-sm hover:opacity-70">
          Refresh
        </button>
        </div>
      </div>
      <div>
         {
           isLoading ? <div className=" w-full h-96 flex justify-center items-center">
           <RotatingLines
             strokeColor="grey"
             strokeWidth="5"
             animationDuration="0.75"
             width="20"
             visible={true}
           />
         </div>
         :
         <div className=" grid grid-cols-4 gap-5 m-5">
           {
              folder?.resources?.map((fl : any) => <ImageCard key={fl._id} name={fl?.name} imageUrl={fl?.imageUrl} id={fl.id} create_by={fl?.create_by} createdAt={fl?.createdAt} /> )
           }
         </div>
         }
      </div>
    </div>
  );
};

export default FolderDetails;
