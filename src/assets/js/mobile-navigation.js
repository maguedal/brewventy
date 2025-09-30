// Mobile Navigation JavaScript

/* ====================================
   MOBILE NAVIGATION FUNCTIONALITY
   ==================================== */

class MobileNavigation {
  constructor() {
    this.burger = document.getElementById('navbar-burger');
    this.menu = document.getElementById('navbar-menu');
    this.dropdowns = document.querySelectorAll('.has-dropdown');
    
    this.init();
  }
  
  init() {
    if (this.burger && this.menu) {
      this.burger.addEventListener('click', () => this.toggleMenu());
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => this.handleOutsideClick(e));
      
      // Close menu on escape key
      document.addEventListener('keydown', (e) => this.handleEscapeKey(e));
      
      // Handle window resize
      window.addEventListener('resize', () => this.handleResize());
    }
    
    // Initialize dropdown functionality
    this.initDropdowns();
    
    // Set active page
    this.setActivePage();
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
    this.burger.classList.add('is-active');
    this.burger.setAttribute('aria-expanded', 'true');
    
    // Prevent body scrolling on mobile
    if (window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    }
  }
  
  closeMenu() {
    this.menu.classList.remove('is-active');
    this.burger.classList.remove('is-active');
    this.burger.setAttribute('aria-expanded', 'false');
    
    // Restore body scrolling
    document.body.style.overflow = '';
    
    // Close all dropdowns
    this.closeAllDropdowns();
  }
  
  handleOutsideClick(e) {
    const isMenuOpen = this.menu.classList.contains('is-active');
    const clickedInsideNav = e.target.closest('.navbar');
    
    if (isMenuOpen && !clickedInsideNav) {
      this.closeMenu();
    }
  }
  
  handleEscapeKey(e) {
    if (e.key === 'Escape') {
      this.closeMenu();
    }
  }
  
  handleResize() {
    // Close mobile menu on desktop resize
    if (window.innerWidth >= 1024) {
      this.closeMenu();
    }
  }
  
  initDropdowns() {
    this.dropdowns.forEach(dropdown => {
      const link = dropdown.querySelector('.navbar-link');
      const dropdownMenu = dropdown.querySelector('.navbar-dropdown');
      
      if (link && dropdownMenu) {
        // Mobile: Click to toggle
        link.addEventListener('click', (e) => {
          if (window.innerWidth < 1024) {
            e.preventDefault();
            this.toggleDropdown(dropdown);
          }
        });
        
        // Desktop: Hover behavior is handled by CSS
        // But we can add keyboard navigation
        link.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (window.innerWidth < 1024) {
              this.toggleDropdown(dropdown);
            }
          }
        });
      }
    });
  }
  
  toggleDropdown(dropdown) {
    const dropdownMenu = dropdown.querySelector('.navbar-dropdown');
    const isActive = dropdown.classList.contains('is-active');
    
    // Close other dropdowns
    this.closeAllDropdowns();
    
    if (!isActive) {
      dropdown.classList.add('is-active');
      dropdownMenu.classList.add('is-active');
    }
  }
  
  closeAllDropdowns() {
    this.dropdowns.forEach(dropdown => {
      dropdown.classList.remove('is-active');
      const dropdownMenu = dropdown.querySelector('.navbar-dropdown');
      if (dropdownMenu) {
        dropdownMenu.classList.remove('is-active');
      }
    });
  }
  
  setActivePage() {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.navbar-item[href]');
    
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      
      // Exact match or home page
      if (href === currentPath || (href === '/' && currentPath === '/')) {
        item.classList.add('is-active');
        item.setAttribute('aria-current', 'page');
      }
      // Path starts with href (for blog posts, etc.)
      else if (href !== '/' && currentPath.startsWith(href)) {
        item.classList.add('is-active');
        item.setAttribute('aria-current', 'page');
      }
    });
  }
}

/* ====================================
   THEME TOGGLE FUNCTIONALITY
   ==================================== */

class ThemeToggle {
  constructor() {
    this.toggle = document.querySelector('.theme-toggle');
    this.icon = document.querySelector('.theme-toggle__icon');
    
    this.init();
  }
  
  init() {
    if (!this.toggle || !this.icon) return;
    
    // Set initial theme
    this.setInitialTheme();
    
    // Add click handler
    this.toggle.addEventListener('click', () => this.toggleTheme());
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (!localStorage.getItem('theme')) {
        this.updateTheme();
      }
    });
  }
  
  setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    
    this.updateTheme();
  }
  
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    this.updateTheme();
    
    // Add a nice animation effect
    this.toggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      this.toggle.style.transform = '';
    }, 300);
  }
  
  updateTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (this.icon) {
      this.icon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    }
    
    // Update toggle button aria-label
    if (this.toggle) {
      this.toggle.setAttribute('aria-label', 
        currentTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
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
        
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - navbarHeight - 20;
        
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
   INITIALIZE ON DOM CONTENT LOADED
   ==================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize mobile navigation
  new MobileNavigation();
  
  // Initialize theme toggle
  new ThemeToggle();
  
  // Initialize smooth scrolling
  initSmoothScrolling();
  
  console.log('☕ Brewventy navigation initialized!');
});

/* ====================================
   ACCESSIBILITY IMPROVEMENTS
   ==================================== */

// Focus management for mobile menu
document.addEventListener('keydown', (e) => {
  const menu = document.getElementById('navbar-menu');
  const burger = document.getElementById('navbar-burger');
  
  if (!menu || !burger) return;
  
  const isMenuOpen = menu.classList.contains('is-active');
  
  if (isMenuOpen && e.key === 'Tab') {
    const focusableElements = menu.querySelectorAll(
      'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );
    
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

// Announce theme changes to screen readers
function announceThemeChange(theme) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = `Theme changed to ${theme} mode`;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}