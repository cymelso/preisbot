const { getPepuPrice } = require('./coingecko');
const { PRICE_MILESTONES } = require('./milestones');

let lastPrice = null;
let lastTriggeredMilestone = null;

async function checkPriceAlerts() {
  try {
    const currentPrice = await getPepuPrice();
    if (!currentPrice) return null;

    // Initialize lastPrice on first run
    if (lastPrice === null) {
      lastPrice = currentPrice;
      return null;
    }

    // Find the current milestone range
    const currentMilestone = PRICE_MILESTONES.find(milestone => 
      (currentPrice >= milestone && lastPrice < milestone) || // Pump case
      (currentPrice < milestone && lastPrice >= milestone)    // Dump case
    );

    if (currentMilestone && currentMilestone !== lastTriggeredMilestone) {
      const isPump = currentPrice > lastPrice;
      lastTriggeredMilestone = currentMilestone;
      const previousPrice = lastPrice;
      lastPrice = currentPrice;

      return {
        milestone: currentMilestone,
        price: currentPrice,
        isPump,
        previousPrice
      };
    }

    lastPrice = currentPrice;
    return null;
  } catch (error) {
    console.error('Price alert check error:', error);
    return null;
  }
}

function resetAlertState() {
  lastTriggeredMilestone = null;
  lastPrice = null;
}

module.exports = { checkPriceAlerts, resetAlertState };