/**
 * AI LEAD - Main JavaScript
 * Handles interactive functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Set current year in footer
    updateCurrentYear();
    
    // Initialize mega menu functionality
    initializeMegaMenus();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize intersection observer for animations
    initializeScrollAnimations();
    
    // Initialize keyboard navigation
    initializeKeyboardNavigation();
    
    console.log('AI LEAD website initialized successfully');
});

/**
 * Update current year in footer
 */
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Initialize mega menu functionality with proper hover handling
 */
function initializeMegaMenus() {
    const menuGroups = document.querySelectorAll('[data-menu]');
    
    menuGroups.forEach(group => {
        const button = group.querySelector('button');
        const menu = group.querySelector('.mega-menu');
        
        if (!button || !menu) return;
        
        let hoverTimeout;
        
        // Mouse enter - show menu
        group.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            showMenu(button, menu);
        });
        
        // Mouse leave - hide menu with delay
        group.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                hideMenu(button, menu);
            }, 150); // Small delay to prevent flickering
        });
        
        // Keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu(button, menu);
            }
            if (e.key === 'Escape') {
                hideMenu(button, menu);
                button.focus();
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!group.contains(e.target)) {
                hideMenu(button, menu);
            }
        });
    });
}

/**
 * Show mega menu
 */
function showMenu(button, menu) {
    button.setAttribute('aria-expanded', 'true');
    menu.classList.remove('invisible', 'opacity-0', 'translate-y-2');
    menu.classList.add('visible', 'opacity-100', 'translate-y-0');
}

/**
 * Hide mega menu
 */
function hideMenu(button, menu) {
    button.setAttribute('aria-expanded', 'false');
    menu.classList.remove('visible', 'opacity-100', 'translate-y-0');
    menu.classList.add('invisible', 'opacity-0', 'translate-y-2');
}

/**
 * Toggle mega menu
 */
function toggleMenu(button, menu) {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
        hideMenu(button, menu);
    } else {
        showMenu(button, menu);
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Account for fixed header height
                const headerHeight = 80;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without triggering scroll
                history.pushState(null, null, href);
                
                // Focus management for accessibility
                target.focus({preventScroll: true});
            }
        });
    });
}

/**
 * Initialize scroll animations using Intersection Observer
 */
function initializeScrollAnimations() {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.value-card, section');
    animateElements.forEach(el => observer.observe(el));
}

/**
 * Initialize keyboard navigation improvements
 */
function initializeKeyboardNavigation() {
    // Skip link functionality
    addSkipLinks();
    
    // Trap focus in mega menus when open
    trapFocusInMenus();
    
    // Improve focus visibility
    improveFocusVisibility();
}

/**
 * Add skip links for accessibility
 */
function addSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-4 py-2 rounded z-50';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: white;
        color: black;
        padding: 8px;
        border-radius: 4px;
        z-index: 100;
        text-decoration: none;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark if it doesn't exist
    const main = document.querySelector('main');
    if (main && !main.id) {
        main.id = 'main';
    }
}

/**
 * Trap focus within open mega menus
 */
function trapFocusInMenus() {
    document.addEventListener('keydown', function(e) {
        if (e.key !== 'Tab') return;
        
        const openMenu = document.querySelector('.mega-menu:not(.invisible)');
        if (!openMenu) return;
        
        const focusableElements = openMenu.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

/**
 * Improve focus visibility for better accessibility
 */
function improveFocusVisibility() {
    // Add focus styles dynamically for better keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
        .focus-visible {
            outline: 2px solid rgba(34, 211, 238, 0.8) !important;
            outline-offset: 2px !important;
            border-radius: 4px !important;
        }
    `;
    document.head.appendChild(style);
    
    // Add focus-visible class for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

/**
 * Utility function to debounce function calls
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Handle window resize events
 */
window.addEventListener('resize', debounce(function() {
    // Hide any open menus on resize
    const openMenus = document.querySelectorAll('.mega-menu:not(.invisible)');
    openMenus.forEach(menu => {
        const button = menu.closest('[data-menu]')?.querySelector('button');
        if (button) {
            hideMenu(button, menu);
        }
    });
}, 250));

/**
 * Performance optimization: Preload critical images
 */
function preloadCriticalImages() {
    const criticalImages = [
        // Add any critical image URLs here that should be preloaded
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadCriticalImages();

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateCurrentYear,
        initializeMegaMenus,
        initializeSmoothScrolling,
        debounce
    };
}