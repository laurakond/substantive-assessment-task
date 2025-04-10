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
    labels: ["Payment (€)", "Benchmark (€)"],
    datasets: [
      {
        label: [payment, benchmark],
        data: [payment, benchmark],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)"],
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          generateLabels: (chart) => {
            console.log("chart: ", chart);
            return chart.data.labels.map((label, index) => ({
              text: label,
              strokeStyle: chart.data.datasets[0].backgroundColor[index],
              fillStyle: chart.data.datasets[0].backgroundColor[index],
            }));
          },
        },
      },
      title: { display: true, text: "Total payment vs Total benchmark" },
    },
  };
  return <Bar options={options} data={data} />;
};

export default BarChart;
