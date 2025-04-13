import Table from "react-bootstrap/Table";
import React from "react";

const TableDisplay = ({
  totalSumPayment,
  totalSumBenchmark,

  percentageDifference,
  formattedDifference,
}) => {
  {
    percentageDifference < 0 ? (
      <p>{percentageDifference}% under benchmark</p>
    ) : (
      <p>{percentageDifference}% over benchmark</p>
    );
  }

  return (
    <>
      <div>
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
      {/* <div>
        <h5>Breakdown of figures for all companies for {selectedYear} </h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Total Payment</th>
              <th>Total Benchmark</th>
              <th>Difference</th>
              <th>Difference in %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{selectedProviderName}</td>
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
            <tr>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>Larry the Bird</td>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div> */}
    </>
  );
};

export default TableDisplay;
