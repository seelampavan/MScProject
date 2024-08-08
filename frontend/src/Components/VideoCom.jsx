import React from "react";

const VideoCom = ({ videoSrc, name, difficulty, des, other }) => {
  return (
    <div className="quicksand width-11/12 bg-black mt-2 flex flex-col text-center items-center lg:flex-row lg:text-left ">
      <video width="320" height="240" loop controls>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="text-white flex flex-col p-4">
        <h2 className="text-2xl ">{name}</h2>
        <h3 className="text-orange-300">Medium</h3>
        <p className="text-sm lg:text-base">{des}</p>
        <p className="text-sm lg:text-base">{other}</p>
      </div>
    </div>
  );
};

export default VideoCom;
