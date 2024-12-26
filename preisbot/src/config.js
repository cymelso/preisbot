require('dotenv').config();

// Use process.env with fallbacks for all environment variables
module.exports = {
  telegramToken: process.env.TELEGRAM_BOT_TOKEN || '',
  etherscanApiKey: process.env.ETHERSCAN_API_KEY || '',
  pepuAddress: process.env.PEPU_CONTRACT_ADDRESS || '',
  coinGeckoId: 'pepe-unchained',
  port: parseInt(process.env.PORT || '3000', 10)  // Ensure PORT is parsed as integer
};