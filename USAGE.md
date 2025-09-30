# Getting Started & Usage

Welcome to **Brewventy**, a coffee-themed Eleventy starter. This guide covers detailed usage of themes, build processes, and advanced customization.

---

## Prerequisites

- Node.js v14 or later
- npm v6+ or Yarn v1+
- Git

---

## Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/kylereddoch/brewventy.git
   cd brewventy
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

---

## Development Workflow

### Start Dev Server

Run Eleventy with live-reload and SCSS compilation:
```bash
npm run dev
# or
yarn dev
```
- **Eleventy** serves at `http://localhost:8080` by default
- **Browsersync** reloads on file changes
- **SCSS** watches and compiles styles in real-time

### NPM Scripts

| Script       | Description                                    |
| ------------ | ---------------------------------------------- |
| `npm run dev`  | Start local dev server with watch              |
| `npm run build`| Compile SCSS, build Eleventy site into `_site` |
| `npm run clean`| Remove `_site` folder                          |
| `npm run serve`| Serve production build at `http://localhost:5000` |

---

## Theme System

Brewventy uses two themes:
- **Mocha** (dark) - `data-theme="mocha"`
- **Latte** (light) - `data-theme="latte"`

### Toggle Button

Use the `coffeeToggle` shortcode or HTML:
```njk
{% coffeeToggle %}
```
This renders a button with sun/moon icons. JS listens for clicks and toggles `data-theme` on `<html>`.

### SCSS Variables

All theme colors are in `src/styles/themes/_variables.scss`:
```scss
$color-bg: #ffffff;
$color-bg-alt: #fafafa;
$color-text: #333333;
$color-primary: #b5651d;
$color-secondary: #d9a066;
// etc...
```
Customize colors by editing these variables before recompiling.

---

## Configuration

### Eleventy Config

Modify `.eleventy.js` for template and plugin settings:
```js
module.exports = function(eleventyConfig) {
  // Add plugins
  eleventyConfig.addPlugin(require('@11ty/eleventy-navigation'));

  // Watch targets
  eleventyConfig.addWatchTarget("src/styles/");

  // Pass through assets
  eleventyConfig.addPassthroughCopy({ "src/assets/": "assets/" });
};
```

### Directory Structure

```
├── src/
│   ├── _includes/
│   │   ├── layouts/
│   │   └── partials/
│   ├── _data/
│   ├── assets/
│   ├── scripts/
│   ├── styles/
│   └── index.md
├── .eleventy.js
├── package.json
└── README.md
```

---

## Build & Deployment

1. **Build:**
   ```bash
   npm run build
   ```
2. **Preview:**
   ```bash
   npm run serve
   ```
3. **Deploy:**
   - Netlify, Vercel, or GitHub Pages (see [DEPLOYMENT.md](DEPLOYMENT.md))

---

## Advanced Topics

- **Internationalization:** Use `eleventy-i18n` plugin
- **RSS Feeds:** Configure via `@11ty/eleventy-plugin-rss`
- **Custom Shortcodes:** Define in `.eleventy.js`

---

_For full customization options, refer to `src/styles/_variables.scss` and `.eleventy.js`._