# Contributing to Sentinel X

Thank you for your interest in contributing to Sentinel X! We welcome contributions from the community to help improve our security system for X Layer.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Reporting Issues](#reporting-issues)

## 🤝 Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/sentinel-x.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit your changes: `git commit -m "Add your feature"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Submit a pull request

## ⚙️ Development Setup

### Prerequisites
- Node.js 16+
- npm or yarn
- Git

### Installation
```bash
# Clone the repository
git clone https://github.com/sentinel-x/sentinel-x.git
cd sentinel-x

# Install dependencies
npm run setup

# Set up environment variables
cp skills/security-oracle-skill/.env.example skills/security-oracle-skill/.env
cp x-layer-arena/sentinel-x-dashboard/.env.example x-layer-arena/sentinel-x-dashboard/.env
cp agent-track/sentinel-x-agent/.env.example agent-track/sentinel-x-agent/.env
```

### Running Development Servers
```bash
# Run individual components
npm run dev:skill      # Security Oracle Skill
npm run dev:dashboard  # Sentinel X Dashboard
npm run dev:agent      # Autonomous Agent
```

## 📤 Submitting Changes

### Pull Request Process
1. Ensure any install or build dependencies are removed before the end of the layer when doing a build
2. Update the README.md with details of changes to the interface, if applicable
3. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent
4. Your Pull Request will be reviewed by maintainers, who may request changes

### Branch Naming Convention
- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical hotfixes
- `docs/` - Documentation improvements
- `refactor/` - Code refactoring
- `test/` - Adding or improving tests

## 📏 Coding Standards

### JavaScript/TypeScript
We follow standard JavaScript/TypeScript coding conventions:

- Use camelCase for variables and functions
- Use PascalCase for classes and constructors
- Use UPPER_CASE for constants
- Use meaningful variable and function names
- Comment your code where necessary
- Keep functions small and focused

### General Guidelines
- Write clean, readable code
- Follow the existing code style
- Use descriptive commit messages
- Keep commits focused and atomic
- Write unit tests for new functionality

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run specific module tests
npm run test:skill
npm run test:dashboard
npm run test:agent

# Run tests with coverage
npm run test:coverage
```

### Writing Tests
- Place test files in the `tests/` directory of each module
- Use Jest for testing framework
- Aim for >80% code coverage
- Test both happy paths and error cases
- Mock external dependencies where appropriate

## 📚 Documentation

### Inline Documentation
- Document all public functions and classes
- Use JSDoc-style comments
- Include parameter types and descriptions
- Include return value information
- Include example usage where appropriate

### Markdown Documentation
- Keep README files up to date
- Use clear headings and subheadings
- Include code examples
- Update table of contents when adding sections
- Proofread for grammar and clarity

## 🐛 Reporting Issues

### Before Submitting an Issue
- Check existing issues to avoid duplicates
- Ensure you're using the latest version
- Try to reproduce the issue consistently

### How to Submit an Issue
1. Use a clear and descriptive title
2. Describe the exact steps to reproduce the issue
3. Provide specific examples to demonstrate the issue
4. Include screenshots or animated GIFs if relevant
5. Include your environment details (OS, Node.js version, etc.)

### Issue Templates
- **Bug Report**: Use when you encounter a bug
- **Feature Request**: Use when you want to request a new feature
- **Documentation Improvement**: Use when you want to improve documentation

## 🎉 Recognition

Contributors will be recognized in our Hall of Fame and may be eligible for special recognition in future releases.

Thank you for contributing to Sentinel X!