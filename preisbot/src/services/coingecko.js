const axios = require('axios');
const config = require('../config');

async function getPepuPrice() {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${config.coinGeckoId}&vs_currencies=eur`
    );
    
    if (response.data && response.data[config.coinGeckoId]) {
      return response.data[config.coinGeckoId].eur;
    }
    return null;
  } catch (error) {
    console.error('CoinGecko API error:', error.message);
    throw error;
  }
}

module.exports = { getPepuPrice };