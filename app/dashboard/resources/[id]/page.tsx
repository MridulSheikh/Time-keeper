import React from "react";

const FolderDetails = () => {
  return (
    <div>
      <div className="px-5 py-2 bg-cs-black text-white flex justify-between items-center">
        <h1 className="text-2xl font-bold">Resources / Name</h1>
        <div className="flex items-center justify-center gap-x-4 text-cs-black">
        <button className="bg-white p-1 rounded-sm hover:opacity-70">
          Upload Image
        </button>
        <button className="bg-white p-1 rounded-sm hover:opacity-70">
          Refresh
        </button>
        </div>
      </div>
    </div>
  );
};

export default FolderDetails;
