import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ payment, benchmark }) => {
  const data = {
    labels: ["Total"],
    datasets: [
      {
        label: "Payment (€)",
        data: [payment],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Benchmark (€)",
        data: [benchmark],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Total payment vs Total benchmark" },
    },
  };
  return <Bar options={options} data={data} />;
};

export default BarChart;
