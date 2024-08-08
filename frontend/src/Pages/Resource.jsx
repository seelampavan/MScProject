import React, { useState } from "react";
import VideoCom from "./../Components/VideoCom";

const Resource = ({ videos }) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredVideos = videos.filter((video) =>
    video.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center h-full w-full min-h-dvh">
      <input
        type="text"
        className="w-11/12 p-2 rounded mt-6 text-black"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="mt-8 p-8">
        {filteredVideos.map((video, index) => (
          <VideoCom
            key={index}
            videoSrc={video.videoSrc}
            name={video.name}
            difficulty={video.difficulty}
            des={video.des}
            other={video.other}
          />
        ))}
      </div>
    </div>
  );
};

export default Resource;
