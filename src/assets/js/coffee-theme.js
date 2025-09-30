// Brewventy Coffee Shop Theme Utilities ☕
(function () {
  'use strict';

  function getSystemCoffeePreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'mocha' : 'latte';
  }

  function initCoffeeShop() {
    const html = document.documentElement;
    const storedFlavor = localStorage.getItem('coffee-flavor');
    const systemFlavor = getSystemCoffeePreference();
    const currentFlavor = storedFlavor || systemFlavor;

    html.setAttribute('data-theme', currentFlavor);
  }

  function toggleCoffeeFlavor() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const newFlavor = current === 'mocha' ? 'latte' : 'mocha';

    html.setAttribute('data-theme', newFlavor);
    localStorage.setItem('coffee-flavor', newFlavor);

    // Update aria-label
    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      const flavorName = newFlavor === 'mocha' ? 'Mocha (Dark)' : 'Latte (Light)';
      toggle.setAttribute('aria-label', `Switch to ${flavorName} coffee theme`);
    }

    console.log('Theme switched to:', newFlavor);
  }

  // Initialize theme on page load
  initCoffeeShop();

  // Connect button click event
  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        toggleCoffeeFlavor();
      });
      console.log('☕ Theme toggle connected successfully!');
    } else {
      console.log('❌ Theme toggle button not found!');
    }
  });

  // Export for global use
  window.brewventy = {
    toggleFlavor: toggleCoffeeFlavor,
    getCurrentFlavor: () => document.documentElement.getAttribute('data-theme')
  };

  console.log('☕ Brewventy theme system loaded!');
})();
