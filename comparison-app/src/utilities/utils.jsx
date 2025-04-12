/** Extract unique provider names and years from the fetched data, excluding
 * duplicates, so that a list shows overall providers/years */
export const getUniqueLists = (array, prop) => {
  return [...new Set(array.map((item) => item[prop]))];
};

// Calculates total payment & benchmark figures per year
export const totalSum = (array, prop) => {
  return array.reduce((accumulator, item) => accumulator + item[prop], 0);
};

// Filter the benchmarks based on the selected provider name that was clicked
export const filterBenchmarksByYearProvider = (benchmarks, year, provider) => {
  return benchmarks.filter(
    (item) => item.year === year && item.provider_name === provider
  );
};
// console.log("filtered data based on year:", filteredDataBasedOnYear);

/** Registers the Euro currency ID by finding it within product benchmark
 * API data. */
export const getEuroID = (allBenchmarks) => {
  return allBenchmarks.find((currency) => currency.currency.name === "EUR")
    ?.currency.id;
};

// Checks if the currency is in Euro already
const isAlreadyEuro = (benchmark, euroID) => {
  return benchmark.currency.id === euroID;
};
// console.log("isAlreadyEuro:", isAlreadyEuro?.exchange_rate);

/** find the exchange rate for conversion
 * based on currency ID, euroId/currencyID and year  */
const getExchangeRate = (benchmark, currencyExchange, euroID) => {
  return currencyExchange.find(
    (exchange) =>
      exchange.from_currency_id === benchmark.currency.id &&
      exchange.to_currency_id === euroID &&
      Number(benchmark.year) === exchange.year
  );
};
// console.log("Exchange Rate Found:", getExchangeRate?.exchange_rate);

/** convert the payment and benchmark values using the exchange rate and
 * return the updated benchmark object */
const convertPaymentAndBenchmarkToEuro = (benchmark, exchangeRate, euroID) => {
  const convertedPayment =
    (Math.round(benchmark.payment * exchangeRate.exchange_rate) * 100) / 100;
  const convertedBenchmark =
    (Math.round(benchmark.benchmark * exchangeRate.exchange_rate) * 100) / 100;
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
};
// console.log("convertedPayment:", convertPaymentAndBenchmarkToEuro?.payment);

export const convertToEuro = (
  filteredDataBasedOnYear,
  currencyExchange,
  euroID
) => {
  return filteredDataBasedOnYear.map((benchmark) => {
    /** checks if the currency is in Euro already, returns the
     * benchmark as is*/
    if (isAlreadyEuro(benchmark, euroID)) {
      return {
        ...benchmark,
        payment: benchmark.payment,
        benchmark: benchmark.benchmark,
      };
    }

    /**  If the currency is not Euro, call appropriate function*/
    const exchangeRate = getExchangeRate(benchmark, currencyExchange, euroID);
    // console.log("Exchange Rate Found:", exchangeRate?.exchange_rate);

    /** If an exchange rate is found, call appropriate function */
    if (exchangeRate) {
      return convertPaymentAndBenchmarkToEuro(benchmark, exchangeRate, euroID);
    }
    return benchmark; // Return the original benchmark if no exchange rate found
  });
};
