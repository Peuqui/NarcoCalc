# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NarcoCalc is a Progressive Web App (PWA) for anaesthesia-related medical calculations. It's built with Vue.js 2.x and designed as a demo application with calculations for ventilation parameters, haemostaseology, and dosing.

**Version 2.0.0 (January 2025)**: Implemented logarithmic blood loss calculation with comparison view showing both logarithmic and linear methods.

**Important**: This application is for demonstration purposes only and should NOT be used for actual therapy.

## Common Development Commands

```bash
# Install dependencies (use Node 12.0.0)
nvm use 12.0.0
yarn install
# or: npm install -n 12.0.0

# Development server with hot-reload (https://localhost:8080)
yarn serve
# or: npm run serve

# Production build (outputs to dist/)
yarn build

# Lint code
yarn lint

# Add new dependencies
yarn add <package-name>
```

## Architecture Overview

### Technology Stack
- **Vue.js 2.5.x** with Vue CLI 3
- **Vue Router 3.x** for navigation (hash-based routing)
- **Vue I18n** for German/English translations
- **SCSS** for styling
- **PWA** with service worker for offline capability

### Project Structure
- `src/views/` - Page components (Beatmung, Haemostaseologie, Dosierung)
- `src/components/` - Reusable Vue components
- `src/assets/` - SCSS styles and app logo
- `public/` - Static assets, PWA manifest, and index.html

### Key Development Patterns

1. **Component Structure**: Single File Components with inline i18n translations
   ```vue
   <i18n>
   {
     "en": { ... },
     "de": { ... }
   }
   </i18n>
   ```

2. **Routing**: Hash-based routing configured in `src/routes.js` with route-level code splitting

3. **Deployment**: Now on GitHub Pages at `/NarcoCalc/` path (migrated from GitLab)

4. **PWA Configuration**: 
   - Service worker registration in `src/registerServiceWorker.js`
   - Manifest and icons in `public/`
   - HTTPS enabled in development

### Testing & Quality
Currently no test suite is configured. Use `yarn lint` to check code quality with ESLint.

### Production Deployment
The app is deployed to GitHub Pages at https://peuqui.github.io/NarcoCalc
(Previously on GitLab, redirect is set up at the old URL)

### Key Features in Version 2.0.0

1. **Logarithmic Blood Loss Calculation** (`src/views/Haemostaseologie.vue`)
   - Main formula: `BV × ln(HKpräop / HKaktuell) + EK/MAT correction`
   - More physiologically accurate for large blood losses
   - Accounts for exponential dilution effect

2. **Comparison View**
   - Shows both logarithmic (primary, green) and linear (comparison, orange #cc6600) calculations
   - Displays difference when >100ml between methods
   - Helps clinicians understand the impact of the new formula

3. **Fallback Mechanism**
   - Automatically falls back to linear calculation when HK values are invalid
   - Ensures robust calculation in all scenarios

## Important Git Commit Guidelines

**NEVER include Co-Authored-By lines in any commit messages**
- No "Co-Authored-By: Claude" or similar attributions
- No "Generated with Claude Code" or AI references
- No robot emojis or symbols (🤖, 🤓, etc.)
- Keep commit messages clean and professional
- This is a solo project - no co-authorship attributions needed