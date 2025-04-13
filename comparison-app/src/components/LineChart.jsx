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

const LineChart = ({ selectedProviderName, yearlyTotalsData }) => {
  const labels = yearlyTotalsData.map((item) => item.year);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Payment (€)",
        data: yearlyTotalsData.map((item) => item.payment),
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.1,
      },
      {
        label: "Benchmark (€)",
        data: yearlyTotalsData.map((item) => item.benchmark),
        fill: false,
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 0.2)",
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
          ? `Total ${selectedProviderName} trends by year`
          : "Company",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label;
            const value = context.raw;
            const formattedValue = new Intl.NumberFormat("en-IE", {
              style: "currency",
              currency: "EUR",
            }).format(value);

            return `${label}: ${formattedValue}`;
          },
        },
      },
    },
  };
  return <Line options={options} data={chartData} />;
};

export default LineChart;
