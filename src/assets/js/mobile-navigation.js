// Updated Mobile Navigation JavaScript - Matches Your Header Structure

/* ====================================
   MOBILE NAVIGATION FUNCTIONALITY
   ==================================== */

class CoffeeHeaderNavigation {
  constructor() {
    this.toggle = document.getElementById('nav-toggle');
    this.menu = document.getElementById('nav-menu');

    this.init();
  }

  init() {
    if (this.toggle && this.menu) {
      this.toggle.addEventListener('click', () => this.toggleMenu());

      // Close menu when clicking outside
      document.addEventListener('click', (e) => this.handleOutsideClick(e));

      // Close menu on escape key
      document.addEventListener('keydown', (e) => this.handleEscapeKey(e));

      // Handle window resize
      window.addEventListener('resize', () => this.handleResize());
    }
  }

  toggleMenu() {
    const isActive = this.menu.classList.contains('is-active');

    if (isActive) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.menu.classList.add('is-active');
    this.toggle.classList.add('is-active');
    this.toggle.setAttribute('aria-expanded', 'true');

    // Prevent body scrolling on mobile
    if (window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    }

    // Focus first menu item for accessibility
    const firstLink = this.menu.querySelector('.nav__link');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
  }

  closeMenu() {
    this.menu.classList.remove('is-active');
    this.toggle.classList.remove('is-active');
    this.toggle.setAttribute('aria-expanded', 'false');

    // Restore body scrolling
    document.body.style.overflow = '';
  }

  handleOutsideClick(e) {
    const isMenuOpen = this.menu.classList.contains('is-active');
    const clickedInsideNav = e.target.closest('.coffee-header');

    if (isMenuOpen && !clickedInsideNav) {
      this.closeMenu();
    }
  }

  handleEscapeKey(e) {
    if (e.key === 'Escape') {
      this.closeMenu();
      // Return focus to toggle button
      this.toggle.focus();
    }
  }

  handleResize() {
    // Close mobile menu on desktop resize
    if (window.innerWidth >= 1024) {
      this.closeMenu();
    }
  }
}

/* ====================================
   SMOOTH SCROLLING FOR ANCHOR LINKS
   ==================================== */

function initSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        const headerHeight = document.querySelector('.coffee-header')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update URL without jumping
        history.pushState(null, null, `#${targetId}`);
      }
    });
  });
}

/* ====================================
   ACCESSIBILITY IMPROVEMENTS
   ==================================== */

// Focus management for mobile menu
function initFocusManagement() {
  document.addEventListener('keydown', (e) => {
    const menu = document.getElementById('nav-menu');
    const toggle = document.getElementById('nav-toggle');

    if (!menu || !toggle) return;

    const isMenuOpen = menu.classList.contains('is-active');

    if (isMenuOpen && e.key === 'Tab') {
      const focusableElements = menu.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Trap focus within menu
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
    }
  });
}

/* ====================================
   INITIALIZE ON DOM CONTENT LOADED
   ==================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile navigation
  new CoffeeHeaderNavigation();

  // Initialize smooth scrolling
  initSmoothScrolling();

  // Initialize focus management
  initFocusManagement();

  console.log('☕ Brewventy header navigation initialized!');
});

/* ====================================
   UTILITY FUNCTIONS
   ==================================== */

// Helper to check if mobile menu is open
function isMobileMenuOpen() {
  const menu = document.getElementById('nav-menu');
  return menu && menu.classList.contains('is-active');
}

// Helper to close mobile menu programmatically
function closeMobileMenu() {
  const menu = document.getElementById('nav-menu');
  const toggle = document.getElementById('nav-toggle');

  if (menu && toggle && menu.classList.contains('is-active')) {
    menu.classList.remove('is-active');
    toggle.classList.remove('is-active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

// Export utilities for use in other scripts
window.BrewventyNav = {
  isMobileMenuOpen,
  closeMobileMenu
};