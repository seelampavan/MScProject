// src/components/PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  return (
    <div>
      <Pie data={data} />
      <h3 className="text-center">Progress</h3>
    </div>
  );
};

export default PieChart;
