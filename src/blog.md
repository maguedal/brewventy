---
title: "Coffee Stories"
description: "All our brewing adventures, coding journeys, and caffeinated thoughts"
layout: layouts/page.njk
---

## ☕ Our Coffee Stories

Welcome to our collection of brewing adventures! Whether you're here for coding tips, design insights, or just some caffeinated thoughts, grab your favorite cup and settle in.

{% if collections.posts.length > 0 %}
<!-- Show post count -->
<div class="section-header">
  <p class="section-subtitle">
    {{ collections.posts.length }} 
    {% if collections.posts.length == 1 %}story{% else %}stories{% endif %} 
    and counting ☕
  </p>
</div>

<!-- UPDATED: Using new post-grid with optimized spacing like homepage -->
<div class="post-grid">
{%- set featuredPost = collections.posts | first %}
{# Featured Post (Latest) #}
<article class="post-card post-card--featured">
<header class="post-card__header">
<div class="featured-badge">⭐ Featured Story</div>
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
{%- if not loop.first -%}
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
{%- for tag in post.data.tags | head(4) -%}
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

{% else %}
<!-- Enhanced empty state -->
<div class="post-grid--empty">
  <div class="empty-icon">☕</div>
  <h3 class="empty-title">The Coffee is Still Brewing...</h3>
  <p class="empty-description">
    We're working on some amazing coffee stories for you. 
    Check back soon for fresh content, or grab a cup while you wait!
  </p>
  <div class="mt-lg">
    <a href="/" class="btn btn--primary">← Back to Homepage</a>
  </div>
</div>
{% endif %}