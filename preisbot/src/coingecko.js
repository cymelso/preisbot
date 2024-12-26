const axios = require('axios');

async function getTokenPrice(tokenId) {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=eur`
    );
    
    if (response.data && response.data[tokenId]) {
      return response.data[tokenId].eur;
    }
    return null;
  } catch (error) {
    console.error('Error fetching price:', error.message);
    throw error;
  }
}

async function getHolderCount(tokenId) {
  try {
    // Get token data including holder count if available
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${tokenId}?localization=false&tickers=false&market_data=false&community_data=true`
    );
    
    if (response.data && response.data.community_data) {
      return response.data.community_data.total_holders || null;
    }
    return null;
  } catch (error) {
    console.error('Error fetching holder count:', error.message);
    throw error;
  }
}

module.exports = { getTokenPrice, getHolderCount };