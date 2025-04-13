import React, { useState, useEffect } from "react";
import axios from "axios";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import YearlyBarChart from "./YearlyBarChart";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SelectCompany from "./SelectCompany";
import SelectYear from "./SelectYear";
import {
  convertToEuro,
  filterBenchmarksByYearProvider,
  formatCurrency,
  getEuroID,
  getPercentageDifference,
  getUniqueLists,
  getYearlyTotalsByProvider,
  totalSum,
} from "../utilities/utils";
import TableDisplay from "./TableDisplay";

const Comparison = () => {
  const [allBenchmarks, setAllBenchmarks] = useState([]);
  const [currencyExchange, setCurrencyExchange] = useState([]);
  const [selectedProviderName, setSelectedProviderName] =
    useState("Company Name");
  const [selectedYear, setSelectedYear] = useState("Select Year");

  useEffect(() => {
    const fetchProductBenchmarkData = async () => {
      try {
        const headers = {
          "auth-key": "590e3e17b6a26a8fcda726e2a91520e476e2c894",
        };
        const response = await axios.get(
          "https://substantive.pythonanywhere.com/product_benchmarks",
          { headers }
        );
        setAllBenchmarks(response.data.product_benchmarks);
      } catch (error) {
        /** console.error("Error fetching product benchmark data:", error);
         * left as commented out code for the ease of debugging in the future
         */
      }
    };
    fetchProductBenchmarkData();
  }, []);

  /** This useEffect fetches currency exchange data from the API when the
   * component mounts. */
  useEffect(() => {
    const fetchExchangeRatesData = async () => {
      try {
        const headers = {
          "auth-key": "590e3e17b6a26a8fcda726e2a91520e476e2c894",
        };
        const response = await axios.get(
          "https://substantive.pythonanywhere.com/exchange_rates",
          { headers }
        );
        setCurrencyExchange(response.data.exchange_rates);
      } catch (error) {
        /**console.error("Error fetching currency exchange data:", error);
         * left as commented out code for the ease of debugging in the future
         */
      }
    };
    fetchExchangeRatesData();
  }, []);

  // Calls helper function to get a list of company names
  const uniqueProviderNames = getUniqueLists(allBenchmarks, "provider_name");
  // Calls helper function to get a list of years
  const uniqueYears = getUniqueLists(allBenchmarks, "year");

  /** triggers the function when the button is clicked, to show selected
   * provider name*/
  const handleCompanyButtonClick = (providerName) => {
    setSelectedProviderName(providerName);
  };

  /** triggers the function when the button is clicked, to show the year,
   * payment and benchmark of the selected provider name */
  const handleYearButtonClick = (clickedYear) => {
    setSelectedYear(clickedYear);
  };

  // Filter the values based on the selected provider name that was clicked
  const filteredDataBasedOnYear = filterBenchmarksByYearProvider(
    allBenchmarks,
    selectedYear,
    selectedProviderName
  );

  // Calls helper function to find euro Id and allocate it to the variable
  const euroID = getEuroID(allBenchmarks);

  // Calls helper function to convert currencies to Euro
  const convertedToEuro = convertToEuro(
    filteredDataBasedOnYear,
    currencyExchange,
    euroID
  );

  /** Calculates the total of all payments/benchmarks in that year used for
   * Bar Chart and formats the currency*/
  const totalPaymentValue = totalSum(convertedToEuro, "payment");
  const totalBenchmarkValue = totalSum(convertedToEuro, "benchmark");

  const totalSumPayment = formatCurrency(totalPaymentValue);
  const totalSumBenchmark = formatCurrency(totalBenchmarkValue);

  const difference = totalPaymentValue - totalBenchmarkValue;
  const formattedDifference = formatCurrency(difference);

  const noDataAvailable = totalPaymentValue === 0 && totalBenchmarkValue === 0;

  /** Calls helper function to get the totals of payments and benchmarks
   * for each year used for line and yearly bar charts*/
  const yearlyTotalsData = getYearlyTotalsByProvider(
    allBenchmarks,
    selectedProviderName,
    currencyExchange,
    euroID
  );

  const percentageDifference = getPercentageDifference(
    totalPaymentValue,
    totalBenchmarkValue
  ).toFixed(2);

  return (
    <>
      <Container className="py-3">
        <div className="text-center">
          <h1>Comparison App</h1>
          <p className="align-center my-4">
            This is a simple comparison app that allows you to compare the
            payment and benchmark values of different product providers. The app
            fetches data from an API and displays the results in a bar chart
            format. You can select a provider and a year to see the comparison
            between the payment and benchmark values in Euro.
          </p>
        </div>
        <Row className="text-center px-3 pb-4">
          <Col>
            <SelectCompany
              selectedProviderName={selectedProviderName}
              uniqueProviderNames={uniqueProviderNames}
              handleCompanyButtonClick={handleCompanyButtonClick}
            />
          </Col>
          <Col>
            {selectedProviderName ? (
              <SelectYear
                selectedYear={selectedYear}
                uniqueYears={uniqueYears}
                handleYearButtonClick={handleYearButtonClick}
              />
            ) : null}
          </Col>
        </Row>

        <Row className="align-items-center justify-content-center mt-4">
          <Col>
            <div className="py-4 text-center">
              <h5 className="text-center">
                {selectedProviderName} breakdown for {selectedYear}
              </h5>
            </div>
            <div>
              <TableDisplay
                totalSumPayment={totalSumPayment}
                totalSumBenchmark={totalSumBenchmark}
                percentageDifference={percentageDifference}
                formattedDifference={formattedDifference}
                noDataAvailable={noDataAvailable}
                selectedYear={selectedYear}
                selectedProviderName={selectedProviderName}
              />
            </div>
          </Col>
          <Col>
            <div className="chart-container">
              <BarChart
                payment={totalPaymentValue}
                benchmark={totalBenchmarkValue}
                selectedYear={selectedYear}
                selectedProviderName={selectedProviderName}
              />
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <div className="chart-container">
              <YearlyBarChart
                payment={totalSumPayment}
                benchmark={totalSumBenchmark}
                selectedProviderName={selectedProviderName}
                yearlyTotalsData={yearlyTotalsData}
              />
            </div>
          </Col>
          <Col>
            <div className="chart-container">
              <LineChart
                yearlyTotalsData={yearlyTotalsData}
                selectedProviderName={selectedProviderName}
              />
            </div>
            {/* <div className="chart-container">
              <YearlyBarChart
                payment={totalSumPayment}
                benchmark={totalSumBenchmark}
                selectedProviderName={selectedProviderName}
                yearlyTotalsData={yearlyTotalsData}
              />
            </div> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Comparison;
