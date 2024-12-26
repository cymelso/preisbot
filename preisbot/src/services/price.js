const axios = require('axios');
const { getTokenConfig } = require('../config/tokens');

async function getTokenPrice(symbol) {
  const config = getTokenConfig(symbol);
  if (!config) {
    throw new Error(`Invalid token: ${symbol}`);
  }

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${config.coinGeckoId}&vs_currencies=eur`
    );
    
    if (response.data && response.data[config.coinGeckoId]) {
      return {
        symbol: symbol.toUpperCase(),
        name: config.name,
        price: response.data[config.coinGeckoId].eur
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error.message);
    throw error;
  }
}

module.exports = { getTokenPrice };