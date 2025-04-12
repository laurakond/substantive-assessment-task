import React from "react";
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

const LineChart = ({ selectedProviderName, data }) => {
  const labels = [...new Set(data.map((d) => d.year))].sort((a, b) => a - b);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Benchmark (€)",
        data: labels.map(
          (year) => data.find((d) => d.year === year)?.benchmark || 0
        ),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Payment(€)",
        data: labels.map(
          (year) => data.find((d) => d.year === year)?.payment || 0
        ),
        fill: false,
        borderColor: "rgb(190, 90, 192)",
        tension: 0.1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: selectedProviderName
          ? `Total ${selectedProviderName} trends`
          : "Company",
      },
    },
  };
  return <Line options={options} data={chartData} />;
};

export default LineChart;
