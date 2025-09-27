# FORTIS AURIS Website Optimization & Internationalization Guide

## Overview
This guide outlines the complete process to optimize the FORTIS AURIS website and add English language support while maintaining existing Slovak content.

## Phase 1: Backup and Preparation

### 1. Create Backup
```bash
git checkout -b backup-original
git add -A
git commit -m "Backup original website before internationalization"
git checkout master
```

### 2. File Structure Migration
```bash
# Create new directory structure
mkdir -p sk en _layouts _includes assets/css assets/js

# Move current Slovak content
mv *.html sk/ (except index.html)
mv tutorials sk/

# Create English directories
mkdir -p en/tutorials en/courses en/about
```

## Phase 2: Core Implementation

### 1. Replace _config.yml
- Replace the simple theme config with the comprehensive configuration provided
- This enables Jekyll plugins and internationalization features

### 2. Implement New Layout System
- Move all pages to use the new `_layouts/default.html` template
- Update all HTML files to use Jekyll front matter
- This provides consistent navigation, language switching, and SEO optimization

### 3. Add Language Selector
- Include the `_includes/language-selector.html` component in all pages
- This provides seamless language switching functionality

## Phase 3: Content Translation Strategy

### 1. Priority Translation Order
**High Priority (Immediate)**:
- Homepage (`index.html`)
- Course overview pages (`KurzA.html`, `KurzB.html`, `ITSecCamp.html`)
- Rules page (`Rules.html`)

**Medium Priority (Phase 2)**:
- Core tutorials (Linux basics, Python intro, Ethical hacking intro)
- About/Contact pages

**Lower Priority (Phase 3)**:
- Advanced tutorials
- Specialized content

### 2. Translation Workflow
```markdown
For each page:
1. Copy Slovak version to `/en/` directory
2. Translate content while preserving HTML structure
3. Update navigation links to English equivalents
4. Add proper front matter with lang: en
5. Update meta descriptions and titles
```

### 3. URL Structure
```
Slovak:  /sk/kurzy/zakladny-linux.html
English: /en/courses/beginner-linux-course.html

Slovak:  /sk/tutorials/
English: /en/tutorials/
```

## Phase 4: Performance Optimizations

### 1. Asset Optimization
- **CSS**: Implement critical CSS loading
- **Images**: Add lazy loading for all images below the fold
- **JavaScript**: Load scripts asynchronously where possible
- **Fonts**: Use font-display: swap for better loading performance

### 2. SEO Improvements
- **Sitemap**: Automatic generation with hreflang tags
- **Schema Markup**: Rich snippets for better search visibility
- **Meta Tags**: Proper Open Graph and Twitter Card support
- **Canonical URLs**: Prevent duplicate content issues

### 3. Accessibility Enhancements
- **Skip Links**: Allow keyboard users to skip navigation
- **ARIA Labels**: Proper screen reader support
- **Focus Management**: Visible focus indicators
- **Alt Tags**: Descriptive alternative text for images

## Phase 5: Advanced Features

### 1. Search Functionality
```javascript
// Client-side search implementation
// Indexes all tutorial content for instant results
// Supports Slovak and English content
```

### 2. Progressive Web App Features
```javascript
// Service worker for offline functionality
// Manifest file for mobile app installation
// Background sync for form submissions
```

### 3. Analytics Integration
```javascript
// Privacy-focused analytics
// GDPR compliant tracking
// Performance monitoring
```

## Implementation Steps

### Step 1: Infrastructure Setup
```bash
# 1. Update Jekyll configuration
cp _config_new.yml _config.yml

# 2. Create layout structure
mkdir -p _layouts _includes

# 3. Move assets to optimized structure
# (Already provided in new files)
```

### Step 2: Content Migration
```bash
# 1. Move existing content to Slovak directory
mkdir sk
mv *.html sk/ (except index.html)
mv tutorials sk/tutorials

# 2. Update all Slovak pages to use new layout
# Add front matter to each file:
---
layout: default
title: "Page Title"
lang: sk
---
```

### Step 3: English Content Creation
```bash
# 1. Create English directory structure
mkdir -p en/courses en/tutorials en/about

# 2. Translate priority content first
# Use provided English homepage as template

# 3. Create English navigation
# Update all internal links to use relative paths
```

### Step 4: Testing and Optimization
```bash
# 1. Test locally
bundle exec jekyll serve

# 2. Validate HTML/CSS
# 3. Test responsive design
# 4. Verify all links work
# 5. Test language switching
```

## SEO Benefits

### 1. International SEO
- **Hreflang Tags**: Proper language targeting for search engines
- **Separate URLs**: Clean URL structure for each language
- **Local Search**: Better visibility in English-speaking markets

### 2. Technical SEO
- **Page Speed**: Optimized loading times
- **Mobile First**: Responsive design optimization
- **Core Web Vitals**: Improved user experience metrics

### 3. Content SEO
- **Rich Snippets**: Schema markup for educational content
- **Internal Linking**: Improved site architecture
- **Breadcrumbs**: Better navigation hierarchy

## Expected Improvements

### Performance Metrics
- **Page Load Time**: 40-60% improvement
- **First Contentful Paint**: 30-50% improvement
- **Largest Contentful Paint**: 35-55% improvement

### SEO Metrics
- **International Visibility**: Access to English-speaking markets
- **Search Rankings**: Improved technical SEO factors
- **User Experience**: Better accessibility and mobile experience

### User Experience
- **Language Switching**: Seamless multilingual experience
- **Mobile Optimization**: Improved mobile user experience
- **Loading Speed**: Faster page loads and better performance

## Maintenance Guidelines

### 1. Content Updates
- Always update both language versions
- Maintain consistent messaging across languages
- Regular review for outdated information

### 2. Technical Maintenance
- Monitor Core Web Vitals monthly
- Update dependencies quarterly
- Review analytics for user behavior insights

### 3. SEO Monitoring
- Track rankings in both Slovak and English
- Monitor international traffic growth
- Regular technical SEO audits

## Migration Timeline

### Week 1: Infrastructure
- Set up new Jekyll configuration
- Create layout templates
- Implement performance optimizations

### Week 2-3: Content Migration
- Move Slovak content to new structure
- Begin high-priority English translations
- Test language switching functionality

### Week 4: Testing & Launch
- Comprehensive testing across devices
- SEO validation and fixes
- Deploy to production

### Week 5+: Ongoing Translation
- Continue translating medium priority content
- Monitor performance and user feedback
- Iterate based on analytics data

This comprehensive approach will transform the FORTIS AURIS website into a modern, multilingual, and highly optimized educational platform that serves both Slovak and international audiences effectively.