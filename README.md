# Build-X-Hackathon-Arena
# 🛡️ Sentinel X - AI-Powered Security for X Layer

<p align="center">
  <img src="https://raw.githubusercontent.com/sentinel-x/sentinel-x/main/docs/banner.png" alt="Sentinel X Banner" width="100%" />
</p>

<p align="center">
  <strong>Autonomous Security Agent & DeFi Protection System on X Layer</strong>
</p>

---

## 🎯 TỔNG QUAN DỰ ÁN

**Sentinel X** is an intelligent security system designed specifically for the X Layer ecosystem. It combines AI-powered threat detection with automated protection mechanisms to safeguard crypto assets.

### Vấn đề chúng tôi giải quyết:
- 🔴 **Rug pulls** và **honeypot tokens** ngày càng phổ biến
- 🟡 **Smart contract vulnerabilities** khó phát hiện thủ công
- 🟢 **Thiếu công cụ bảo mật tự động** cho người dùng thường

### Giải pháp của Sentinel X:
- ✅ **AI Risk Analysis** - Phân tích rủi ro tự động
- ✅ **Auto-Protection** - Tự động swap khi phát hiện threat
- ✅ **Real-time Monitoring** - Giám sát 24/7
- ✅ **Autonomous Agent** - Tự vận hành không cần giám sát

---

## 🏗️ KIẾN TRÚC HỆ THỐNG

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SENTINEL X ECOSYSTEM                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────┐    ┌──────────────────┐                  │
│  │ Security Oracle   │    │    Dashboard     │                  │
│  │    Skill         │◄───►│    (Web App)     │                  │
│  │ (Reusable API)    │    │   (User UI)       │                  │
│  └──────────────────┘    └──────────────────┘                  │
│           ▲                         ▲                               │
│           │                         │                               │
│           └───────────┬─────────────┘                               │
│                       │                                         │
│                       ▼                                         │
│  ┌──────────────────────────────────────────────────────┐       │
│  │         Sentinel X Autonomous Agent                  │       │
│  │  • Scans X Layer for threats                     │       │
│  │  • Detects vulnerabilities                   │       │
│  │  • Auto-reports to Moltbook/Twitter       │       │
│  │  • Executes protection transactions       │       │
│  └──────────────────────────────────────────────────────┘       │
│                                                                     │
└────────────────────────────────────────────────────────────────��┘
```

-------



## 📋 3 SUB-PROJECTS

### 1️⃣ Skills Arena - Security Oracle Skill

**Mục tiêu**: Tạo module kỹ năng bảo mật có thể tái sử dụng

**Chức năng chính**:

| Function | Mô tả |
|----------|-------|
| `analyzeContract()` | Phân tích smart contract, trả về risk score 0-100 |
| `scanToken()` | Quét token, phát hiện honeypot/rugpull |
| `monitorWallet()` | Giám sát ví theo thời gian thực |
| `assessAsset()` | Đánh giá tổng hợp contract hoặc token |

**Risk Scoring**:
```
🔴 HIGH (70-100): AVOID - Tránh xa
🟡 MEDIUM (40-69): CAUTION - Thận trọng  
🟢 LOW (0-39): SAFE - An toàn
```

**Sử dụng**:
```javascript
const SecurityOracle = require('security-oracle-skill');

// Phân tích contract
const result = await SecurityOracle.analyzeContract("0x...");
console.log(`Risk: ${result.score}/100 - ${result.recommendation}`);

// Quét token
const tokenRisk = await SecurityOracle.scanToken("0x...");
if (tokenRisk.riskScore > 70) {
  console.log("⚠️ Token nguy hiểm!");
}
```

**Cài đặt**:
```bash
cd skills/security-oracle-skill
npm install
npm start
```

---

### 2️⃣ X Layer Arena - Sentinel X Dashboard

**Mục tiêu**: Giao diện web cho người dùng quản lý ví bảo mật

**Chức năng chính**:

| Feature | Mô tả |
|--------|-------|
| **Agentic Wallet** | Tạo ví với protection tự động |
| **Protected Assets** | Hiển thị tài sản được bảo vệ |
| **Security Alerts** | Cảnh báo real-time |
| **Auto-Swap** | Tự động swap token nguy hiểm sang USDT |
| **Transaction History** | Lịch sử giao dịch bảo vệ |

**Giao diện**:
- 🎨 Dark theme với animations
- 📊 Dashboard với metrics
- 🚨 Alerts panel trực quan
- 💰 Asset list với status

**Cài đặt**:
```bash
cd x-layer-arena/sentinel-x-dashboard
npm install
npm run dev
```

**Truy cập**: http://localhost:3000

---

### 3️⃣ Agent Track - Sentinel X Agent

**Mục tiêu**: Agent tự động quét và báo cáo bảo mật

**Chức năng chính**:

| Scanner | Mô tả |
|---------|-------|
| **NewProjectScanner** | Quét dự án mới trên X Layer |
| **VulnerabilityChecker** | Kiểm tra smart contract vulnerabilities |
| **MarketMovementTracker** | Theo dõi biến động thị trường |

| Reporter | Mô tả |
|----------|-------|
| **MoltbookReporter** | Đăng báo cáo lên Moltbook |
| **TwitterReporter** | Đăng Twitter với hashtags |

| Executor | Mô tả |
|---------|-------|
| **TransactionExecutor** | Thực hiện giao dịch bảo vệ |

**Agent Behavior**:
```
Every 10 minutes:
  1. Scan for new projects ✓
  2. Check vulnerabilities ✓
  3. Track market movements ✓
  4. Process findings ✓
  5. Report to Moltbook/Twitter ✓
  6. Execute transactions (if needed) ✓
