import React, { useState, useEffect } from "react";
import axios from "axios";
import BarChart from "./BarChart";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Comparison = () => {
  const [allBenchmarks, setAllBenchmarks] = useState([]);
  const [currencyExchange, setCurrencyExchange] = useState([]);
  const [selectedProviderName, setSelectedProviderName] =
    useState("Company Name");
  const [selectedYear, setSelectedYear] = useState("Select Year");

  /** This useEffect fetches product benchmark data from the API when the
   * component mounts. */
  useEffect(() => {
    const headers = { "auth-key": "590e3e17b6a26a8fcda726e2a91520e476e2c894" };
    console.log("useEffect called");
    axios
      .get("https://substantive.pythonanywhere.com/product_benchmarks", {
        headers,
      })
      .then((response) => {
        console.log(response.data);
        setAllBenchmarks(response.data.product_benchmarks);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  /** This useEffect fetches currency exchange data from the API when the
   * component mounts. */
  useEffect(() => {
    const headers = { "auth-key": "590e3e17b6a26a8fcda726e2a91520e476e2c894" };
    console.log("useEffect called");

    axios
      .get("https://substantive.pythonanywhere.com/exchange_rates", {
        headers,
      })
      .then((response) => {
        console.log(response.data);
        setCurrencyExchange(response.data.exchange_rates);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log("exchange rate:", currencyExchange);

  /** Extract unique provider names and years from the fetched data, excluding
   * duplicates, so that a list shows overall providers/years */
  const getUniqueLists = (array, prop) => {
    return [...new Set(array.map((item) => item[prop]))];
  };

  const uniqueProviderNames = getUniqueLists(allBenchmarks, "provider_name");
  const uniqueYears = getUniqueLists(allBenchmarks, "year");
  console.log("unique provider names: ", uniqueProviderNames);
  console.log(" unique year:", uniqueYears);

  /** triggers the function when the button is clicked, to show selected
   * provider name*/
  const handleButtonClick = (providerName) => {
    setSelectedProviderName(providerName);
  };

  /** triggers the function when the button is clicked, to show the year,
   * payment and benchmark of the selected provider name */
  const handleYearClick = (clickedYear) => {
    setSelectedYear(clickedYear);
  };

  // Filter the benchmarks based on the selected provider name that was clicked
  const filteredDataBasedOnYear = allBenchmarks.filter(
    (y) => y.year === selectedYear && y.provider_name === selectedProviderName
  );
  console.log("filtered data based on year:", filteredDataBasedOnYear);

  /** Registers the Euro currency ID by finding it within product benchmark
   * API data. */
  const euroID = allBenchmarks.find(
    (currency) => currency.currency.name === "EUR"
  )?.currency.id;

  const convertedToEuro = filteredDataBasedOnYear.map((benchmark) => {
    /** checks if the currency is in Euro already, if so, it returns the
     * benchmark as is*/
    if (benchmark.currency.id === euroID) {
      console.log("Already in Euro:", benchmark.payment);
      return {
        ...benchmark,
        payment: benchmark.payment,
        benchmark: benchmark.benchmark,
      };
    }

    /**  If the currency is not Euro, find the exchange rate for conversion
     * based on currency ID, euroId/currencyID and year*/
    const exchangeRate = currencyExchange.find(
      (exchange) =>
        exchange.from_currency_id === benchmark.currency.id &&
        exchange.to_currency_id === euroID &&
        Number(benchmark.year) === exchange.year
    );
    console.log("Exchange Rate Found:", exchangeRate?.exchange_rate);

    /** If an exchange rate is found, convert the payment and benchmark values
     * using the exchange rate and return the updated benchmark object */
    if (exchangeRate) {
      const convertedPayment =
        (Math.round(benchmark.payment * exchangeRate.exchange_rate) * 100) /
        100;
      const convertedBenchmark =
        (Math.round(benchmark.benchmark * exchangeRate.exchange_rate) * 100) /
        100;
      return {
        ...benchmark,
        payment: convertedPayment, // Round to 2 decimal places
        benchmark: convertedBenchmark, // Round to 2 decimal places
        currency: {
          id: euroID,
          name: "EUR",
          symbol: "€",
        },
      };
    }
    return benchmark; // Return the original benchmark if no exchange rate is found
  });

  // Calculates total payment per year
  const totalSumPayment = convertedToEuro.reduce(
    (accumulator, benchmark) => accumulator + benchmark.payment,
    0
  );
  console.log("test sum payment: ", totalSumPayment);

  // Calculates total benchmark per year
  const totalSumBenchmark = convertedToEuro.reduce(
    (accumulator, benchmark) => accumulator + benchmark.benchmark,
    0
  );
  console.log("test sum payment: ", totalSumBenchmark);

  return (
    <>
      <Container className="py-5">
        <div className="text-center">
          <h1>Comparison App</h1>
          <p className="align-center my-4">
            This is a simple comparison app that allows you to compare the
            payment and benchmark values of different product providers. The app
            fetches data from an API and displays the results in a bar chart
            format. You can select a provider and a year to see the payment and
            benchmark values in Euro.
          </p>
        </div>
        <Row className="align-items-center justify-content-center">
          <Col>
            {/* Product provider name */}
            <div>
              <h2>Select the company</h2>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedProviderName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {uniqueProviderNames.map((providerName, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleButtonClick(providerName)}
                    >
                      {providerName}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* Renders a list of years once the provider is selected */}
            <div>
              {selectedProviderName ? (
                <div>
                  <h2>Select the year</h2>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {selectedYear}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {uniqueYears
                        .sort((a, b) => a - b)
                        .map((year, index) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => handleYearClick(year)}
                          >
                            {year}
                          </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              ) : null}
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
            {/* Displays converted payment and benchmark values in Euro  based on selected year and company*/}
            <div>
              {selectedProviderName && selectedYear ? (
                <div>
                  {convertedToEuro && convertedToEuro.length > 0 ? (
                    <div className="py-4">
                      {/** Displays the total payment and benchmark values in Euro for the selected year and provider name */}
                      <h4>Total Payment: €{totalSumPayment}</h4>
                      <h4>Total Benchmark: €{totalSumBenchmark}</h4>
                      <h4>
                        Difference: €{totalSumPayment - totalSumBenchmark}
                        {totalSumPayment - totalSumBenchmark < 0 ? (
                          <span style={{ color: "red" }}>
                            {" "}
                            (Under benchmark)
                          </span>
                        ) : (
                          <span style={{ color: "green" }}>
                            {" "}
                            (Over benchmark)
                          </span>
                        )}
                      </h4>
                    </div>
                  ) : (
                    <p>No data available.</p>
                  )}
                </div>
              ) : null}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Comparison;
