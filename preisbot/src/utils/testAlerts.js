const { getPepuPrice } = require('../services/coingecko');

async function generateTestAlerts() {
  const currentPrice = await getPepuPrice();
  
  // Both alerts will show the current real price
  const pumpAlert = {
    milestone: Math.floor(currentPrice * 1000) / 1000, // Round down to nearest milestone
    price: currentPrice,
    isPump: true,
    previousPrice: currentPrice - 0.001
  };

  const dumpAlert = {
    milestone: Math.ceil(currentPrice * 1000) / 1000, // Round up to nearest milestone
    price: currentPrice,
    isPump: false,
    previousPrice: currentPrice + 0.001
  };

  return { pumpAlert, dumpAlert };
}

module.exports = { generateTestAlerts };