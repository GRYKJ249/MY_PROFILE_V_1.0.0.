// GRY KJ Frontend Application

const app = {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8000',
    
    init() {
        console.log('🚀 GRY KJ Mega Developer Suite Initialized');
        this.setupEventListeners();
        this.loadContent();
    },

    setupEventListeners() {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    this.setActiveNav(link);
                }
            });
        });

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    },

    async loadContent() {
        console.log('Loading content from API...');
        try {
            const health = await this.fetchAPI('/api/health');
            console.log('✅ API Health:', health);
            
            const stats = await this.fetchAPI('/api/stats');
            console.log('📊 Stats:', stats);
            
            const languages = await this.fetchAPI('/api/languages');
            console.log('💻 Languages:', languages);
        } catch (error) {
            console.error('Error loading content:', error);
        }
    },

    async fetchAPI(endpoint) {
        try {
            const response = await fetch(`${this.apiUrl}${endpoint}`);
            if (!response.ok) throw new Error(`API Error: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Fetch error for ${endpoint}:`, error);
            throw error;
        }
    },

    setActiveNav(link) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    },

    toggleTheme() {
        document.body.classList.toggle('light-mode');
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
            localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        }
    }
};

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function openAPI() {
    window.location.href = 'http://localhost:8000/api/docs';
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
} else {
    app.init();
}

// Service Worker registration (for PWA)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('Service Worker registration failed:', err);
    });
}

console.log('🎉 GRY KJ Mega Developer Suite Ready!');
