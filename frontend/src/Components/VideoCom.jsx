import React from "react";

const VideoCom = ({ videoSrc, name, difficulty, des, other }) => {
  let difficultyColor;
  if (difficulty === "Beginner") {
    difficultyColor = "#00FF00";
  } else if (difficulty === "Intermediate") {
    difficultyColor = "#FFA500";
  } else if (difficulty === "Advanced") {
    difficultyColor = "#FF0000";
  }

  return (
    <div className="quicksand width-11/12 bg-black mt-2 flex flex-col text-center items-center lg:flex-row lg:text-left">
      <iframe
        width="320"
        height="240"
        src={videoSrc}
        title={name}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <div className="text-white flex flex-col p-4">
        <h2 className="text-2xl ">{name}</h2>
        <h3 style={{ color: difficultyColor }}>{difficulty}</h3>
        <p className="text-sm lg:text-base">{des}</p>
        <p className="text-sm lg:text-base">{other}</p>
      </div>
    </div>
  );
};

export default VideoCom;
