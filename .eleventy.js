/**
 * Most adjustments must be made in `./src/_config/*`
 *
 * Hint VS Code for eleventyConfig autocompletion.
 * © Henry Desroches - [https://gist.github.com/xdesro/69583b25d281d055cd12b144381123bf](https://gist.github.com/xdesro/69583b25d281d055cd12b144381123bf)
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig -
 * @returns {Object} -
 */

// register dotenv for process.env.* variables to pickup
import dotenv from 'dotenv';
dotenv.config();

// add yaml support
import yaml from 'js-yaml';

import plugins from './src/_config/plugins.js';

export default async function (eleventyConfig) {
  // Add plugins for the perfect brew
  eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
  eleventyConfig.addPlugin(plugins.rss);
  eleventyConfig.addPlugin(plugins.syntaxHighlight);
  eleventyConfig.addPlugin(plugins.navigationPlugin);

  //  --------------------- Library and Data
  eleventyConfig.setLibrary('md', plugins.markdownLib);
  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));

  // Add Sass support for our coffee shop styling
  eleventyConfig.addPlugin(plugins.eleventySass, {
    compileOptions: {
      permalink: function (contents, inputPath) {
        return (data) => data.page.filePathStem.replace(/^\/styles\//, "/css/") + ".css";
      }
    },
    sass: {
      style: "compressed",
      sourceMap: false
    }
  });

  // Copy coffee shop assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("_site/css");

  // Coffee-themed filters
  eleventyConfig.addFilter("dateDisplay", (dateObj) => {
    return new Date(dateObj).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  eleventyConfig.addFilter("dateISO", (dateObj) => {
    return new Date(dateObj).toISOString();
  });

  // Add head filter (fixed implementation)
  eleventyConfig.addFilter("head", (array, n = 10) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    return array.slice(0, n);
  });

  // Add filterByTag filter for tag pages
  eleventyConfig.addFilter("filterByTag", (collection, tag) => {
    if (!collection || !tag) return [];
    return collection.filter(item => {
      if (!item.data.tags) return false;
      return item.data.tags.includes(tag);
    });
  });

  // Add truncate filter for RSS descriptions
  eleventyConfig.addFilter("truncate", (str, length = 150) => {
    if (!str || str.length <= length) return str;
    return str.substring(0, length) + '...';
  });

  // Add XML escape filter for RSS
  eleventyConfig.addFilter("xmlEscape", (str) => {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  });

  // Add transform to clean up extra paragraphs
  eleventyConfig.addTransform("cleanHTML", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      // Remove empty paragraphs
      content = content.replace(/<p>\s*<\/p>/g, '');
      // Remove paragraphs around block elements
      content = content.replace(/<p>(<div[^>]*>)/g, '$1');
      content = content.replace(/(<\/div>)<\/p>/g, '$1');
      return content;
    }
    return content;
  });

  // Add slugify filter for URLs
  eleventyConfig.addFilter("slugify", (str) => {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  });

  // Add title case filter
  eleventyConfig.addFilter("title", (str) => {
    if (!str) return '';
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  });

  // Coffee story collections
  eleventyConfig.addCollection("posts", function (collection) {
    return collection.getFilteredByGlob("src/posts/**/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        tags = tags.filter(item => {
          switch (item) {
            case "all":
            case "nav":
            case "post":
            case "posts":
              return false;
          }
          return true;
        });
        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });
    return [...tagSet].sort();
  });

  // Coffee shop shortcodes
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addShortcode("coffeeToggle", function () {
    return `<button class="theme-toggle" data-theme-toggle aria-label="Switch coffee flavor">
      <svg class="theme-icon theme-icon--light" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
        <path d="m12 1-1 6-1-6"/>
        <path d="m12 23-1-6-1 6"/>
        <path d="m20 12-6-1 6-1"/>
        <path d="m4 12 6-1-6-1"/>
      </svg>
      <svg class="theme-icon theme-icon--dark" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2"/>
      </svg>
    </button>`;
  });

  // ☕ SHARED IMAGE PROCESSING FUNCTION
  async function processImage(src, alt, sizes = "100vw", widths = [300, 600, 900]) {
    // Handle both relative and absolute paths - FIXED
    let imagePath = src;

    try {
      // Fix path handling - check if src starts with / or contains :
      if (!plugins.isAbsolute(src)) {
        // For relative paths, join with src directory
        imagePath = plugins.join(process.cwd(), "src", src);
      } else if (src.startsWith('/')) {
        // For root-relative paths, join with src directory  
        imagePath = plugins.join(process.cwd(), "src", src.substring(1));
      } else {
        // For absolute paths, use as-is
        imagePath = src;
      }

      console.log(`☕ Processing image: ${src} -> ${imagePath}`);

      // Generate optimized images using plugins.Image
      let metadata = await plugins.Image(imagePath, {
        widths: Array.isArray(widths) ? widths : [300, 600, 900],
        formats: ["webp", "jpeg"],
        outputDir: "./_site/img/",
        urlPath: "/img/",
        filenameFormat: function (id, src, width, format, options) {
          const extension = plugins.extname(src);
          const name = plugins.basename(src, extension);
          return `${name}-${width}w.${format}`;
        }
      });

      // Generate responsive HTML
      let imageAttributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
        class: "coffee-optimized-image"
      };

      return plugins.Image.generateHTML(metadata, imageAttributes);

    } catch (error) {
      console.error(`☕ Coffee image processing error for ${src}:`, error.message);
      // Fallback to regular img tag if processing fails
      return `<img src="${src}" alt="${alt}" loading="lazy" class="coffee-fallback-image" style="max-width: 100%; height: auto;">`;
    }
  }

  // ☕ IMAGE OPTIMIZATION SHORTCODE - FIXED
  eleventyConfig.addShortcode("image", async function (src, alt, sizes = "100vw", widths = [300, 600, 900]) {
    return await processImage(src, alt, sizes, widths);
  });

  // ☕ COFFEE IMAGE SHORTCODE - FIXED to use shared function
  eleventyConfig.addShortcode("coffeeImage", async function (src, alt) {
    return await processImage(src, alt, "100vw", [400, 800]);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};