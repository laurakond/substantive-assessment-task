import React from "react";

const DisplayCalculations = ({
  totalSumPayment,
  totalSumBenchmark,
  selectedProviderName,
  selectedYear,
}) => {
  const noDataAvailable = totalSumPayment === 0 && totalSumBenchmark === 0;
  return (
    <div className="py-4">
      {/** Displays the total payment and benchmark values in Euro for the
       * selected year and provider name */}
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
      {selectedProviderName !== "Company Name" &&
        selectedYear !== "Select Year" &&
        noDataAvailable && (
          <p>
            No data available for {selectedProviderName} {selectedYear}.
          </p>
        )}
    </div>
  );
};

export default DisplayCalculations;
