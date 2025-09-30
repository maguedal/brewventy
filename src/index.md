---
title: "Welcome to Brewventy"
description: "The perfect brew of design and functionality - a beautiful Eleventy starter theme featuring Catppuccin Mocha and Latte flavors"
layout: layouts/page.njk
---

## ☕ The Perfect Brew of Design and Functionality

**Brewventy** serves up the perfect blend of beautiful design and powerful functionality. Just like your favorite coffee shop offers both rich, dark **Mocha** and smooth, creamy **Latte**, this Eleventy theme provides both dark and light experiences using the beloved [Catppuccin](https://github.com/catppuccin/catppuccin) color palette.

*Brewventy = **Brew** (coffee themes) + **venty** (Eleventy) = ☕ + ⚡*

### ✨ What's Brewing

- ☕ **Dual Coffee Themes**: Rich Mocha (dark) and creamy Latte (light) with instant switching
- ⚡ **Lightning Fast**: Optimized for performance with minimal JavaScript
- ♿ **Accessibility First**: Built with WCAG AAA compliance and screen reader support
- 📱 **Fully Responsive**: Mobile-first design that works beautifully on all devices
- 🔍 **SEO Optimized**: Meta tags, structured data, and sitemap included
- 📝 **Blog Ready**: Complete blogging system with posts, tags, and RSS feed
- 🛠️ **Developer Friendly**: Clean code, modern tooling, and comprehensive documentation

### 🎨 Coffee Flavors

**☕ Mocha (Dark Theme)**  
Perfect for late-night coding sessions with rich, warm colors that are easy on the eyes.

**🥛 Latte (Light Theme)**  
Ideal for bright morning productivity with clean, creamy colors and high contrast text.

### 📚 Fresh Coffee Stories

<div class="post-grid">
{%- set featuredPost = collections.posts | first %}
{# Featured Post (Latest) #}
<article class="post-card post-card--featured">
<header class="post-card__header">
<div class="featured-badge">⭐ Featured</div>
<h3 class="post-card__title">
<a href="{{ featuredPost.url }}">{{ featuredPost.data.title }}</a>
</h3>
<time class="post-card__date" datetime="{{ featuredPost.date | dateISO }}">
{{ featuredPost.date | dateDisplay }}
</time>
</header>
<div class="post-card__body">
{%- if featuredPost.data.description -%}
<p class="post-card__excerpt">{{ featuredPost.data.description }}</p>
{%- else -%}
<p class="post-card__excerpt">{{ featuredPost.content | truncate(200) }}</p>
{%- endif -%}
</div>
<footer class="post-card__footer">
<div class="post-card__meta">
{%- if featuredPost.data.tags -%}
<ul class="post-card__tags">
{%- for tag in featuredPost.data.tags | head(4) -%}
{%- if tag != "posts" and tag != "all" -%}
<li><a href="/tags/{{ tag | slugify }}/" class="post-card__tag">{{ tag }}</a></li>
{%- endif -%}
{%- endfor -%}
</ul>
{%- endif -%}
<a href="{{ featuredPost.url }}" class="post-card__read-more">Read Featured Story</a>
</div>
</footer>
</article>

{# Regular Posts (Skip First) #}
{%- for post in collections.posts -%}
{%- if not loop.first and loop.index <= 6 -%}
<article class="post-card">
<header class="post-card__header">
<h3 class="post-card__title">
<a href="{{ post.url }}">{{ post.data.title }}</a>
</h3>
<time class="post-card__date" datetime="{{ post.date | dateISO }}">
{{ post.date | dateDisplay }}
</time>
</header>
<div class="post-card__body">
{%- if post.data.description -%}
<p class="post-card__excerpt">{{ post.data.description }}</p>
{%- else -%}
<p class="post-card__excerpt">{{ post.content | truncate(150) }}</p>
{%- endif -%}
</div>
<footer class="post-card__footer">
<div class="post-card__meta">
{%- if post.data.tags -%}
<ul class="post-card__tags">
{%- for tag in post.data.tags | head(3) -%}
{%- if tag != "posts" and tag != "all" -%}
<li><a href="/tags/{{ tag | slugify }}/" class="post-card__tag">{{ tag }}</a></li>
{%- endif -%}
{%- endfor -%}
</ul>
{%- endif -%}
<a href="{{ post.url }}" class="post-card__read-more">Read More</a>
</div>
</footer>
</article>
{%- endif -%}
{%- endfor %}
</div>

<div class="btn-group btn-group--center mt-xl">
  <a href="/blog/" class="btn btn--primary">☕ Explore All Stories</a>
  <a href="https://github.com/yourusername/eleventy-brewventy-theme" class="btn btn--ghost">📦 View on GitHub</a>
</div>

---

**Brewed with ❤️ for the Eleventy community** ☕