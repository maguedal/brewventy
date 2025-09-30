---
title: "Brewing Speed: Performance Optimization for Eleventy Sites"
description: "Learn how to make your Eleventy website as fast as your espresso machine. Performance tips that'll make your site lightning quick."
date: 2024-01-10
tags: ["performance", "eleventy", "optimization", "web-development"]
layout: layouts/post.njk
---

A slow website is like a slow espresso machine—nobody wants to wait around for it. Let's explore how to make your **Eleventy site** deliver content as quickly as your favorite coffee shop serves your morning cup.

## ⚡ The Need for Speed

### Why Performance Matters
- **User experience** - 53% of users abandon sites that take > 3 seconds to load
- **SEO rankings** - Google uses page speed as a ranking factor
- **Conversions** - Every 100ms delay costs 1% in conversions
- **Mobile users** - Even more sensitive to slow loading times

### The Coffee Shop Analogy
Think of your website like a coffee shop:
- **Fast service** = Quick page loads
- **Efficient layout** = Optimized code structure
- **Fresh ingredients** = Updated, minimal dependencies
- **Skilled baristas** = Well-configured build process

## 📊 Measuring Your Current Performance

### Essential Tools
```bash
# Lighthouse CLI (the espresso of performance testing)
npm install -g lighthouse
lighthouse https://your-site.com --output html

# PageSpeed Insights (Google's performance meter)
# Visit: https://pagespeed.web.dev/

# GTmetrix (detailed performance analysis)
# Visit: https://gtmetrix.com/
```

### Key Metrics to Track
- **First Contentful Paint (FCP)** - When users see something
- **Largest Contentful Paint (LCP)** - When main content loads
- **Cumulative Layout Shift (CLS)** - How much the page jumps around
- **Time to Interactive (TTI)** - When the page becomes fully functional

## 🏗️ Eleventy-Specific Optimizations

### 1. Efficient Data Handling
```javascript
export default async function (eleventyConfig) {
  // Cache expensive operations
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("src/posts/**/*.md")
      .sort((a, b) => b.date - a.date);
  });
  
  // Use transforms sparingly
  eleventyConfig.addTransform("minify-html", function(content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      return require("html-minifier").minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
    }
    return content;
  });
};
```

### 2. Template Optimization

{% raw %}

```html
<!-- Efficient Nunjucks templates -->
{% set recentPosts = collections.posts | head(5) %}
{% for post in recentPosts %}
  <!-- Only render what's needed -->
  <article class="post-card">
    <h2>{{ post.data.title }}</h2>
    {% if post.data.description %}
      <p>{{ post.data.description }}</p>
    {% endif %}
  </article>
{% endfor %}
```

{% endraw %}


### 3. Asset Optimization
```scss
// Efficient Sass compilation
// Use @use instead of @import (Dart Sass)
@use "themes/coffee-themes";
@use "components/layout";
```

## 🖼️ Image Optimization with Brewventy

### Using the Image Shortcode
Your Brewventy theme now includes powerful image optimization! You can use it in several ways:

```html
<!-- Basic usage -->
{% image "/assets/images/coffee-hero.jpg", "Perfect espresso shot" %}

<!-- With custom sizes -->
{% image "/assets/images/latte-art.jpg", "Beautiful latte art", "100vw", [400, 800, 1200] %}

<!-- Coffee-themed shortcode for simpler usage -->
{% coffeeImage "/assets/images/brewing-setup.jpg", "Coffee brewing equipment" %}
```

### Traditional HTML Still Works
```html
<!-- Regular HTML images still work fine -->
<img src="/assets/images/coffee-beans.jpg" alt="Fresh coffee beans" loading="lazy">

<!-- Progressive image loading -->
<picture>
  <source srcset="coffee.webp" type="image/webp">
  <source srcset="coffee.avif" type="image/avif">
  <img src="coffee.jpg" alt="Perfect espresso shot" loading="lazy">
</picture>
```

### How Image Optimization Works
The `{% image %}` shortcode automatically:
- **Creates multiple sizes** (300px, 600px, 900px by default)
- **Generates WebP and JPEG formats** for better compatibility
- **Adds lazy loading** and proper alt text
- **Optimizes file sizes** without quality loss
- **Provides fallback** if processing fails

## 🗜️ Build Process Optimization

