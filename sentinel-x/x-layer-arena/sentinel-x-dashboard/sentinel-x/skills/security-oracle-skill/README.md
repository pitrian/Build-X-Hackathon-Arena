# Security Oracle Skill

A reusable skill for analyzing smart contracts and tokens on X Layer to assess security risks.

## Features

- Contract Vulnerability Detection
- Token Risk Scoring (0-100)
- Real-time Wallet Monitoring
- Integration with Onchain OS

## Installation

```bash
npm install
```

## Usage

```javascript
const SecurityOracle = require('security-oracle-skill');

// Analyze a smart contract
const riskScore = await SecurityOracle.analyzeContract("0x...");

// Scan a token
const tokenRisk = await SecurityOracle.scanToken("0x...");

// Monitor a wallet
SecurityOracle.monitorWallet("0x...", (alert) => {
  console.log("Security Alert:", alert);
});
```

## API Reference

### analyzeContract(contractAddress)
Analyzes a smart contract for vulnerabilities.

Returns: `{ score: 0-100, vulnerabilities: [], recommendation: "SAFE/WARNING/DANGER" }`

### scanToken(tokenAddress)
Scans a token for risks including:
- Mint authority
- Liquidity distribution
- Holder concentration
- Trading restrictions

Returns: `{ riskScore: 0-100, factors: [], isHoneypot: boolean }`

### monitorWallet(walletAddress, callback)
Monitors wallet transactions in real-time and alerts on suspicious activity.

Callback receives: `{ type: "RISK_DETECTED", details: {}, severity: "LOW/MEDIUM/HIGH" }`

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

MIT