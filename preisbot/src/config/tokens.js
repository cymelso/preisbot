// Token configurations
const tokens = {
  pepu: {
    name: 'PEPU',
    coinGeckoId: 'pepe-unchained',
    contractAddress: process.env.PEPU_CONTRACT_ADDRESS
  },
  stars: {
    name: 'STARS',
    coinGeckoId: 'stargaze',
    contractAddress: null // Add if needed
  },
  // Add new tokens here following this format:
  // tokenSymbol: {
  //   name: 'TOKEN_NAME',
  //   coinGeckoId: 'coingecko-id',
  //   contractAddress: null // or contract address if needed
  // }
};

function getTokenConfig(symbol) {
  return tokens[symbol.toLowerCase()];
}

function isValidToken(symbol) {
  return !!getTokenConfig(symbol);
}

module.exports = {
  tokens,
  getTokenConfig,
  isValidToken
};