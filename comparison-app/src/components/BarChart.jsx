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

const BarChart = ({
  payment,
  benchmark,
  selectedYear,
  selectedProviderName,
}) => {
  const data = {
    labels: ["Payment (€)", "Benchmark (€)"],
    datasets: [
      {
        data: [payment, benchmark],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
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
            return chart.data.labels.map((label, index) => ({
              text: label,
              strokeStyle: chart.data.datasets[0].backgroundColor[index],
              fillStyle: chart.data.datasets[0].backgroundColor[index],
            }));
          },
        },
      },

      title: {
        display: true,
        text:
          selectedProviderName && selectedYear
            ? `Overall payment & benchmark comparison for ${selectedProviderName}: ${selectedYear}`
            : "Company: Year",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label;
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
  return <Bar options={options} data={data} />;
};

export default BarChart;
