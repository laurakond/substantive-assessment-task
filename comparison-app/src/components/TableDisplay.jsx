import Table from "react-bootstrap/Table";
import React from "react";

const TableDisplay = ({
  totalSumPayment,
  totalSumBenchmark,
  noDataAvailable,
  percentageDifference,
  formattedDifference,
  selectedProviderName,
  selectedYear,
}) => {
  return (
    <>
      <div className="pt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Total Payment</th>
              <th>Total Benchmark</th>
              <th>Difference</th>
              <th>Difference in %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{totalSumPayment}</td>
              <td>{totalSumBenchmark}</td>
              <td>{formattedDifference}</td>
              <td>
                {percentageDifference < 0 ? (
                  <span style={{ color: "red" }}>{percentageDifference}%</span>
                ) : percentageDifference > 0 ? (
                  <span style={{ color: "green" }}>
                    {percentageDifference}%
                  </span>
                ) : (
                  <span>0.00%</span>
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      {selectedProviderName !== "Company Name" &&
        selectedYear !== "Select Year" &&
        noDataAvailable && (
          <div>
            <p className="mt-4" style={{ color: "red" }}>
              No data available for{" "}
              <strong>
                {selectedProviderName} {selectedYear}.
              </strong>
            </p>
          </div>
        )}
    </>
  );
};

export default TableDisplay;
