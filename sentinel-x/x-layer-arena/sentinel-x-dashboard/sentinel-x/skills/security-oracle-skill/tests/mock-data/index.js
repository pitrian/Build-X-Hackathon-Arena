/**
 * Mock data for testing
 */

// Example contract addresses (these are real popular contracts for testing)
const mockContracts = {
  UNISWAP_ROUTER: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  WBTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  SUSHISWAP: '0xd9e1cE17f2641f24aE83600D0349C9446d42B5A2'
};

// Example risky contracts
const mockRiskyContracts = {
  HONEYPOT_TOKEN: '0x1deadf011deadf011deadf011deadf011deadf01', // Fake honeypot for testing
  MALICIOUS_CONTRACT: '0xbadbadbadbadbadbadbadbadbadbadbadbadbad1'
};

// Example wallets
const mockWallets = {
  USER_WALLET: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  EXCHANGE_WALLET: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948834C1'
};

module.exports = {
  mockContracts,
  mockRiskyContracts,
  mockWallets
};