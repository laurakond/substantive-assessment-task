import React, { useState, useEffect } from "react";
import axios from "axios";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SelectCompany from "./SelectCompany";
import SelectYear from "./SelectYear";
import DisplayCalculations from "./DisplayCalculations";
import {
  convertToEuro,
  filterBenchmarksByProvider,
  filterBenchmarksByYearProvider,
  getEuroID,
  getUniqueLists,
  totalSum,
} from "../utilities/utils";
import styles from "../styles/Comparison.module.css";

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
        console.error("Error fetching product benchmark data:", error);
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
        console.error("Error fetching currency exchange data:", error);
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

  // Filter the benchmarks based on the selected provider name that was clicked
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

  // Calculates the total of all payments in that year
  const totalSumPayment = totalSum(convertedToEuro, "payment");

  // Calculates the total of all benchmark prices in that year
  const totalSumBenchmark = totalSum(convertedToEuro, "benchmark");

  /** This part of the code calculates data for showing annual trend per
   * provider which is displayed in the line chart*/
  const filteredBenchmarks = filterBenchmarksByProvider(
    allBenchmarks,
    selectedProviderName
  );

  const convertedBenchmarks =
    selectedProviderName && filteredBenchmarks.length > 0
      ? convertToEuro(filteredBenchmarks, currencyExchange, euroID)
      : [];

  const trendData = convertedBenchmarks
    .map((item) => ({
      year: item.year,
      payment: item.payment,
      benchmark: item.benchmark,
    }))
    .sort((a, b) => a.year - b.year);

  return (
    <>
      <Container className="py-5">
        <div className={`text-center ${styles.test}`}>
          <h1>Comparison App</h1>
          <p className="align-center my-4">
            This is a simple comparison app that allows you to compare the
            payment and benchmark values of different product providers. The app
            fetches data from an API and displays the results in a bar chart
            format. You can select a provider and a year to see the comparison
            between the payment and benchmark values in Euro.
          </p>
        </div>
        <Row className="align-items-center justify-content-center">
          <Col>
            {/* Product provider name */}
            <SelectCompany
              selectedProviderName={selectedProviderName}
              uniqueProviderNames={uniqueProviderNames}
              handleCompanyButtonClick={handleCompanyButtonClick}
            />
            {/* Renders a list of years once the provider is selected */}
            <div>
              {selectedProviderName ? (
                <SelectYear
                  selectedYear={selectedYear}
                  uniqueYears={uniqueYears}
                  handleYearButtonClick={handleYearButtonClick}
                />
              ) : null}
            </div>
            <div>
              <DisplayCalculations
                totalSumPayment={totalSumPayment}
                totalSumBenchmark={totalSumBenchmark}
                selectedYear={selectedYear}
                selectedProviderName={selectedProviderName}
              />
            </div>
          </Col>
          <Col>
            <div className="chart-container">
              <BarChart
                payment={totalSumPayment}
                benchmark={totalSumBenchmark}
                selectedYear={selectedYear}
                selectedProviderName={selectedProviderName}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* Displays converted payment and benchmark values in Euro  based
            on selected year and company*/}
            {/* <div>
              <DisplayCalculations
                totalSumPayment={totalSumPayment}
                totalSumBenchmark={totalSumBenchmark}
                selectedYear={selectedYear}
                selectedProviderName={selectedProviderName}
              />
            </div> */}
          </Col>
          <Col>
            <div className="chart-container">
              <LineChart
                data={trendData}
                selectedProviderName={selectedProviderName}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Comparison;
