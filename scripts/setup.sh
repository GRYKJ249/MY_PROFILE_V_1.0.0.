#!/bin/bash

# GRY KJ Mega Developer Suite - Setup Script
# This script checks for required tools and sets up the development environment

echo "🚀 Setting up GRY KJ Mega Developer Suite..."
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check functions
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✓${NC} $2 found: $($1 --version 2>&1 | head -n1)"
        return 0
    else
        echo -e "${RED}✗${NC} $2 not found. Install from $3"
        return 1
    fi
}

echo "📋 Checking prerequisites..."
echo ""

# Required tools
required_count=0
installed_count=0

if check_command "git" "Git" "https://git-scm.com"; then
    ((installed_count++))
fi
((required_count++))

if check_command "node" "Node.js" "https://nodejs.org"; then
    ((installed_count++))
fi
((required_count++))

if check_command "npm" "npm" "https://www.npmjs.com"; then
    ((installed_count++))
fi
((required_count++))

if check_command "python3" "Python" "https://www.python.org"; then
    ((installed_count++))
fi
((required_count++))

echo ""
echo "Optional tools (for multi-language support):"
echo ""

check_command "java" "Java" "https://www.java.com" || true
check_command "go" "Go" "https://golang.org" || true
check_command "rustc" "Rust" "https://www.rust-lang.org" || true
check_command "php" "PHP" "https://www.php.net" || true
check_command "ruby" "Ruby" "https://www.ruby-lang.org" || true

echo ""
echo "📦 Installing Node.js dependencies..."
npm install 2>&1 | tail -n 3

echo ""
echo "🐍 Setting up Python virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo -e "${GREEN}✓${NC} Virtual environment created"
else
    echo -e "${YELLOW}!${NC} Virtual environment already exists"
fi

echo ""
echo "Creating project directories..."
mkdir -p backend/{python,java,go,rust,php,nodejs,csharp,kotlin,ruby,scala}
mkdir -p cli-tools/{python,go,rust,javascript,shell}
mkdir -p ai-labs/{python,r,matlab,julia}
mkdir -p security/{encryption,authentication,scanning,testing}
mkdir -p database/{sql,migrations,seeds}
mkdir -p libraries/{python,cpp,swift,dart,elixir,haskell}
mkdir -p docker kubernetes terraform
mkdir -p tests/{unit,integration,e2e}
mkdir -p logs

echo -e "${GREEN}✓${NC} Project directories created"

echo ""
echo "📝 Setup Summary:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Required Tools: $installed_count/$required_count installed"
echo ""

if [ $installed_count -eq $required_count ]; then
    echo -e "${GREEN}✅ Setup complete!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Activate Python venv:"
    echo "   source venv/bin/activate  # macOS/Linux"
    echo "   venv\\\\Scripts\\\\activate  # Windows"
    echo ""
    echo "2. Install Python dependencies:"
    echo "   pip install -r backend/python/requirements.txt"
    echo ""
    echo "3. Start development:"
    echo "   npm start           # Frontend"
    echo "   python main.py      # Python backend"
    echo ""
    echo "📖 Read SETUP_GUIDE.md for detailed instructions"
else
    echo -e "${YELLOW}⚠️  Some required tools are missing${NC}"
    echo "Please install the missing tools and run setup.sh again"
    exit 1
fi

echo ""
echo "Happy coding! 🚀"
