/**
 * AI LEAD - Main JavaScript
 * Handles interactive functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Set current year in footer
    updateCurrentYear();
    
    // Initialize mega menu functionality (desktop)
    initializeMegaMenus();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize scroll animations (only if not reduced motion)
    initializeScrollAnimations();
    
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
 * Initialize mega menu functionality (desktop hover)
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
            showMegaMenu(button, menu);
        });
        
        // Mouse leave - hide menu with delay
        group.addEventListener('mouseleave', function() {
            hoverTimeout = setTimeout(() => {
                hideMegaMenu(button, menu);
            }, 150);
        });
        
        // Keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMegaMenu(button, menu);
            }
            if (e.key === 'Escape') {
                hideMegaMenu(button, menu);
                button.focus();
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!group.contains(e.target)) {
                hideMegaMenu(button, menu);
            }
        });
    });
}

/**
 * Show mega menu
 */
function showMegaMenu(button, menu) {
    button.setAttribute('aria-expanded', 'true');
    menu.classList.remove('invisible', 'opacity-0', 'translate-y-2');
    menu.classList.add('visible', 'opacity-100', 'translate-y-0');
}

/**
 * Hide mega menu
 */
function hideMegaMenu(button, menu) {
    button.setAttribute('aria-expanded', 'false');
    menu.classList.remove('visible', 'opacity-100', 'translate-y-0');
    menu.classList.add('invisible', 'opacity-0', 'translate-y-2');
}

/**
 * Toggle mega menu
 */
function toggleMegaMenu(button, menu) {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
        hideMegaMenu(button, menu);
    } else {
        showMegaMenu(button, menu);
    }
}

/**
 * Initialize mobile menu functionality
 */
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (!mobileMenuButton || !mobileMenu) return;
    
    // Main menu toggle
    mobileMenuButton.addEventListener('click', function() {
        const isOpen = !mobileMenu.classList.contains('hidden');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Mobile submenu toggles
    initializeMobileSubmenu('mobile-solutions-toggle', 'mobile-solutions-menu', 'solutions-arrow');
    initializeMobileSubmenu('mobile-industries-toggle', 'mobile-industries-menu', 'industries-arrow');
    
    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    function openMobileMenu() {
        mobileMenu.classList.remove('hidden');
        hamburgerIcon?.classList.add('hidden');
        closeIcon?.classList.remove('hidden');
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.add('hidden');
        hamburgerIcon?.classList.remove('hidden');
        closeIcon?.classList.add('hidden');
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

/**
 * Initialize mobile submenu functionality
 */
function initializeMobileSubmenu(toggleId, menuId, arrowId) {
    const toggle = document.getElementById(toggleId);
    const menu = document.getElementById(menuId);
    const arrow = document.getElementById(arrowId);
    
    if (!toggle || !menu || !arrow) return;
    
    toggle.addEventListener('click', function() {
        const isOpen = !menu.classList.contains('hidden');
        
        if (isOpen) {
            menu.classList.add('hidden');
            arrow.style.transform = 'rotate(0deg)';
        } else {
            menu.classList.remove('hidden');
            arrow.style.transform = 'rotate(180deg)';
        }
    });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#home') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
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
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation (only value cards to keep it simple)
    const animateElements = document.querySelectorAll('.value-card');
    animateElements.forEach(el => observer.observe(el));
}

/**
 * Handle window resize events - close mobile menu and mega menus
 */
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        document.getElementById('hamburger-icon')?.classList.remove('hidden');
        document.getElementById('close-icon')?.classList.add('hidden');
        document.body.style.overflow = '';
    }
    
    // Hide any open mega menus
    const openMenus = document.querySelectorAll('.mega-menu:not(.invisible)');
    openMenus.forEach(menu => {
        const button = menu.closest('[data-menu]')?.querySelector('button');
        if (button) {
            hideMegaMenu(button, menu);
        }
    });
}, 250));

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