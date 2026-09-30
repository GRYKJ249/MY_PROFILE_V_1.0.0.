# Setup Guide - GRY KJ Mega Developer Suite

## Prerequisites

Make sure you have the following installed:

### Required
- **Git** (for version control)
- **Node.js** (v18+) and npm
- **Python** (v3.8+) and pip

### Optional (based on languages you want to use)
- **Java** (JDK 11+) and Maven/Gradle
- **Go** (v1.18+)
- **Rust** (latest stable)
- **PHP** (v8.0+)
- **Docker** and **Docker Compose**

---

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/ssdd92555-ship-it/MY_PROFILE_V_1.0.0.git
cd MY_PROFILE_V_1.0.0
```

### 2. Switch to Development Branch

```bash
git checkout dev/mega-suite-expansion
```

### 3. Run Setup Script

```bash
# Make script executable
chmod +x scripts/setup.sh

# Run setup
bash scripts/setup.sh
```

### 4. Install Frontend Dependencies

```bash
npm install
```

### 5. Setup Python Backend

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\\Scripts\\activate

# Install dependencies
pip install -r backend/python/requirements.txt
```

### 6. Create Environment File

```bash
cp .env.example .env
# Edit .env with your configuration
```

---

## Running the Project

### Development Mode

#### Frontend
```bash
npm start
# Opens http://localhost:3000
```

#### Python Backend
```bash
cd backend/python
python main.py
# API runs on http://localhost:8000
```

#### Using Docker
```bash
docker-compose up -d
```

---

## Project Structure Overview

```
MY_PROFILE_V_1.0.0/
├── frontend/              # React/HTML/CSS UI
├── backend/
│   ├── python/           # FastAPI
│   ├── java/             # Spring Boot
│   ├── go/               # Gin/Echo
│   └── ...               # Other languages
├── cli-tools/            # Command line utilities
├── ai-labs/              # ML/AI modules
├── security/             # Security tools
├── database/             # SQL schemas
├── docker/               # Docker configs
├── docs/                 # Documentation
├── tests/                # Test suites
└── scripts/              # Utility scripts
```

---

## Troubleshooting

### Issue: Python dependencies not installing

```bash
# Try upgrading pip
pip install --upgrade pip

# Then reinstall requirements
pip install -r backend/python/requirements.txt
```

### Issue: Port already in use

```bash
# Change port in backend/python/main.py or use:
PORT=8001 python main.py
```

### Issue: Git branch not found

```bash
# Fetch latest branches
git fetch origin

# Then checkout
git checkout dev/mega-suite-expansion
```

---

## Next Steps

1. Read [ARCHITECTURE.md](ARCHITECTURE.md) for system design
2. Check [LANGUAGES_GUIDE.md](LANGUAGES_GUIDE.md) for language-specific setup
3. Review [API_REFERENCE.md](API_REFERENCE.md) for API endpoints
4. Start contributing! See [CONTRIBUTING.md](../CONTRIBUTING.md)

---

For additional help, open an issue on GitHub.
