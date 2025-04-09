// Import the necessary modules and components
import React from "react";
import "./App.css";
import Comparison from "./components/comparison";
import BarChart from "./components/BarChart.jsx";
import { BarChartData } from "./components/TestData.jsx";

function App() {
  return (
    <>
      <div>
        <Comparison />
        <BarChart chartData={BarChartData} />
      </div>
    </>
  );
}

export default App;
