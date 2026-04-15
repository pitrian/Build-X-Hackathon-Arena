# Sentinel X - AI-Powered Security for X Layer

<p align="center">
  <img src="./docs/banner.png" alt="Sentinel X Banner" width="100%" />
</p>

<p align="center">
  <strong>An intelligent security system protecting your crypto assets on X Layer</strong>
</p>

<p align="center">
  <a href="#skills-arena">Skills Arena</a> •
  <a href="#x-layer-arena">X Layer Arena</a> •
  <a href="#agent-track">Agent Track</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## 🎯 About Sentinel X

Sentinel X is an AI-powered security system designed specifically for the X Layer ecosystem. It combines three core components to provide comprehensive protection for your crypto assets:

1. **Security Oracle Skill** - A reusable skill for analyzing smart contracts and tokens
2. **Sentinel X Dashboard** - A user-friendly web interface for managing your protected wallet
3. **Autonomous Agent** - A self-operating agent that scans X Layer and reports threats

## 🏗️ Architecture

```
sentinel-x/
├── skills/                 # Reusable security skills
│   └── security-oracle-skill/
├── x-layer-arena/          # User-facing applications
│   └── sentinel-x-dashboard/
└── agent-track/            # Autonomous agents
    └── sentinel-x-agent/
```

## 🎯 Skills Arena (Reusable Security Skill)

The **Security-Oracle-Skill** is a standalone module that can be imported into any project:

### Features
- Contract Vulnerability Detection
- Token Risk Scoring (0-100)
- Real-time Wallet Monitoring
- Integration with Onchain OS

### Usage
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

### Installation
```bash
cd skills/security-oracle-skill
npm install
npm test
```

## 🚀 X Layer Arena (User Application)

The **Sentinel X Dashboard** provides a web interface for users to:

### Features
- **Agentic Wallet Creation** - Create wallet with built-in security protection
- **Real-time Monitoring** - Watch your wallet for suspicious activities
- **Automatic Protection** - Auto-swap dangerous tokens to USDT/OKB
- **Risk Alerts** - Get notified when tokens pose security risks
- **Transaction History** - View all protected transactions

### Technologies
- Next.js 13+ with App Router
- Tailwind CSS for styling
- Ethers.js for blockchain interaction
- Uniswap integration for token swaps

### Quick Start
```bash
cd x-layer-arena/sentinel-x-dashboard
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the dashboard.

## 🤖 Agent Track (Autonomous Agent)

The **Sentinel X Agent** operates independently to:

### Capabilities
- **Project Scanner** - Continuously scans new projects on X Layer
- **Vulnerability Checker** - Checks for smart contract vulnerabilities
- **Market Movement Tracker** - Monitors unusual market activity
- **Automated Reporting** - Posts security reports to Moltbook and Twitter
- **Meaningful Transactions** - Executes transactions that demonstrate findings

### Integration Features
- OKX Exchange Plugin for enhanced functionality
- Twitter API integration for social reporting
- Moltbook API integration for professional reporting

### Running the Agent
```bash
cd agent-track/sentinel-x-agent
npm install
npm start
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- X Layer Testnet account (for testing)

### Setup
```bash
# Clone the repository
git clone https://github.com/sentinel-x/sentinel-x.git
cd sentinel-x

# Install all dependencies
npm run setup

# Set up environment variables (copy .env.example files and fill in your keys)
find . -name ".env.example" -exec sh -c 'cp "$1" "${1%.example}"' _ {} \;
```

### Development
```bash
# Run individual components
npm run dev:skill
npm run dev:dashboard
npm run dev:agent

# Run tests
npm test
npm run test:skill
npm run test:dashboard
npm run test:agent
```

## 📁 Project Structure

```
sentinel-x/
├── skills/
│   └── security-oracle-skill/
│       ├── src/
│       │   ├── analyzers/
│       │   ├── utils/
│       │   └── index.js
│       ├── tests/
│       ├── package.json
│       └── README.md
├── x-layer-arena/
│   └── sentinel-x-dashboard/
│       ├── app/
│       ├── components/
│       ├── services/
│       ├── public/
│       └── package.json
├── agent-track/
│   └── sentinel-x-agent/
│       ├── src/
│       │   ├── scanners/
│       │   ├── reporters/
│       │   ├── executors/
│       │   └── index.js
│       ├── plugins/
│       ├── configs/
│       ├── tests/
│       ├── package.json
│       └── README.md
├── tests/
├── package.json
└── README.md
```

## 🧪 Testing

Each module has its own test suite:

```bash
# Run all tests
npm test

# Run specific module tests
npm run test:skill
npm run test:dashboard
npm run test:agent
```

## 📈 Submission Tracks

### Skills Arena
Submit the `security-oracle-skill` module to GitHub with comprehensive documentation.

### X Layer Arena
Deploy the `sentinel-x-dashboard` and submit the Google Form with demo video.

### Agent Track
Run the `sentinel-x-agent` with Moltbook plugin and showcase active transactions.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to X Layer for the excellent blockchain infrastructure
- Inspired by the need for better DeFi security solutions
- Built with ❤️ for the X Layer Hackathon

---

<p align="center">
  Made with ❤️ for X Layer
</p>