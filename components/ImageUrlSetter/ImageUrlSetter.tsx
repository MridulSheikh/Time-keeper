"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { AiFillFolder, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";
import { MdDone } from "react-icons/md";
import useAuth from "@/hooks/useAuth";
import { AddFolder, AddImage } from "../Folder";
import { FiRefreshCcw } from "react-icons/fi";

const ImageCard = ({
  id,
  selectImage,
  setSelectImage,
}: {
  id: string;
  setSelectImage: any;
  selectImage: any;
}) => {
  const [image, setImage] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const { token } = useAuth();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/v1/image/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer" + " " + token,
        },
      })
      .then((res) => {
        setImage(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);
  const handleSelectImage = (id: string, imageUrl: string) => {
    if (selectImage?.id === id) {
      setSelectImage();
      return;
    }
    setSelectImage({ id, imageUrl });
  };
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
        <div
          onClick={() => handleSelectImage(id, image.imageUrl)}
          className={`text-center hover:shadow-md ease-in duration-100  rounded-md overflow-hidden cursor-pointer relative ${
            selectImage?.id === id &&
            " outline outline-2 outline-green-700 bg-white"
          }`}
        >
          {selectImage?.id === id && (
            <div className=" text-white flex justify-center items-center bg-green-700 absolute top-2 left-2 w-4 h-4 z-20 rounded-sm">
              <h1 className="text-md">
                <MdDone />
              </h1>
            </div>
          )}

          <div className=" w-full h-24 relative mx-auto">
            <Image
              alt="images"
              src={image?.imageUrl}
              fill
              className="object-contain"
            />
          </div>
          <h1 className="p-2 text-sm">{image?.name?.substring(0, 40)}</h1>
        </div>
      )}
    </>
  );
};

export const ImageUrlSetter = ({
  setIsOpen,
  setImage,
}: {
  setIsOpen: any;
  setImage: any;
}) => {
  const [folders, setFolders] = useState([]);
  const [folder, setFolder] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [selectImage, setSelectImage] = useState<any>();
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const { token } = useAuth();
  const fetchFolderData = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/v1/folder", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer" + " " + token,
        },
      })
      .then((res) => {
        setFolders(res?.data?.data);
        if(!folder){
          setFolder(res?.data?.data[0]);
        }else{
           res?.data?.data.map((fl : any) =>{
            if(fl._id === folder._id ){
              setFolder(fl);
              return;
            }
          })
        }
      })
      .catch((error) => {
        console.log(error.response?.data.errormessage);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchFolderData();
  }, []);

  const imageSetHandler = () => {
    setImage(selectImage?.imageUrl);
    setIsOpen(false);
  };
  return (
    <div>
      <div className="fixed z-50 top-0 w-screen h-screen flex justify-center items-center bg-black/50 left-0">
        <div className=" bg-white rounded-md overflow-hidden">
          <div className="flex justify-between items-center py-3 px-5 bg-white text-cs-black border-b">
            <div className="flex items-center gap-x-4">
              <button
                onClick={() => setIsSideBarOpen((prev) => !prev)}
                className="text-lg my-auto"
              >
                <AiOutlineMenu />
              </button>
              <h1 className=" text-xl font-bold text-cs-black">Select Image</h1>
            </div>
            <div className="flex gap-x-4 items-center">
              <button
                onClick={fetchFolderData}
                className="p-1 rounded-sm hover:opacity-70 flex gap-x-2 items-center"
              >
                <FiRefreshCcw className=" text-xl" />
                <p>Refresh</p>
              </button>
              <AddFolder />
              <AddImage id={folder?._id} />
              {selectImage && (
                <button
                  onClick={imageSetHandler}
                  className="px-4 py-2 text-sm rounded-md bg-green-700 text-white focus:bg-green-700/60"
                >
                  Set image
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-lg text-cs-black w-6 h-6 rounded-full flex justify-center items-center cursor-pointer"
              >
               <AiOutlineClose />
              </button>
            </div>
          </div>
          <div className="w-[800px] h-[500px] overflow-hidden bg-cs-nural  flex">
            {isSideBarOpen && (
              <div className=" w-80 h-700 overflow-x-hidden overflow-y-scroll">
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
                            onClick={() => setFolder(fl)}
                            className={`flex justify-start gap-x-2 items-center px-3 py-2  cursor-pointer ${
                              fl._id === folder._id
                                ? "bg-orange-200"
                                : "hover:bg-gray-200"
                            }`}
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
            )}
            <div className="w-full h-700 overflow-y-scroll">
              {folder?.resources.length > 0 ? (
                <div
                  className={`grid ${
                    isSideBarOpen ? "grid-cols-3" : "grid-cols-4"
                  } gap-4 p-5`}
                >
                  {folder?.resources.map((im: any) => (
                    <ImageCard
                      key={im}
                      id={im}
                      selectImage={selectImage}
                      setSelectImage={setSelectImage}
                    />
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
