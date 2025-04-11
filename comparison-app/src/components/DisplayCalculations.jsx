import React from "react";

const DisplayCalculations = ({ totalSumPayment, totalSumBenchmark }) => {
  return (
    <div className="py-4">
      {/** Displays the total payment and benchmark values in Euro for the selected year and provider name */}
      <h4>Total Payment: €{totalSumPayment}</h4>
      <h4>Total Benchmark: €{totalSumBenchmark}</h4>
      <h4>
        Difference: €{totalSumPayment - totalSumBenchmark}
        {totalSumPayment - totalSumBenchmark < 0 ? (
          <span style={{ color: "red" }}> (Under benchmark)</span>
        ) : (
          <span style={{ color: "green" }}> (Over benchmark)</span>
        )}
      </h4>
    </div>
  );
};

export default DisplayCalculations;
