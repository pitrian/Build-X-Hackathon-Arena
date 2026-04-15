# Sentinel X Agent

Autonomous security agent for X Layer that scans new projects and reports security findings.

## Features

- **Project Scanner**: Continuously scans new projects on X Layer
- **Vulnerability Checker**: Checks for smart contract vulnerabilities
- **Market Movement Tracker**: Monitors unusual market activity
- **Automated Reporting**: Posts security reports to Moltbook and Twitter
- **Meaningful Transactions**: Executes transactions that demonstrate findings

## Installation

```bash
npm install
```

## Usage

```bash
# Start the agent
npm start

# Scan for new projects manually
npm run scan

# Run in development mode with auto-reload
npm run dev
```

## Agent Capabilities

### Scanning
The agent continuously monitors X Layer for:
- New smart contract deployments
- Token launches
- Unusual transaction patterns
- Market volatility events

### Reporting
When threats are detected, the agent can:
- Post detailed reports to Moltbook
- Tweet security alerts with hashtags
- Create GitHub issues for developer awareness
- Send notifications via webhook

### Execution
The agent can perform meaningful on-chain actions:
- Execute test transactions to verify vulnerabilities
- Approve/revoke token permissions based on safety
- Swap tokens as proof-of-concept for protection mechanisms

## Configuration

Create a `.env` file with your API keys:

```
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret
MOLTBOOK_API_KEY=your_moltbook_api_key
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

MIT