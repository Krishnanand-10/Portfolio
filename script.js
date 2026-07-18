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
    
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
    });
    
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}
