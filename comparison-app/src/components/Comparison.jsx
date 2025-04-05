import React, { useState, useEffect } from "react";
import axios from "axios";

const Comparison = () => {
  const [benchmarks, setBenchmark] = useState([]);

  // This useEffect fetches product benchmark data from the API when the component mounts.
  useEffect(() => {
    const headers = { "auth-key": "590e3e17b6a26a8fcda726e2a91520e476e2c894" };
    console.log("useEffect called");
    axios
      .get("https://substantive.pythonanywhere.com/product_benchmarks", {
        headers,
      })
      .then((response) => {
        console.log(response.data);
        setBenchmark(response.data.product_benchmarks);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <p>Comparison</p>
      {benchmarks && (
        <div>
          benchmarks:
          {benchmarks.map((benchmark) => {
            return (
              <div key={benchmark.id}>
                <p>{benchmark.provider_name}</p> <p>{benchmark.product_name}</p>
                <p>{benchmark.year}</p> payment: {benchmark.currency.symbol}
                {benchmark.payment} <br />
                benchmark: {benchmark.benchmark}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comparison;
