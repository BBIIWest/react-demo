# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **React 19.1.1** with TypeScript
- **Vite 7** - build tool with HMR using @vitejs/plugin-react (Babel for Fast Refresh)
- **ESLint 9** with React Hooks and React Refresh plugins

## Development Commands

```bash
npm run dev      # Start dev server (usually http://localhost:5173)
npm run build    # TypeScript check + production build
npm run lint     # Run ESLint on codebase
npm run preview  # Preview production build locally
```

## Project Structure

- `/src` - React components and application code
  - `main.tsx` - Application entry point
  - `App.tsx` - Root component
- `/public` - Static assets served at root
- TypeScript configuration split between:
  - `tsconfig.app.json` - Application code config
  - `tsconfig.node.json` - Vite config and build scripts

## Build Process

The build script runs `tsc -b` before `vite build`, ensuring TypeScript type checking passes before bundling. Type errors will block the build.

## ESLint Configuration

The project uses a flat ESLint config (`eslint.config.js`). To expand with type-aware rules for production, see the README.md section on "Expanding the ESLint configuration".
