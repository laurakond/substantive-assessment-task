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

      {/* Currency exchange view */}
      <div>
        <h2>Currency exchange</h2>
        {currencyExchange.map((exchange, index) => (
          <div key={index}>
            <p>Exchange year valid: {exchange.year}</p>
            <p>Exchange rate: {exchange.exchange_rate}</p>
            <p>From currency id: {exchange.from_currency_id}</p>
            <p>to currency id: {exchange.to_currency_id}</p>
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
            {year.map((year, index) => (
              <div key={index}>
                <button onClick={() => handleYearClick(year)}>{year}</button>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      {/* Displays filtered list of all payments/benchmarks based on selected year */}
      <div>
        {selectedProviderName && selectedYear ? (
          <div>
            {filteredDataBasedOnYear && filteredDataBasedOnYear.length > 0 ? (
              <div>
                {filteredDataBasedOnYear.map((benchmark) => (
                  <div key={benchmark.id}>
                    <p>{benchmark.provider_name}</p>
                    <p>{benchmark.year}</p> payment: {benchmark.currency.symbol}
                    {benchmark.payment} <br />
                    benchmark: {benchmark.currency.symbol}
                    {benchmark.benchmark}
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