### Efficient Package.json Scripts
```json
{
  "scripts": {
    "build": "npm run build:css && eleventy",
    "build:css": "sass src/styles/main.scss:_site/css/main.css --style=compressed --no-source-map",
    "build:critical": "critical _site/index.html --base _site --css _site/css/main.css --target _site/index.html --inline",
    "build:prod": "npm run build && npm run build:critical"
  }
}
```

### Critical CSS Extraction
```bash
# Install critical CSS tool
npm install --save-dev critical

# Extract and inline critical CSS
critical _site/index.html --base _site --css _site/css/main.css --inline
```

## 🚀 Deployment Optimizations

### Netlify Configuration
```toml
# netlify.toml
[build]
  command = "npm run build:prod"
  publish = "_site"

[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/img/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Vercel Configuration
```json
{
  "buildCommand": "npm run build:prod",
  "outputDirectory": "_site",
  "headers": [
    {
      "source": "/css/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/img/(.*)",
      "headers": [
        {
          "key": "Cache-Control", 
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## 📱 Progressive Enhancement

### Service Worker for Caching
```javascript
// sw.js - Cache coffee content for offline access
const CACHE_NAME = 'brewventy-v1';
const urlsToCache = [
  '/',
  '/css/main.css',
  '/js/coffee-theme.js',
  '/img/', // Cache optimized images
  '/offline.html'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});
```

### Lazy Loading Implementation
```javascript
// Intersection Observer for lazy loading (works with optimized images)
const lazyImages = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));
```

## 🔍 Advanced Optimizations

### Preloading Critical Resources
```html
<!-- Preload critical assets -->
<link rel="preload" href="/css/main.css" as="style">
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/img/hero-coffee-600w.webp" as="image">
```

### DNS Prefetching
```html
<!-- Speed up external resource loading -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//cdn.jsdelivr.net">
```

### Resource Hints
```html
<!-- Optimize navigation -->
<link rel="prefetch" href="/blog/">
<link rel="preconnect" href="https://analytics.google.com">
```

## 📈 Performance Monitoring

### Core Web Vitals Tracking
```javascript
// Track performance metrics
import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  gtag('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_category: 'Web Vitals',
    event_label: metric.id,
    non_interaction: true,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Automated Performance Testing
```json
{
  "scripts": {
    "test:perf": "lighthouse-ci autorun",
    "test:core-vitals": "unlighthouse --site https://your-site.com"
  }
}
```

## 💡 Quick Performance Wins

### Immediate Improvements (< 1 hour)
1. **Enable compression** - Gzip/Brotli on your server
2. **Use image shortcodes** - Automatic optimization for all images
3. **Minify CSS/JS** - Remove unnecessary characters
4. **Add caching headers** - Let browsers cache static assets

### Medium-term Goals (< 1 week)
1. **Implement lazy loading** - Already included with image shortcodes!
2. **Extract critical CSS** - Inline above-the-fold styles
3. **Optimize fonts** - Use font-display: swap
4. **Remove unused dependencies** - Audit your package.json

### Long-term Optimizations (< 1 month)
1. **Service worker implementation** - Offline functionality
2. **Advanced image optimization** - WebP/AVIF formats (done!)
3. **Performance monitoring** - Track Core Web Vitals
4. **Progressive enhancement** - Works without JavaScript

## 🎯 Performance Budget

Set performance budgets like you set a coffee budget:

```javascript
// lighthouse-ci budget
{
  "ci": {
    "assert": {
      "assertions": {
        "first-contentful-paint": ["error", {"maxNumericValue": 2000}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}]
      }
    }
  }
}
```

## 🔧 Image Optimization Tips

### Best Practices
- **Use descriptive alt text** - Important for accessibility
- **Choose appropriate sizes** - Don't generate unnecessary large images
- **Place images in src/assets/images/** - Keeps your project organized
- **Let the shortcode handle optimization** - It's smarter than manual optimization

### Troubleshooting
If images aren't processing correctly:
1. **Check the file path** - Make sure images exist in your src directory
2. **Install Sharp** - Run `npm install sharp` for better performance
3. **Check console output** - Look for coffee image processing errors
4. **Use fallback HTML** - Regular `<img>` tags work as backup

Remember: Performance optimization is like perfecting your coffee recipe—it takes time, attention to detail, and continuous refinement. But with automatic image optimization, you're already ahead of the game!

---

*What's your site's current Lighthouse score? Share your performance wins!* ⚡☕