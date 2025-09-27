// Main JavaScript for FORTIS AURIS website
// Optimized for performance and accessibility

(function() {
    'use strict';
    
    // Performance monitoring
    const perfStart = performance.now();
    
    // Utility functions
    const utils = {
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
    };
    
    // Lazy loading for images
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        }
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
            });
        }
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Language switcher functionality
    function initLanguageSwitcher() {
        const languageLinks = document.querySelectorAll('[data-lang]');
        languageLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetLang = this.dataset.lang;
                const currentPath = window.location.pathname;
                
                // Store language preference
                localStorage.setItem('preferred_language', targetLang);
                
                // Navigate to translated page
                const newPath = switchLanguage(currentPath, targetLang);
                window.location.href = newPath;
            });
        });
        
        // Auto-redirect based on browser language (first visit only)
        if (!localStorage.getItem('visited_before')) {
            const browserLang = navigator.language.slice(0, 2);
            const currentPath = window.location.pathname;
            
            if (browserLang === 'en' && !currentPath.startsWith('/en/')) {
                localStorage.setItem('preferred_language', 'en');
                localStorage.setItem('visited_before', 'true');
                window.location.href = '/en/';
            } else {
                localStorage.setItem('visited_before', 'true');
            }
        }
    }
    
    function switchLanguage(currentPath, targetLang) {
        // Remove current language prefix
        let basePath = currentPath.replace(/^\/(sk|en)\//, '/');
        if (basePath === '/') basePath = '';
        
        // Add new language prefix
        return targetLang === 'en' ? '/en' + basePath : '/sk' + basePath;
    }
    
    // Form handling with validation
    function initContactForms() {
        const forms = document.querySelectorAll('.contact-form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Basic validation
                if (!data.email || !data.message) {
                    showNotification('Please fill in all required fields.', 'error');
                    return;
                }
                
                // Email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    showNotification('Please enter a valid email address.', 'error');
                    return;
                }
                
                // Show loading state
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual endpoint)
                setTimeout(() => {
                    showNotification('Message sent successfully!', 'success');
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            });
        });
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Styling
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 4px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        `;
        
        // Type-specific colors
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
    
    // Parallax effect for hero sections
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        if (parallaxElements.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const handleScroll = utils.throttle(() => {
                const scrolled = window.pageYOffset;
                parallaxElements.forEach(element => {
                    const rate = scrolled * -0.5;
                    element.style.transform = `translateY(${rate}px)`;
                });
            }, 16); // ~60fps
            
            window.addEventListener('scroll', handleScroll);
        }
    }
    
    // Search functionality
    function initSearch() {
        const searchInput = document.querySelector('#search-field');
        if (searchInput) {
            const handleSearch = utils.debounce((query) => {
                if (query.length < 2) return;
                
                // Simple client-side search (replace with proper search implementation)
                const searchResults = performSearch(query);
                displaySearchResults(searchResults);
            }, 300);
            
            searchInput.addEventListener('input', (e) => {
                handleSearch(e.target.value);
            });
        }
    }
    
    function performSearch(query) {
        // Placeholder search function
        // In a real implementation, this would search through content
        const mockResults = [
            { title: 'Python Tutorial', url: '/tutorials/python-basics', excerpt: 'Learn Python programming...' },
            { title: 'Linux Basics', url: '/tutorials/linux-intro', excerpt: 'Master the command line...' }
        ].filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.excerpt.toLowerCase().includes(query.toLowerCase())
        );
        
        return mockResults;
    }
    
    function displaySearchResults(results) {
        // Create or update search results dropdown
        let resultsContainer = document.querySelector('.search-results');
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.className = 'search-results';
            resultsContainer.style.cssText = `
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border: 1px solid #ddd;
                border-radius: 4px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                max-height: 300px;
                overflow-y: auto;
                z-index: 1000;
            `;
            document.querySelector('.form-inline').style.position = 'relative';
            document.querySelector('.form-inline').appendChild(resultsContainer);
        }
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="search-result-item">No results found</div>';
        } else {
            resultsContainer.innerHTML = results.map(result => `
                <div class="search-result-item">
                    <a href="${result.url}">
                        <h6>${result.title}</h6>
                        <p>${result.excerpt}</p>
                    </a>
                </div>
            `).join('');
        }
    }
    
    // Analytics tracking (privacy-focused)
    function initAnalytics() {
        // Only track if user consents (implement cookie banner if needed)
        if (localStorage.getItem('analytics_consent') === 'true') {
            // Track page views
            trackPageView();
            
            // Track scroll depth
            let maxScroll = 0;
            window.addEventListener('scroll', utils.throttle(() => {
                const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
                if (scrollPercent > maxScroll) {
                    maxScroll = scrollPercent;
                    if (scrollPercent % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                        trackEvent('scroll', 'depth', scrollPercent);
                    }
                }
            }, 1000));
        }
    }
    
    function trackPageView() {
        // Implement your analytics tracking here
        console.log('Page view tracked:', window.location.pathname);
    }
    
    function trackEvent(category, action, label) {
        // Implement your event tracking here
        console.log('Event tracked:', category, action, label);
    }
    
    // Performance monitoring
    function logPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfEnd = performance.now();
                    const loadTime = perfEnd - perfStart;
                    
                    const navigationTiming = performance.getEntriesByType('navigation')[0];
                    if (navigationTiming) {
                        console.log('Performance Metrics:', {
                            'Total Load Time': Math.round(loadTime) + 'ms',
                            'DOM Content Loaded': Math.round(navigationTiming.domContentLoadedEventEnd - navigationTiming.navigationStart) + 'ms',
                            'First Paint': performance.getEntriesByType('paint')[0]?.startTime ? Math.round(performance.getEntriesByType('paint')[0].startTime) + 'ms' : 'N/A'
                        });
                    }
                }, 0);
            });
        }
    }
    
    // Initialize everything when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initLazyLoading();
        initSmoothScrolling();
        initLanguageSwitcher();
        initContactForms();
        initParallax();
        initSearch();
        initAnalytics();
        logPerformance();
        
        console.log('FORTIS AURIS website initialized successfully');
    });
    
})();