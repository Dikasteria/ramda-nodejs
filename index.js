const R = require("ramda");
const table = require("text-table");
const cities = require("./cities.json");
const percentile = require("./percentile");

// // Change each cities temp to celsius
// const KtoC = (k) => k - 273.15;
const KtoF = (k) => (k * 9) / 5 - 459.67;

const updateTemperature = R.curry((convertFn, city) => {
  const temp = Math.round(convertFn(city.temp));
  return R.merge(city, { temp });
});

// const updatedCities = R.map(updateTemperature(KtoF), cities);

// // console.log(updatedCities);

// const city = cities[0];
// const updatedCity = updateTemperature(KtoC, city);

// // console.log(updatedCity);

// const totalCostReducer = (acc, city) => {
//     const { cost } = city;
//     return acc + cost;
// };

// const totalCost = R.reduce(totalCostReducer, 0, updatedCities);
// const cityCount = R.length(updatedCities)

// // console.log(totalCost/cityCount)

const groupByPropReducer = (acc, city) => {
  const { cost = [], internetSpeed = [] } = acc;
  return R.merge(acc, {
    cost: R.append(city.cost, cost),
    internetSpeed: R.append(city.internetSpeed, internetSpeed),
  });
};

const groupedByProp = R.reduce(groupByPropReducer, {}, cities);

// // console.log(groupedByProp);

const calcScore = (city) => {
  const { cost = 0, internetSpeed = 0 } = city;
  const costPercentile = percentile(groupedByProp.cost, cost);
  const internetSpeedPercentile = percentile(
    groupedByProp.internetSpeed,
    internetSpeed
  );

  const score = 100 * (1.0 - costPercentile) + 20 * internetSpeedPercentile;
  return R.merge(city, { score });
};

// const scoredCities = R.map(calcScore, updatedCities);

// // console.log(scoredCities)

const filteredByWeather = (city) => {
  const { temp = 0, humidity = 0 } = city;
  return temp > 68 && temp < 85 && humidity > 30 && humidity < 70;
};

// const filteredCities = R.filter(filteredByWeather, scoredCities);

// // console.log(filteredCities.length)

// const sortedCities = R.sortWith(
//     [R.descend(city => city.score)],
//     filteredCities
// );

// // console.log(sortedCities)

// // const top10 = R.take(10, sortedCities);

// // console.log(top10)

const cityToArray = (city) => {
  const { name, country, score, cost, temp, internetSpeed } = city;
  return [name, country, score, cost, temp, internetSpeed];
};

const interestingProps = [
  "name",
  "country",
  "score",
  "cost",
  "temp",
  "internetSpeed",
];

const topCities = R.pipe(
  R.map(updateTemperature(KtoF)),
  R.filter(filteredByWeather),
  R.map(calcScore),
  R.sortWith([R.descend((city) => city.score)]),
  R.take(10),
  R.map(cityToArray),
  R.prepend(interestingProps),
  table
)(cities);

// console.log(topCities);
