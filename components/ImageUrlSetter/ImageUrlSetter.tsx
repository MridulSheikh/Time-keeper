"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "../Modal";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { AiFillFolder } from "react-icons/ai";
import Image from "next/image";

const ImageCard = ({ id }: { id: string }) => {
  const [image, setImage] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://localhost:5000/api/v1/image/${id}`)
      .then((res) => {
        setImage(res?.data?.data);
      })
      .catch((error) => {
        console.log(error.response.data.errormessage);
      })
      .finally(() => setLoading(false));
  },[]);
  return (
    <>
      {loading ? (
        <div className=" flex justify-center items-center w-full h-24">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="20"
            visible={true}
          />
        </div>
      ) : (
        <div className="text-center shadow-md border rounded-md overflow-hidden cursor-pointer">
          <div className=" w-full h-24 relative mx-auto">
            <Image
              alt="images"
              src={image?.imageUrl}
              fill
              className="object-contain"
            />
          </div>
          <h1 className="p-2">{image?.name}</h1>
        </div>
      )}
    </>
  );
};

export const ImageUrlSetter = ({setIsOpen} : {setIsOpen : any}) => {
  const [folders, setFolders] = useState([]);
  const [images, setImages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/v1/folder")
      .then((res) => {
        setFolders(res?.data?.data);
        setImages(res?.data?.data[0]?.resources);
      })
      .catch((error) => {
        console.log(error.response?.data.errormessage);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <div className="fixed z-50 top-0 w-screen h-screen flex justify-center items-center bg-black/50 left-0">
        <div className=" bg-white rounded-md overflow-hidden">
          <div className="flex justify-between py-3 px-5 bg-cs-black text-white">
            <h1>Select Image</h1>
            <div className="flex gap-x-4 items-center">
              <button className="px-4 py-2 rounded-md bg-green-700 text-white focus:bg-green-700/60">
                select
              </button>
              <button onClick={() => setIsOpen(false)} className=" bg-red-800 focus:bg-red-800/60 text-lg text-white w-6 h-6 rounded-full flex justify-center items-center cursor-pointer">
                X
              </button>
            </div>
          </div>
          <div className="w-[800px] h-[500px] overflow-hidden flex">
            <div className=" w-80 shadow-md bg-cs-nural h-700 overflow-y-scroll">
              {loading ? (
                <div className="w-full h-full flex justify-center items-center">
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
                  {folders?.length < 0 ? (
                    <div className="w-full h-96 flex justify-center items-center">
                      <h1 className="text-gray-500">Folder Not Found!</h1>
                    </div>
                  ) : (
                    <div>
                      {folders?.map((fl: any) => (
                        <div
                          key={fl?._id}
                          onClick={() => setImages(fl?.resources)}
                          className=" flex justify-start gap-x-2 items-center px-3 py-2 hover:bg-orange-200 cursor-pointer"
                        >
                          <h1 className=" font-xl">
                            <AiFillFolder />
                          </h1>
                          <h1>{fl?.name}</h1>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="w-full h-700 overflow-y-scroll ">
              {images?.length > 0 ? (
                <div className="grid grid-cols-3 gap-4 p-5">
                  {images?.map((im: any) => (
                    <ImageCard key={im} id={im} />
                  ))}
                </div>
              ) : (
                <div className="w-full h-96 flex justify-center items-center">
                  <h1 className="text-gray-500">Image Not Found!</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
