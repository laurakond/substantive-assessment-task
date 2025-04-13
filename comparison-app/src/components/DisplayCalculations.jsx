import React from "react";

const DisplayCalculations = ({
  selectedProviderName,
  selectedYear,
  noDataAvailable,
}) => {
  return (
    <div className="py-4">
      {/** Displays the total payment and benchmark values in Euro for the
       * selected year and provider name */}
      <h5>
        {selectedProviderName} breakdown for {selectedYear}
      </h5>

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
