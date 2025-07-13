# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

NarcoCalc is a Progressive Web App (PWA) for anaesthesia-related medical calculations. It's built with Vue.js 2.x and designed as a demo application with calculations for ventilation parameters, haemostaseology, and dosing.

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

3. **Deployment**: Configured for GitLab Pages at `/narcocalc/` path in production

4. **PWA Configuration**: 
   - Service worker registration in `src/registerServiceWorker.js`
   - Manifest and icons in `public/`
   - HTTPS enabled in development

### Testing & Quality
Currently no test suite is configured. Use `yarn lint` to check code quality with ESLint.

### Production Deployment
The app is deployed to GitLab Pages at https://peuqui.gitlab.io/narcocalc