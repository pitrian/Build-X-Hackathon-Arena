# Sentinel X Dashboard

Protect your crypto assets on X Layer with automated security monitoring.

## Features

- **Agentic Wallet Creation**: Create wallet with built-in security protection
- **Real-time Monitoring**: Watch your wallet for suspicious activities
- **Automatic Protection**: Auto-swap dangerous tokens to USDT/OKB
- **Risk Alerts**: Get notified when tokens pose security risks
- **Transaction History**: View all protected transactions

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard.

## Project Structure

```
sentinel-x-dashboard/
├── app/                # Next.js 13+ app directory
│   ├── api/           # API routes
│   ├── components/    # React components
│   ├── pages/         # Page components
│   ├── services/      # Service integrations
│   └── utils/         # Utility functions
├── public/            # Static assets
├── styles/            # CSS and Tailwind config
└── services/          # External service connectors
```

## Key Components

### Wallet Protection Service
Automatically monitors your wallet and protects assets:
- Detects rug pulls and honeypots
- Swaps dangerous tokens to stablecoins
- Alerts on suspicious contract interactions

### Security Oracle Integration
Connects to Security-Oracle-Skill for real-time risk assessment:
```javascript
import { SecurityOracle } from 'security-oracle-skill';

const riskScore = await SecurityOracle.scanToken(tokenAddress);
if (riskScore > 70) {
  // Automatically swap to USDT
  await swapToStablecoin(tokenAddress);
}
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.