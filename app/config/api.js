export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (coinsParam) =>
  `https://api.coingecko.com/api/v3/coins/${coinsParam}`;

export const HistoricalChart = (coinsParam, days = 365) =>
  `https://api.coingecko.com/api/v3/coins/${coinsParam}/market_chart?vs_currency=USD&days=${days}`;

export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/search/trending`;
