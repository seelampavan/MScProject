import React, { useState, useEffect, useRef } from "react";
import VideoCom from "./VideoCom";
import PieChart from "./PieChart";
import { useUser } from "../userContext.js";
const Module = ({ videos, name, image, setProgress, setTotal }) => {
  const [data, setData] = useState([]);
  const [showModule, setShowModule] = useState(false);
  const [indiProgress, setIndiProgress] = useState(0);
  const isInitialMount = useRef(true); // Ref to track the initial mount
  const { user } = useUser();
  const userId = user._id; // Replace with actual user ID

  useEffect(() => {
    const handleData = () => {
      let filteredData;
      if (name === "Personlized for you") {
        filteredData = videos;
      } else {
        filteredData = videos.filter((item) => item.for === name);
      }
      setData(filteredData);

      if (isInitialMount.current) {
        setTotal((prev) => prev + filteredData.length);
        isInitialMount.current = false; // Mark that the initial update has been done
      }
    };
    handleData();
  }, [videos, name, setTotal]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/progress/${userId}/${name}`
        );
        if (res.ok) {
          const progressData = await res.json();
          console.log(progressData);
          if (progressData) {
            setIndiProgress(progressData.progress);
            setProgress((prev) => prev + progressData.progress);
          }
        } else {
          console.error("No progress found");
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, [name, userId, setProgress]);

  const handleClickDone = async () => {
    if (indiProgress < data.length) {
      const newProgress = indiProgress + 1;
      setIndiProgress(newProgress);
      setProgress((prev) => prev + 1);

      // Save progress to API
      try {
        const res = await fetch("http://localhost:3000/progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            moduleName: name,
            progress: newProgress,
            total: data.length,
          }),
        });
        const responseData = await res.json();
        console.log(responseData);
      } catch (error) {
        console.error("Error saving progress:", error);
      }
    }
  };

  const dataForPie = {
    labels: ["Completed", "Incomplete"],
    datasets: [
      {
        label: `${indiProgress} Exercises completed of ${data.length}`,
        data: [indiProgress, data.length - indiProgress],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      className={`min-h-8 ${
        showModule ? "w-full" : "w-64"
      } mt-8 cursor-pointer flex flex-row justify-between flex-wrap transition-all duration-500 ease-in-out will-change-transform`}
    >
      <div
        onClick={() => setShowModule(!showModule)}
        className="p-4 flex flex-col rounded justify-center"
      >
        <div className="flex flex-row justify-between">
          <img
            src={image}
            alt={name}
            className={`rounded ${showModule ? "w-1/3" : "w-full"}`}
          />
          <div className="w-1/2">
            {showModule && <PieChart data={dataForPie} />}
          </div>
        </div>
        <h3 className="text-center text-xl bg-white text-black w-full p-3 rounded">
          {name}
        </h3>
      </div>
      {showModule && (
        <div className="flex flex-col items-center w-full p-4 text-black rounded mt-4 transition-all duration-500 ease-in-out">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center w-full p-4 mb-4 rounded border border-gray-300"
            >
              <VideoCom
                videoSrc={item.videoSrc}
                name={item.name}
                difficulty={item.difficulty}
                des={item.des}
                other={item.other}
              />
              <div>
                <button
                  className="bg-blue-600 text-white p-2 rounded mt-2"
                  onClick={handleClickDone}
                  disabled={indiProgress >= data.length}
                >
                  Done
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Module;
