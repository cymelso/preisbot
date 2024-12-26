const axios = require('axios');
const config = require('../config');

async function getPepuHolderCount() {
  try {
    const response = await axios.get('https://api.etherscan.io/api', {
      params: {
        module: 'token',
        action: 'tokenholderlist',
        contractaddress: config.pepuAddress,
        apikey: config.etherscanApiKey,
        page: 1,
        offset: 10000
      }
    });

    if (response.data.status === '1' && response.data.result) {
      return response.data.result.length;
    }
    
    throw new Error(response.data.message || 'Failed to fetch holder count');
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    throw new Error(`Etherscan API error: ${errorMessage}`);
  }
}

module.exports = { getPepuHolderCount };