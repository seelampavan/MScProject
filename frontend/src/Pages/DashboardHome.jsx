import React, { useState, useEffect } from "react";
import PieChart from "../Components/PieChart";
import LineChart from "../Components/LineChart";
import { Link } from "react-router-dom";
import { useUser } from "../userContext.jsx";

const DashboardHome = ({ progress, total }) => {
  const { user } = useUser();
  const [timeSpent, setTimeSpent] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  const dataForPie = {
    labels: ["Completed", "Incomplete"],
    datasets: [
      {
        label: `${progress} Exercises completed of ${total}`,
        data: [progress, total - progress],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const handleFetchtime = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/time/${userId}`);
      const data = await response.json();
      setTimeSpent(data);
      console.log("Fetched timeSpent data:", data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching timeSpent data:", error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  useEffect(() => {
    if (user && user._id) {
      handleFetchtime(user._id);
    }
  }, [user._id]);

  // Transform timeSpent data for the line chart
  return (
    <div className="quicksand flex flex-col items-center justify-center ">
      <h2 className="julius text-center text-2xl p-4">Dashboard</h2>
      <h2 className="julius text-center text-xl ">
        Good to see you {user.username}!
      </h2>
      <div className="mt-8 p-8 w-11/12 flex flex-row items-center justify-around flex-wrap bg-black rounded max-w-11/12">
        <div className="w-full lg:w-1/4">
          <PieChart data={dataForPie} />
        </div>
        <div className="w-full mt-8 lg:w-1/2">
          {!loading && timeSpent.length > 0 ? (
            <LineChart dataSet={timeSpent} />
          ) : (
            <p>Loading data...</p>
          )}
        </div>
      </div>
      <div className="mt-8 p-4 w-full flex items-center justify-center ">
        <Link to="/dashboard/training">
          <button className="bg-green-600 text-white p-4 rounded pl-8 pr-8">
            Let's Train
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;
