import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header2 from "./../Components/Header2";
import Hamburger from "./../Components/Hamburger";
import { useUser } from "../userContext";

const Dashboard = () => {
  const [showHamburger, setShowHamburger] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const { user } = useUser();
  const userId = user._id; // Replace with actual user ID

  useEffect(() => {
    const start = new Date();
    setStartTime(start);

    return () => {
      const end = new Date();
      const timeDifference = (end - start) / (1000 * 60); // Convert milliseconds to minutes
      handleSaveTime(timeDifference);
    };
  }, []);

  const handleSaveTime = async (timeSpent) => {
    try {
      const response = await fetch("http://localhost:3000/time", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          timeSpent,
        }),
      });
      const data = await response.json();
    } catch (error) {
      console.log("Error in handleSaveTime", error);
    }
  };

  return (
    <div className="bg-[#002233] min-h-dvh relative text-white">
      <Header2
        showHamburger={showHamburger}
        setShowHamburger={setShowHamburger}
      />
      <Hamburger
        isOpen={showHamburger}
        onClose={() => setShowHamburger(false)}
      />
      <div
        className={`transition-all duration-300 ${
          showHamburger ? "ml-[25%]" : "ml-0"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
