/**
 * Krishna Nand Tiwari Portfolio - Interactive Scripts
 * Lightweight, high-performance vanilla script.
 * Features: Mouse coordinate tracking (glow overlay) and mobile navigation toggling.
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initCardGlows();
});

/* ==========================================================================
   CARD GLOW EFFECT (Mouse Coordinate Tracker)
   ========================================================================== */
function initCardGlows() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Set coordinate custom variables
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/* ==========================================================================
   MOBILE NAVIGATION TOGGLE
   ========================================================================== */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!menuToggle || !navMenu) return;
    
    // Create and append backdrop dynamically
    let backdrop = document.querySelector('.nav-menu-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'nav-menu-backdrop';
        document.body.appendChild(backdrop);
    }
    
    const hamburgerSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>`;
    const closeSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
    
    const toggleMenu = (open) => {
        const isActive = open !== undefined ? open : !navMenu.classList.contains('active');
        navMenu.classList.toggle('active', isActive);
        backdrop.classList.toggle('active', isActive);
        menuToggle.classList.toggle('active', isActive);
        menuToggle.innerHTML = isActive ? closeSVG : hamburgerSVG;
        
        // Disable body scroll when menu is active
        document.body.style.overflow = isActive ? 'hidden' : '';
    };
    
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });
    
    backdrop.addEventListener('click', () => {
        toggleMenu(false);
    });
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(false);
        });
    });
}
