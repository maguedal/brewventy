// Brewventy Coffee Shop Theme Utilities ☕
(function() {
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

    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      const flavorName = newFlavor === 'mocha' ? 'Mocha (Dark)' : 'Latte (Light)';
      toggle.setAttribute('aria-label', `Switch to ${flavorName} coffee theme`);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCoffeeShop);
  } else {
    initCoffeeShop();
  }

  // Export for global use
  window.brewventy = {
    toggleFlavor: toggleCoffeeFlavor,
    getCurrentFlavor: () => document.documentElement.getAttribute('data-theme')
  };

  console.log('☕ Welcome to Brewventy - The perfect brew of design and functionality!');
})();