```

**Cài đặt**:
```bash
cd agent-track/sentinel-x-agent
npm install

# Option 1: Chạy demo mode (không cần blockchain)
npm start

# Option 2: Kết nối X Layer thật
# Edit .env with your RPC URL và private key
npm start
```

**Output khi chạy**:
```
🚀 Sentinel X Agent started
📊 Scanning X Layer for security threats...

🔍 Starting scan cycle
  Found 3 new projects
  Found 2 vulnerabilities
  Found 1 market movement

📝 Processing 6 findings...
  📋 Vulnerability: REENTRANCY → Reported ✓
  📋 Market: PRICE VOLATILITY → Reported ✓

✅ Scan cycle completed
```

---

## 🚀 CÁCH CHẠY DỰ ÁN

### Yêu cầu
- Node.js 16+
- npm hoặc yarn

### Setup toàn bộ

```bash
# Clone repository
git clone https://github.com/sentinel-x/sentinel-x.git
cd sentinel-x

# Cài tất cả dependencies
npm run setup

# Hoặc cài từng module:

# Terminal 1: Security Oracle Skill
cd skills/security-oracle-skill
npm install
npm start

# Terminal 2: Dashboard  
cd x-layer-arena/sentinel-x-dashboard
npm install
npm run dev

# Terminal 3: Agent
cd agent-track/sentinel-x-agent
npm install
npm start
```

---

## 📁 CẤU TRÚC THƯ MỤC

```
sentinel-x/
├── skills/
│   └── security-oracle-skill/
│       ├── src/
│       │   ├── analyzers/       # Contract, Token, Transaction analyzers
│       │   ├── utils/          # Onchain reader, Risk calculator
│       │   └── index.js        # Entry point
│       ├── tests/
│       └── package.json
│
├── x-layer-arena/
│   └── sentinel-x-dashboard/
│       ├── app/               # Next.js app directory
│       │   ├── page.jsx        # Main dashboard page
│       │   ├── layout.jsx      # Layout
│       │   └── globals.css     # Styles
│       ├── services/           # Wallet, Security, Uniswap services
│       └── package.json
│
├── agent-track/
│   └── sentinel-x-agent/
│       ├── src/
│       │   ├── scanners/     # Project, Vulnerability, Market scanners
│       │   ├── reporters/    # Moltbook, Twitter reporters
│       │   ├── executors/     # Transaction executor
│       │   └── index.js      # Main agent loop
│       ├── plugins/          # OKX plugin
│       ├── configs/         # Agent configuration
│       └── package.json
│
├── tests/                    # Integration tests
├── package.json             # Root workspace config
├── Makefile                # Utility commands
├── README.md
└── LICENSE
```

---

## 🛠️ CÔNG NGHỆ SỬ DỤNG

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js 14, React 18, CSS-in-JS |
| **Blockchain** | Ethers.js, X Layer RPC |
| **Backend** | Node.js, Autonomous Agent Loop |
| **Security Analysis** | On-chain data parsing, Pattern matching |
| **Reporting** | Moltbook API, Twitter API |

---

## 📊 METRICS & OUTPUTS

### Demo Outputs:
- ✅ Security Oracle: Risk scores (0-100) for contracts/tokens
- ✅ Dashboard: Protected assets, alerts, transaction history
- ✅ Agent: Scan results, reports, executed transactions

### Transactions:
```
✅ Transaction: 0x357af63d40ad9 (Protection executed)
✅ Report posted to Moltbook: Security Alert: REENTRANCY
✅ Report posted to Twitter: #XLayer #Security
```

---

## 📝 SUBMISSION CHECKLIST

### ✅ Skills Arena (Module)
- [x] Security Oracle Skill với functions:
  - [x] `analyzeContract()`
  - [x] `scanToken()`  
  - [x] `monitorWallet()`
- [x] Reusable - có thể import vào project khác
- [x] Có README documentation

### ✅ X Layer Arena (App)
- [x] Dashboard web với Next.js
- [x] Connect wallet functionality
- [x] Protected assets display
- [x] Security alerts panel
- [x] Auto-swap integration (Uniswap)
- [x] Demo video có thể quay

### ✅ Agent Track (Agent)
- [x] Autonomous agent chạy loop
- [x] Scanner components (3 scanners)
- [x] Reporter components (Moltbook + Twitter)
- [x] Transaction executor
- [x] Tạo transactions (demo mode hoặc thật)
- [x] Kết nối OKX Plugin được

---

## 🔗 LINKS & RESOURCES

- **Website**: https://sentinel-x.io
- **Documentation**: https://docs.sentinel-x.io
- **GitHub**: https://github.com/sentinel-x/sentinel-x
- **X Layer**: https://xlayer.xyz

---

## 📄 LICENSE

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

## 🙏 ACKNOWLEDGMENTS

- [X Layer](https://xlayer.xyz) - Blockchain infrastructure
- [OKX](https://okx.com) - Agent Track partnership  
- [OpenZeppelin](https://openzeppelin.com) - Smart contract standards
- [Uniswap](https://uniswap.org) - DEX integration reference

---

<p align="center">
  <strong>🛡️ Sentinel X - Protecting Your Assets with AI 🛡️</strong>
  <br />
  <em>Built for X Layer Hackathon 2026</em>
</p>
