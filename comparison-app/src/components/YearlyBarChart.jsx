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

const YearlyBarChart = ({ selectedProviderName, yearlyTotalsData }) => {
  const labels = yearlyTotalsData.map((item) => item.year);
  const chartData = {
    labels,
    datasets: [
      {
        label: "Payment",
        data: yearlyTotalsData.map((item) => item.payment),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        position: "center",
      },
      {
        label: "Benchmark",
        data: yearlyTotalsData.map((item) => item.benchmark),
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: selectedProviderName
          ? `Yearly comparison for ${selectedProviderName}`
          : "Yearly comparison for Company",
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
  return <Bar options={options} data={chartData} />;
};

export default YearlyBarChart;
