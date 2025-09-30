// Eleventy Plugins
import { EleventyRenderPlugin } from '@11ty/eleventy';
import rss from '@11ty/eleventy-plugin-rss';
import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import navigationPlugin from "@11ty/eleventy-navigation";
import eleventySass from "eleventy-sass";

// Add image optimization support
import Image from '@11ty/eleventy-img';
import { join, isAbsolute, extname, basename } from 'path';

// Markdown-it library setup (if you need custom markdown)
import markdownIt from 'markdown-it';

// Setup markdown library with plugins
const markdownLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true
}).use(function (md) {
    // Add any markdown-it plugins here if needed
});

export default {
    EleventyRenderPlugin,
    rss,
    syntaxHighlight,
    navigationPlugin,
    eleventySass,
    Image,
    // Path utilities - FIXED (removed 'path' since it's not imported)
    join,
    isAbsolute,
    extname,
    basename,
    // Markdown library
    markdownLib
};