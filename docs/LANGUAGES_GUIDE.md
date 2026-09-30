# Language-Specific Setup Guide

## Tier 1: Production-Ready Languages

### 🐍 Python (FastAPI)

**Installation:**
```bash
python3 --version  # Requires 3.8+
pip install -r backend/python/requirements.txt
```

**Run:**
```bash
cd backend/python
python main.py  # Runs on localhost:8000
```

**Key Libraries:**
- FastAPI: Web framework
- SQLAlchemy: ORM
- Pydantic: Data validation
- TensorFlow/PyTorch: ML

---

### ☕ Java (Spring Boot)

**Installation:**
```bash
java -version  # Requires JDK 11+
mvn --version  # Maven or
gradle --version  # Gradle
```

**Run:**
```bash
cd backend/java
mvn spring-boot:run
# Or with Gradle:
gradle bootRun
```

**Key Dependencies:**
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven/Gradle

---

### 🐹 Go (Gin/Echo)

**Installation:**
```bash
go version  # Requires 1.18+
go mod download
```

**Run:**
```bash
cd backend/go
go run main.go
```

**Key Libraries:**
- Gin: Web framework
- GORM: ORM
- Viper: Configuration

---

### 🦀 Rust (Actix-web)

**Installation:**
```bash
rustc --version  # Latest stable
cargo --version
```

**Run:**
```bash
cd backend/rust
cargo run
```

**Key Crates:**
- Actix-web: Web framework
- Diesel: ORM
- Tokio: Async runtime

---

### 🟢 Node.js (Express)

**Installation:**
```bash
node --version  # Requires 18+
npm --version
```

**Run:**
```bash
cd backend/nodejs
npm install
npm start
```

**Key Packages:**
- Express: Web framework
- Sequelize/Prisma: ORM
- Axios: HTTP client

---

## Tier 2: Secondary Support Languages

### 🔧 C

**Installation:**
```bash
gcc --version  # Or clang
make --version
```

**Compile & Run:**
```bash
cd backend/c
make
./app
```

---

### ⚙️ C++

**Installation:**
```bash
g++ --version  # Or clang++
cmake --version
```

**Build & Run:**
```bash
cd backend/cpp
mkdir build && cd build
cmake ..
make
./app
```

---

### 💜 PHP (Laravel)

**Installation:**
```bash
php --version  # Requires 8.0+
composer --version
```

**Run:**
```bash
cd backend/php
composer install
php artisan serve
```

---

### 🟠 Rust (Alternative - Rocket)

**Installation:**
```bash
rustup update
```

**Run:**
```bash
cd backend/rust-rocket
cargo run
```

---

### 🔵 C# (ASP.NET Core)

**Installation:**
```bash
dotnet --version  # Requires .NET 6+
```

**Run:**
```bash
cd backend/csharp
dotnet run
```

---

## Tier 3: Specialized Languages

### 🔴 R (Data Science)

**Installation:**
```bash
R --version
```

**Run:**
```bash
cd ai-labs/r
Rscript script.R
```

---

### 🟡 MATLAB (Scientific)

**Installation:**
```bash
matlab -version
```

**Run:**
```bash
matlab -r "run_script"
```

---

### 💜 Julia (Scientific Computing)

**Installation:**
```bash
julia --version  # Requires 1.0+
```

**Run:**
```bash
cd ai-labs/julia
julia script.jl
```

---

### 🔶 Swift (iOS/macOS)

**Installation:**
```bash
swift --version  # macOS or Linux
```

**Build & Run:**
```bash
cd libraries/swift
swift build
swift run
```

---

### 🎯 Kotlin (JVM)

**Installation:**
```bash
kotlin -version
```

**Run:**
```bash
cd backend/kotlin
kotlinc main.kt -include-runtime -d app.jar
java -jar app.jar
```

---

## Quick Reference Table

| Language | Version | Package Manager | Run Command |
|----------|---------|-----------------|-------------|
| Python | 3.8+ | pip | `python main.py` |
| Java | 11+ | Maven/Gradle | `mvn spring-boot:run` |
| Go | 1.18+ | go mod | `go run main.go` |
| Rust | Latest | cargo | `cargo run` |
| Node.js | 18+ | npm/yarn | `npm start` |
| PHP | 8.0+ | composer | `php artisan serve` |
| C# | .NET 6+ | dotnet | `dotnet run` |
| C | - | gcc/make | `make && ./app` |
| C++ | - | g++/cmake | `cmake && make && ./app` |
| Kotlin | Latest | kotlin | `kotlinc && java -jar` |
| Swift | Latest | swift | `swift run` |
| R | Latest | R | `Rscript script.R` |
| Julia | 1.0+ | julia | `julia script.jl` |
| Ruby | 2.7+ | bundler | `bundle exec rails` |
| Scala | 2.13+ | sbt | `sbt run` |

---

## Troubleshooting Common Issues

### "Command not found"
- Make sure language is installed: `[lang] --version`
- Add to PATH environment variable
- On macOS: Use `brew install [lang]`

### "Module/Package not found"
- Install package manager dependencies
- For Python: `pip install -r requirements.txt`
- For Node: `npm install`
- For Java: `mvn clean install`

### "Port already in use"
- Change port in configuration
- Kill existing process: `lsof -ti:8000 | xargs kill -9`
- Use different port: `PORT=8001 [command]`

---

For setup help, see [SETUP_GUIDE.md](SETUP_GUIDE.md).
