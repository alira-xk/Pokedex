import { Link, NavLink } from 'react-router-dom'
import AnimatedOutlet from './route-animations/AnimatedOutlet'
import { prefetchHomeRoute, prefetchFavoritesRoute, prefetchAboutRoute } from '../app/routePrefetch'
import ThemeToggle from './ThemeToggle'

export default function RootLayout() {
  return (
    <div className="min-h-full flex flex-col">
      <header className="sticky top-0 z-20 backdrop-blur bg-white/80 dark:bg-neutral-950/80 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="font-bold text-lg focus-ring">Pokédex</Link>
          <nav className="flex items-center gap-3 text-sm">
            <NavLink to="/" onMouseEnter={prefetchHomeRoute} className={({isActive}) => isActive ? 'text-red-600 focus-ring' : 'hover:text-red-600 focus-ring'}>Home</NavLink>
            <NavLink to="/favorites" onMouseEnter={prefetchFavoritesRoute} className={({isActive}) => isActive ? 'text-red-600 focus-ring' : 'hover:text-red-600 focus-ring'}>Favorites</NavLink>
            <NavLink to="/about" onMouseEnter={prefetchAboutRoute} className={({isActive}) => isActive ? 'text-red-600 focus-ring' : 'hover:text-red-600 focus-ring'}>About</NavLink>
          </nav>
          <div className="ml-auto"><ThemeToggle /></div>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6">
        <AnimatedOutlet />
      </main>
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
        Data from <a className="underline" href="https://pokeapi.co" target="_blank" rel="noreferrer">PokéAPI</a>. Source on GitHub (coming soon).
      </footer>
    </div>
  )
}
