import React, { useState, useEffect } from "react";
import axios from "axios";

const Comparison = () => {
  const [allBenchmarks, setAllBenchmarks] = useState([]);
  const [currencyExchange, setCurrencyExchange] = useState([]);
  const [selectedProviderName, setSelectedProviderName] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

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

  /** Extract unique provider names from the fetched data, excluding
   * duplicates, so that a list shows overall providers */
  const uniqueProviderNames = [
    ...new Set(
      allBenchmarks.map((uniqueBenchmark) => uniqueBenchmark.provider_name)
    ),
  ];
  console.log("unique provider names: ", uniqueProviderNames);

  /** triggers the function when the button is clicked, to show selected
   * provider name*/
  const handleButtonClick = (providerName) => {
    setSelectedProviderName(providerName);
  };

  /** triggers the function when the button is clicked, to show the year,
   * payment and benchmark of the selected provider name */
  const handleYearClick = (clickedYear) => {
    console.log("clicked year:", clickedYear);
    setSelectedYear(clickedYear);
  };

  // Filter the benchmarks based on the selected provider name that was clicked
  const filteredDataBasedOnYear = allBenchmarks.filter(
    (y) => y.year === selectedYear && y.provider_name === selectedProviderName
  );
  console.log("filtered data based on year:", filteredDataBasedOnYear);

  // Extract unique provider names from the fetched data, excluding duplicates
  const year = [...new Set(allBenchmarks.map((uniqueYear) => uniqueYear.year))];
  console.log("year:", year);
  console.log("selectedProviderName:", selectedProviderName);

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
      const convertedPayment = benchmark.payment * exchangeRate.exchange_rate;
      const convertedBenchmark =
        benchmark.benchmark * exchangeRate.exchange_rate;
      return {
        ...benchmark,
        payment: convertedPayment,
        benchmark: convertedBenchmark,
        currency: {
          id: euroID,
          name: "EUR",
          symbol: "€",
        },
      };
    }
    return benchmark; // Return the original benchmark if no exchange rate is found
  });

  return (
    <>
      <h1>Comparison</h1>
      {/* Product provider name */}
      <div>
        <h2>Provider names</h2>
        {uniqueProviderNames.map((providerName, index) => (
          <div key={index}>
            <button onClick={() => handleButtonClick(providerName)}>
              {providerName}
            </button>
            <p></p>
          </div>
        ))}
      </div>

      {/* Renders a list of years once the provider is selected */}
      <div>
        <h2>{selectedProviderName}</h2>
        {selectedProviderName ? (
          <div>
            <h2>Year</h2>
            <p>Choose a year</p>
            {year
              .sort((a, b) => a - b)
              .map((year, index) => (
                <div key={index}>
                  <button onClick={() => handleYearClick(year)}>{year}</button>
                </div>
              ))}
          </div>
        ) : null}
      </div>

      {/* Displays converted payment and benchmark values in Euro  based on selected year and company*/}
      <div>
        {selectedProviderName && selectedYear ? (
          <div>
            {convertedToEuro && convertedToEuro.length > 0 ? (
              <div>
                {convertedToEuro.map((benchmark) => (
                  <div key={benchmark.id}>
                    <p>{benchmark.provider_name}</p>
                    <p>{benchmark.year}</p> payment: €{benchmark.payment} <br />
                    benchmark: €{benchmark.benchmark}
                    <p>currency id: {benchmark.currency.id}</p>
                    <p>currency name: {benchmark.currency.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>no data available.</p>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Comparison;
