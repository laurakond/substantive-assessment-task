/** Extract unique provider names and years from the fetched data, excluding
 * duplicates, so that a list shows overall providers/years */
export const getUniqueLists = (array, prop) => {
  return [...new Set(array.map((item) => item[prop]))];
};

// Calculates total payment & benchmark figures per year
export const totalSum = (array, prop) => {
  return array.reduce((accumulator, item) => accumulator + item[prop], 0);
};

export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);

// Filter the benchmarks based on the selected provider name that was clicked
export const filterBenchmarksByYearProvider = (benchmarks, year, provider) => {
  return benchmarks.filter(
    (item) => item.year === year && item.provider_name === provider
  );
};

// Filter data by provider only
export const filterBenchmarksByProvider = (benchmarks, provider) => {
  return benchmarks.filter((item) => item.provider_name === provider);
};

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

export const getPercentageDifference = (payment, benchmark) => {
  // makes sure that the division by 0 is not throwing an error
  if (benchmark === 0) return 0;
  return ((payment - benchmark) / benchmark) * 100;
};

export const convertToEuro = (
  filteredDataBasedOnYear,
  currencyExchange,
  euroID
) => {
  if (Array.isArray(filteredDataBasedOnYear)) {
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

      /** If an exchange rate is found, call appropriate function */
      if (exchangeRate) {
        return convertPaymentAndBenchmarkToEuro(
          benchmark,
          exchangeRate,
          euroID
        );
      }
      return benchmark; // Return the original benchmark if no exchange rate found
    });
  } else {
    // If it's a single value (i.e., one benchmark/payment object), process it directly
    const benchmark = filteredDataBasedOnYear;

    if (isAlreadyEuro(benchmark, euroID)) {
      return {
        ...benchmark,
        payment: benchmark.payment,
        benchmark: benchmark.benchmark,
      };
    }

    const exchangeRate = getExchangeRate(benchmark, currencyExchange, euroID);
    if (exchangeRate) {
      return convertPaymentAndBenchmarkToEuro(benchmark, exchangeRate, euroID);
    }
    return benchmark;
  }
};

export const getYearlyTotalsByProvider = (
  benchmarks,
  provider,
  currencyExchange,
  euroID
) => {
  const filteredValues = filterBenchmarksByProvider(benchmarks, provider);
  const convertedValue = convertToEuro(
    filteredValues,
    currencyExchange,
    euroID
  );
  const yearList = getUniqueLists(convertedValue, "year");
  const yearlyTotals = yearList.map((year) => {
    const totalsData = convertedValue.filter((entry) => entry.year === year);
    return {
      year,
      payment: totalSum(totalsData, "payment"),
      benchmark: totalSum(totalsData, "benchmark"),
    };
  });
  return yearlyTotals.sort((a, b) => a.year - b.year);
};
