
// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    updateCurrentYear();
    initializeMegaMenus();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeScrollAnimations();
    initializeActiveStates();
    initializePageSpecific();
    initializeLoadingStates();
    initializeAccessibility();
    
    console.log('AI LEAD website initialized successfully with updated navigation');
}

// ===== UTILITY FUNCTIONS =====
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

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

// ===== MEGA MENU FUNCTIONALITY =====
function initializeMegaMenus() {
    const menuGroups = document.querySelectorAll('[data-menu]');
    
    menuGroups.forEach(group => {
        const button = group.querySelector('button');
        const menu = group.querySelector('.mega-menu');
        
        if (!button || !menu) return;
        
        let hoverTimeout;
        
        // Mouse events
        group.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimeout);
            showMegaMenu(button, menu);
        });
        
        group.addEventListener('mouseleave', () => {
            hoverTimeout = setTimeout(() => {
                hideMegaMenu(button, menu);
            }, 150);
        });
        
        // Keyboard support
        button.addEventListener('keydown', (e) => {
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
        document.addEventListener('click', (e) => {
            if (!group.contains(e.target)) {
                hideMegaMenu(button, menu);
            }
        });
    });
}

function showMegaMenu(button, menu) {
    button.setAttribute('aria-expanded', 'true');
    menu.classList.remove('invisible', 'opacity-0', 'translate-y-2');
    menu.classList.add('visible', 'opacity-100', 'translate-y-0');
}

function hideMegaMenu(button, menu) {
    button.setAttribute('aria-expanded', 'false');
    menu.classList.remove('visible', 'opacity-100', 'translate-y-0');
    menu.classList.add('invisible', 'opacity-0', 'translate-y-2');
}

function toggleMegaMenu(button, menu) {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
        hideMegaMenu(button, menu);
    } else {
        showMegaMenu(button, menu);
    }
}

// ===== MOBILE MENU FUNCTIONALITY =====
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (!mobileMenuButton || !mobileMenu) return;
    
    // Main menu toggle
    mobileMenuButton.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Initialize submenus
    const submenus = [
        { toggle: 'mobile-solutions-toggle', menu: 'mobile-solutions-menu', arrow: 'solutions-arrow' },
        { toggle: 'mobile-industries-toggle', menu: 'mobile-industries-menu', arrow: 'industries-arrow' },
        { toggle: 'mobile-services-toggle', menu: 'mobile-services-menu', arrow: 'services-arrow' }
    ];
    
    submenus.forEach(submenu => {
        initializeMobileSubmenu(submenu.toggle, submenu.menu, submenu.arrow);
    });
    
    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a:not([id*="toggle"])');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    function openMobileMenu() {
        mobileMenu.classList.remove('hidden');
        hamburgerIcon?.classList.add('hidden');
        closeIcon?.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            mobileMenu.classList.add('animate-in');
        }, 10);
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('animate-in');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 200);
        
        hamburgerIcon?.classList.remove('hidden');
        closeIcon?.classList.add('hidden');
        document.body.style.overflow = '';
        closeAllMobileSubmenus();
    }
    
    function closeAllMobileSubmenus() {
        const openSubmenus = mobileMenu.querySelectorAll('[id*="-menu"]:not(#mobile-menu)');
        const arrows = mobileMenu.querySelectorAll('[id*="-arrow"]');
        
        openSubmenus.forEach(submenu => {
            submenu.classList.add('hidden');
        });
        
        arrows.forEach(arrow => {
            arrow.style.transform = 'rotate(0deg)';
        });
    }
}

function initializeMobileSubmenu(toggleId, menuId, arrowId) {
    const toggle = document.getElementById(toggleId);
    const menu = document.getElementById(menuId);
    const arrow = document.getElementById(arrowId);
    
    if (!toggle || !menu || !arrow) {
        console.warn(`Mobile submenu elements not found: ${toggleId}, ${menuId}, ${arrowId}`);
        return;
    }
    
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = !menu.classList.contains('hidden');
        
        // Close other open submenus first
        closeOtherMobileSubmenus(menuId);
        
        if (isOpen) {
            menu.classList.add('hidden');
            arrow.style.transform = 'rotate(0deg)';
        } else {
            menu.classList.remove('hidden');
            arrow.style.transform = 'rotate(180deg)';
        }
    });
    
    function closeOtherMobileSubmenus(currentMenuId) {
        const allMenus = ['mobile-solutions-menu', 'mobile-industries-menu', 'mobile-services-menu'];
        const allArrows = ['solutions-arrow', 'industries-arrow', 'services-arrow'];
        
        allMenus.forEach((menuId, index) => {
            if (menuId !== currentMenuId) {
                const otherMenu = document.getElementById(menuId);
                const otherArrow = document.getElementById(allArrows[index]);
                
                if (otherMenu && otherArrow) {
                    otherMenu.classList.add('hidden');
                    otherArrow.style.transform = 'rotate(0deg)';
                }
            }
        });
    }
}

// ===== SMOOTH SCROLLING =====
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
                
                const headerHeight = 100;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                history.pushState(null, null, href);
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    const mobileMenuButton = document.getElementById('mobile-menu-button');
                    if (mobileMenuButton) {
                        mobileMenuButton.click();
                    }
                }
            }
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
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
    
    const animateElements = document.querySelectorAll('.value-card, .solution-card, .animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
}

// ===== ACTIVE STATES =====
function initializeActiveStates() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link[href]');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath.startsWith(href) && href !== '/')) {
            link.classList.add('active');
        }
    });
}

// ===== PAGE SPECIFIC FUNCTIONALITY =====
function initializePageSpecific() {
    const pageBody = document.body;
    const pageClass = pageBody.className;
    
    if (pageClass.includes('contact-page')) {
        console.log('Contact page specific initialization');
    }
    
    if (pageClass.includes('about-page')) {
        console.log('About page specific initialization');
    }
}

// ===== LOADING STATES =====
function initializeLoadingStates() {
    window.addEventListener('load', function() {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    });
}

// ===== ACCESSIBILITY =====
function initializeAccessibility() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenu.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                mobileMenuButton.click();
                mobileMenuButton.focus();
            }
        });
    }
    
    const skipLinks = document.querySelectorAll('.skip-link');
    skipLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView();
            }
        });
    });
}

// ===== EVENT LISTENERS =====
window.addEventListener('resize', debounce(function() {
    if (window.innerWidth >= 1024) {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            document.getElementById('hamburger-icon')?.classList.remove('hidden');
            document.getElementById('close-icon')?.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }
    
    const openMenus = document.querySelectorAll('.mega-menu:not(.invisible)');
    openMenus.forEach(menu => {
        const button = menu.closest('[data-menu]')?.querySelector('button');
        if (button) {
            hideMegaMenu(button, menu);
        }
    });
}, 250));