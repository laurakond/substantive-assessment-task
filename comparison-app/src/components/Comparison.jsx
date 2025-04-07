import React, { useState, useEffect } from "react";
import axios from "axios";

const Comparison = () => {
  const [allBenchmarks, setAllBenchmarks] = useState([]);
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

  /** Extract unique provider names from the fetched data, excluding
   * duplicates, so that a list of provider names is concise */
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

  const handleYearClick = (clickedYear) => {
    console.log("clicked year:", clickedYear);
    setSelectedYear(clickedYear);
  };

  // Filter the benchmarks based on the selected provider name that was clicked
  const filteredData = allBenchmarks.filter(
    (benchmark) => benchmark.provider_name === selectedProviderName
  );
  console.log(selectedProviderName);

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

      <div>
        <h1>Provider names</h1>
        {uniqueProviderNames.map((providerName, index) => (
          <div key={index}>
            <button onClick={() => handleButtonClick(providerName)}>
              {providerName}
            </button>
            <p></p>
          </div>
        ))}
      </div>

      <div>
        <h2>{selectedProviderName}</h2>
        {selectedProviderName ? (
          <div>
            <h1>Year</h1>
            <p>Choose a year</p>
            {year.map((year, index) => (
              <div key={index}>
                <button onClick={() => handleYearClick(year)}>{year}</button>
              </div>
            ))}
          </div>
        ) : null}
      </div>

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
                  </div>
                ))}
              </div>
            ) : (
              <p>no data is available.</p>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Comparison;
