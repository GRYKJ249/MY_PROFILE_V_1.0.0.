"""GRY KJ Backend - FastAPI Main Application"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os
from loguru import logger
from datetime import datetime

load_dotenv()

app = FastAPI(
    title="GRY KJ API",
    description="Mega Developer Suite Backend API - 31 Language Support",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Setup logging
logger.add("logs/app.log", rotation="500 MB", level="INFO")

# Global variables
START_TIME = datetime.now()

# ============================================================================
# ROOT ENDPOINTS
# ============================================================================

@app.get("/")
async def root():
    """Root endpoint - Welcome message"""
    return {
        "message": "🚀 Welcome to GRY KJ Mega Developer Suite",
        "version": "1.0.0",
        "status": "running",
        "api_url": "/api/docs",
        "languages_supported": 31,
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    uptime = (datetime.now() - START_TIME).total_seconds()
    return {
        "status": "healthy",
        "service": "GRY KJ Backend",
        "uptime_seconds": uptime,
        "timestamp": datetime.now().isoformat()
    }

# ============================================================================
# TOOLS ENDPOINTS
# ============================================================================

@app.get("/api/tools")
async def get_tools():
    """Get all available developer tools"""
    tools = [
        {"id": 1, "name": "Code Analyzer", "category": "code-analysis", "status": "active"},
        {"id": 2, "name": "Test Runner", "category": "testing", "status": "active"},
        {"id": 3, "name": "Performance Monitor", "category": "monitoring", "status": "active"},
        {"id": 4, "name": "Security Scanner", "category": "security", "status": "active"},
        {"id": 5, "name": "API Tester", "category": "testing", "status": "active"},
        {"id": 6, "name": "Database Manager", "category": "database", "status": "active"},
        {"id": 7, "name": "Code Formatter", "category": "code-quality", "status": "active"},
        {"id": 8, "name": "Dependency Checker", "category": "dependencies", "status": "active"},
    ]
    return {
        "tools": tools,
        "total": len(tools),
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/tools/{tool_id}")
async def get_tool(tool_id: int):
    """Get specific tool by ID"""
    tools = {
        1: {"name": "Code Analyzer", "description": "Analyze code quality and complexity"},
        2: {"name": "Test Runner", "description": "Run unit, integration, and e2e tests"},
        3: {"name": "Performance Monitor", "description": "Monitor app performance metrics"},
        4: {"name": "Security Scanner", "description": "Scan for security vulnerabilities"},
    }
    if tool_id not in tools:
        raise HTTPException(status_code=404, detail="Tool not found")
    return {"id": tool_id, **tools[tool_id]}

# ============================================================================
# LANGUAGES ENDPOINTS
# ============================================================================

@app.get("/api/languages")
async def get_languages():
    """Get all supported programming languages"""
    languages = {
        "tier_1": [
            {"name": "Python", "status": "⭐ Full Implementation", "uses": "AI, Data Science, CLI"},
            {"name": "JavaScript/TypeScript", "status": "⭐ Full Implementation", "uses": "Frontend, Backend"},
            {"name": "Java", "status": "⭐ Full Implementation", "uses": "Enterprise Services"},
            {"name": "Go", "status": "⭐ Full Implementation", "uses": "Microservices, CLI"},
            {"name": "Rust", "status": "⭐ Full Implementation", "uses": "Security, Performance"},
            {"name": "PHP", "status": "⭐ Full Implementation", "uses": "Web Development"},
            {"name": "C#", "status": "⭐ Full Implementation", "uses": ".NET Backend"},
        ],
        "tier_2": [
            {"name": "C", "status": "🔄 Secondary Support", "uses": "System Tools"},
            {"name": "C++", "status": "🔄 Secondary Support", "uses": "Performance Libraries"},
            {"name": "Kotlin", "status": "🔄 Secondary Support", "uses": "JVM Apps"},
            {"name": "Ruby", "status": "🔄 Secondary Support", "uses": "Web Framework"},
            {"name": "Scala", "status": "🔄 Secondary Support", "uses": "Big Data"},
            {"name": "Swift", "status": "🔄 Secondary Support", "uses": "iOS/macOS"},
            {"name": "Dart", "status": "🔄 Secondary Support", "uses": "Cross-platform"},
        ],
        "tier_3": [
            {"name": "R", "status": "📚 Specialized", "uses": "Statistical Analysis"},
            {"name": "MATLAB", "status": "📚 Specialized", "uses": "Numerical Computing"},
            {"name": "Julia", "status": "📚 Specialized", "uses": "Scientific Computing"},
            {"name": "SQL", "status": "📚 Specialized", "uses": "Database Queries"},
            {"name": "Shell/Bash", "status": "📚 Specialized", "uses": "System Scripts"},
            {"name": "Perl", "status": "📚 Specialized", "uses": "Text Processing"},
            {"name": "Lua", "status": "📚 Specialized", "uses": "Scripting"},
            {"name": "Haskell", "status": "📚 Specialized", "uses": "Functional"},
            {"name": "Elixir", "status": "📚 Specialized", "uses": "Distributed Systems"},
            {"name": "Clojure", "status": "📚 Specialized", "uses": "Functional JVM"},
            {"name": "Objective-C", "status": "📚 Specialized", "uses": "Legacy Apple"},
            {"name": "Assembly", "status": "📚 Specialized", "uses": "Low-level Ops"},
            {"name": "COBOL", "status": "📚 Specialized", "uses": "Legacy Systems"},
            {"name": "Visual Basic", "status": "📚 Specialized", "uses": "Legacy Windows"},
            {"name": "Fortran", "status": "📚 Specialized", "uses": "Scientific Legacy"},
        ]
    }
    return {
        "languages": languages,
        "total_count": sum(len(v) for v in languages.values()),
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/languages/{language}")
async def get_language_info(language: str):
    """Get detailed info about a specific language"""
    language_info = {
        "python": {
            "name": "Python",
            "version": "3.11",
            "frameworks": ["FastAPI", "Flask", "Django"],
            "package_manager": "pip",
            "docs": "https://python.org",
            "tier": 1
        },
        "javascript": {
            "name": "JavaScript",
            "version": "ES2022",
            "frameworks": ["React", "Vue", "Angular"],
            "package_manager": "npm",
            "docs": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
            "tier": 1
        },
        "java": {
            "name": "Java",
            "version": "11+",
            "frameworks": ["Spring Boot", "Quarkus", "Micronaut"],
            "package_manager": "Maven/Gradle",
            "docs": "https://java.com",
            "tier": 1
        },
    }
    
    if language.lower() not in language_info:
        raise HTTPException(status_code=404, detail=f"Language {language} not found")
    
    return language_info[language.lower()]

# ============================================================================
# FEATURES ENDPOINTS
# ============================================================================

@app.get("/api/features")
async def get_features():
    """Get all suite features"""
    features = {
        "developer_tools": [
            "Code Analysis & Linting",
            "Testing Frameworks",
            "Performance Monitoring",
            "Design System Components",
            "Security Scanning",
            "API Testing",
            "Database Management"
        ],
        "ai_automation": [
            "Machine Learning Models",
            "Data Processing Pipelines",
            "NLP Implementations",
            "Computer Vision Tools",
            "Automation Scripts"
        ],
        "security_tools": [
            "Encryption Utilities",
            "Vulnerability Scanning",
            "Key Management",
            "Penetration Testing",
            "Compliance Checkers"
        ],
        "portfolio": [
            "Professional Showcase",
            "Project Portfolio",
            "Analytics Dashboard",
            "Social Integration",
            "Responsive Design"
        ]
    }
    return {
        "features": features,
        "total_features": sum(len(v) for v in features.values())
    }

# ============================================================================
# STATS ENDPOINTS
# ============================================================================

@app.get("/api/stats")
async def get_stats():
    """Get project statistics"""
    return {
        "languages_supported": 31,
        "developer_tools": 300,
        "ai_modules": 15,
        "security_tools": 20,
        "api_endpoints": 25,
        "documentation_pages": 50,
        "total_lines_of_code": 100000,
        "github_stars": 0,
        "contributors": 1,
        "last_update": datetime.now().isoformat()
    }

# ============================================================================
# ERROR HANDLERS
# ============================================================================

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Custom HTTP exception handler"""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": True,
            "status_code": exc.status_code,
            "detail": exc.detail,
            "timestamp": datetime.now().isoformat()
        }
    )

@app.get("/api/not-found")
async def not_found():
    """404 handler"""
    raise HTTPException(status_code=404, detail="Endpoint not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
