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
      <span style={{ display: "block" }}>
        <strong>Total Payment: </strong>€{totalSumPayment}
      </span>
      <span style={{ display: "block" }}>
        <strong>Total Benchmark: </strong>€{totalSumBenchmark}
      </span>
      <span style={{ display: "block" }}>
        <strong>Difference: </strong>€{totalSumPayment - totalSumBenchmark}
        {totalSumPayment - totalSumBenchmark < 0 ? (
          <span style={{ color: "red" }}>
            {" "}
            <strong>(Under benchmark)</strong>
          </span>
        ) : totalSumPayment - totalSumBenchmark > 0 ? (
          <span style={{ color: "green" }}>
            {" "}
            <strong>(Over benchmark)</strong>
          </span>
        ) : null}
      </span>

      {selectedProviderName !== "Company Name" &&
        selectedYear !== "Select Year" &&
        noDataAvailable && (
          <p>
            No data available for{" "}
            <strong>
              {selectedProviderName} {selectedYear}
            </strong>
            .
          </p>
        )}
    </div>
  );
};

export default DisplayCalculations;
