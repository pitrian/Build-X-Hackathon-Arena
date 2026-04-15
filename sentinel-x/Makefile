# Makefile for Sentinel X

# Variables
PROJECT_NAME = sentinel-x
NODE_VERSION = 16
CURRENT_DIR = $(shell pwd)

# Colors
RED = \033[0;31m
GREEN = \033[0;32m
YELLOW = \033[1;33m
NC = \033[0m # No Color

# Help target
.PHONY: help
help: ## Display this help screen
	@echo "$(GREEN)Sentinel X Makefile$(NC)"
	@echo ""
	@echo "$(YELLOW)Usage:$(NC)"
	@echo "  make [target]"
	@echo ""
	@echo "$(YELLOW)General targets:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Install all dependencies
.PHONY: install
install: ## Install all project dependencies
	@echo "$(GREEN)Installing all dependencies...$(NC)"
	npm run setup
	@echo "$(GREEN)Installation complete!$(NC)"

# Setup environment files
.PHONY: setup-env
setup-env: ## Setup environment files from examples
	@echo "$(GREEN)Setting up environment files...$(NC)"
	find . -name ".env.example" -exec sh -c 'cp "$$1" "$${1%.example}"' _ {} \;
	@echo "$(YELLOW)Please update the .env files with your actual credentials$(NC)"

# Run development servers
.PHONY: dev
dev: ## Start all development servers
	@echo "$(GREEN)Starting development servers...$(NC)"
	@echo "$(YELLOW)Opening terminals for each service...$(NC)"
	@echo "Please run these commands in separate terminals:"
	@echo "  npm run dev:skill"
	@echo "  npm run dev:dashboard"
	@echo "  npm run dev:agent"

.PHONY: dev-skill
dev-skill: ## Start Security Oracle Skill development server
	@echo "$(GREEN)Starting Security Oracle Skill development server...$(NC)"
	cd skills/security-oracle-skill && npm run dev

.PHONY: dev-dashboard
dev-dashboard: ## Start Sentinel X Dashboard development server
	@echo "$(GREEN)Starting Sentinel X Dashboard development server...$(NC)"
	cd x-layer-arena/sentinel-x-dashboard && npm run dev

.PHONY: dev-agent
dev-agent: ## Start Autonomous Agent development server
	@echo "$(GREEN)Starting Autonomous Agent development server...$(NC)"
	cd agent-track/sentinel-x-agent && npm run dev

# Run tests
.PHONY: test
test: ## Run all tests
	@echo "$(GREEN)Running all tests...$(NC)"
	npm test

.PHONY: test-skill
test-skill: ## Run Security Oracle Skill tests
	@echo "$(GREEN)Running Security Oracle Skill tests...$(NC)"
	cd skills/security-oracle-skill && npm test

.PHONY: test-dashboard
test-dashboard: ## Run Sentinel X Dashboard tests
	@echo "$(GREEN)Running Sentinel X Dashboard tests...$(NC)"
	cd x-layer-arena/sentinel-x-dashboard && npm test

.PHONY: test-agent
test-agent: ## Run Autonomous Agent tests
	@echo "$(GREEN)Running Autonomous Agent tests...$(NC)"
	cd agent-track/sentinel-x-agent && npm test

# Build for production
.PHONY: build
build: ## Build all components for production
	@echo "$(GREEN)Building all components for production...$(NC)"
	cd x-layer-arena/sentinel-x-dashboard && npm run build
	@echo "$(GREEN)Build complete!$(NC)"

# Run production
.PHONY: start
start: ## Start production servers
	@echo "$(GREEN)Starting production servers...$(NC)"
	cd agent-track/sentinel-x-agent && npm start

# Clean build artifacts
.PHONY: clean
clean: ## Clean build artifacts and node_modules
	@echo "$(GREEN)Cleaning build artifacts...$(NC)"
	rm -rf **/node_modules
	rm -rf **/dist
	rm -rf **/.next
	rm -rf **/out
	rm -rf **/*.log
	@echo "$(GREEN)Clean complete!$(NC)"

# Update dependencies
.PHONY: update
update: ## Update all dependencies
	@echo "$(GREEN)Updating dependencies...$(NC)"
	npm update
	cd skills/security-oracle-skill && npm update
	cd x-layer-arena/sentinel-x-dashboard && npm update
	cd agent-track/sentinel-x-agent && npm update
	@echo "$(GREEN)Dependencies updated!$(NC)"

# Audit dependencies
.PHONY: audit
audit: ## Audit dependencies for security vulnerabilities
	@echo "$(GREEN)Auditing dependencies...$(NC)"
	npm audit
	cd skills/security-oracle-skill && npm audit
	cd x-layer-arena/sentinel-x-dashboard && npm audit
	cd agent-track/sentinel-x-agent && npm audit

# Docker related targets
.PHONY: docker-build
docker-build: ## Build Docker images for all services
	@echo "$(GREEN)Building Docker images...$(NC)"
	@echo "Docker build targets not yet implemented"
	@echo "$(YELLOW)Please implement Docker files for each service$(NC)"

.PHONY: docker-run
docker-run: ## Run services using Docker Compose
	@echo "$(GREEN)Running services with Docker Compose...$(NC)"
	@echo "Docker Compose targets not yet implemented"
	@echo "$(YELLOW)Please create docker-compose.yml file$(NC)"

# Deployment targets
.PHONY: deploy-dashboard
deploy-dashboard: ## Deploy dashboard to Vercel
	@echo "$(GREEN)Deploying dashboard to Vercel...$(NC)"
	cd x-layer-arena/sentinel-x-dashboard && npx vercel --prod

.PHONY: deploy-agent
deploy-agent: ## Deploy agent to cloud server
	@echo "$(GREEN)Deploying agent to cloud server...$(NC)"
	@echo "$(YELLOW)Please configure your cloud deployment settings$(NC)"

# Documentation
.PHONY: docs
docs: ## Generate documentation
	@echo "$(GREEN)Generating documentation...$(NC)"
	@echo "Documentation generation not yet implemented"
	@echo "$(YELLOW)Please add documentation generation tools$(NC)"

# Linting
.PHONY: lint
lint: ## Lint all code
	@echo "$(GREEN)Linting code...$(NC)"
	@echo "Linting targets not yet implemented"
	@echo "$(YELLOW)Please add ESLint configuration$(NC)"

# Status checks
.PHONY: status
status: ## Check status of all services
	@echo "$(GREEN)Checking service status...$(NC)"
	@echo "Service status check not yet implemented"
	@echo "$(YELLOW)Please implement status checking$(NC)"

# Backup project
.PHONY: backup
backup: ## Create backup of project
	@echo "$(GREEN)Creating project backup...$(NC)"
	tar -czf sentinel-x-backup-$$(date +%Y%m%d-%H%M%S).tar.gz \
		--exclude=node_modules \
		--exclude=.git \
		--exclude=*.log \
		.
	@echo "$(GREEN)Backup created successfully!$(NC)"

# Print project structure
.PHONY: tree
tree: ## Print project structure
	@echo "$(GREEN)Project structure:$(NC)"
	tree -I "node_modules|.git|*.log|dist|out|.next" -L 3

# System requirements check
.PHONY: check-requirements
check-requirements: ## Check system requirements
	@echo "$(GREEN)Checking system requirements...$(NC)"
	@if [ -x "$$(command -v node)" ]; then \
		echo "$(GREEN)✓ Node.js installed:$$(node --version)$(NC)"; \
	else \
		echo "$(RED)✗ Node.js not found$(NC)"; \
	fi
	@if [ -x "$$(command -v npm)" ]; then \
		echo "$(GREEN)✓ npm installed:$$(npm --version)$(NC)"; \
	else \
		echo "$(RED)✗ npm not found$(NC)"; \
	fi
	@echo "$(GREEN)Requirement check complete!$(NC)"