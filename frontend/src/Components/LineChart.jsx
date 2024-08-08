// src/components/LineChart.js
import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ dataSet }) => {
  const dataForLine = {
    labels: dataSet.map((entry) => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: "Time Spent (minutes)",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "rgba(75,192,192,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75,192,192,1)",
        data: dataSet.map((entry) => entry.timeSpent),
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className = "flex justify-center">
      <Line data={dataForLine} options={options} />
    </div>
  );
};

export default LineChart;
