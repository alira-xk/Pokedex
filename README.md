# Pokédex (React + Vite)

A fast, accessible Pokédex built with React, Vite, Tailwind CSS, React Router, and TanStack Query.

## Requirements
- Node.js 18+ (includes npm)

## Run locally
1. Install dependencies
   
   ```powershell
   npm install
   ```
2. Start the dev server (will open in your browser)
   
   ```powershell
   npm run dev -- --open
   ```

- Local URL: http://localhost:5173

## Build for production
```powershell
npm run build; npm run preview -- --open
```

## Features
- Pokémon list with search and paging
- Pokémon details with stats, types, and abilities
- Favorites saved locally
- Dark/light theme toggle

## Tech Stack
- React 18, Vite 5, TypeScript
- Tailwind CSS, React Router, TanStack Query
- ESLint, Prettier (via dev deps)

## Notes
- Data from https://pokeapi.co
- This is a demo app; no server-side code is required.