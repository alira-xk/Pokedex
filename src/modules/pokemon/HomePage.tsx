import { useEffect, useMemo, useState } from 'react'
import { usePokemonPage, useFavorites } from './hooks'
import PokemonCard from './components/PokemonCard'
import SearchBar from './components/SearchBar'
import { fetchPokemonByName, type PokemonListItem } from './api'
import Parallax from '../ui/Parallax'
import pokeballUrl from '../../assets/pokeball.svg'

export default function HomePage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const { data, isLoading, isError, refetch } = usePokemonPage(page)
  const [searchResult, setSearchResult] = useState<{ name: string; sprite: string | null } | null>(null)
  const [searching, setSearching] = useState(false)
  const { favorites, toggle } = useFavorites()

  useEffect(() => {
    if (!search) { setSearchResult(null); return }
    const t = setTimeout(async () => {
      setSearching(true)
      try {
        const p = await fetchPokemonByName(search.toLowerCase())
        setSearchResult({ name: p.name, sprite: p.sprites.front_default })
      } catch {
        setSearchResult(null)
      } finally {
        setSearching(false)
      }
    }, 350)
    return () => clearTimeout(t)
  }, [search])

  const items = useMemo<PokemonListItem[]>(() => {
    if (!data) return []
    return data.results
  }, [data])

  return (
    <div className="space-y-8">
      <Parallax
        height={280}
        layers={[
          { speed: -0.25, className: 'bg-gradient-to-r from-red-600/20 to-yellow-500/20', children: <div className="w-full h-full" /> },
          { speed: -0.4, className: 'grid place-items-center text-red-600/40 dark:text-red-400/40', children: <img src={pokeballUrl} alt="" className="w-40 h-40 opacity-60" /> },
          { speed: -0.1, className: 'p-6 flex items-end', children: <h2 className="text-3xl md:text-4xl font-extrabold">Discover Pokémon</h2> },
        ]}
      />
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <SearchBar value={search} onChange={setSearch} />
        <div className="flex gap-2 self-end sm:self-auto">
          <button
            className="rounded border px-3 py-2 text-sm disabled:opacity-50"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1 || !!search}
          >Prev</button>
          <button
            className="rounded border px-3 py-2 text-sm disabled:opacity-50"
            onClick={() => setPage(p => p + 1)}
            disabled={!!search}
          >Next</button>
        </div>
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-40 rounded-lg bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
          ))}
        </div>
      )}

      {isError && (
        <div className="p-4 border rounded text-red-700 border-red-300 bg-red-50">
          Error loading Pokémon. <button className="underline" onClick={() => refetch()}>Retry</button>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {search ? (
            searching ? (<div className="col-span-full">Searching…</div>) : (
              searchResult ? (
                <PokemonCard
                  name={searchResult.name}
                  sprite={searchResult.sprite ?? undefined}
                  favorite={favorites.includes(searchResult.name)}
                  onToggleFavorite={() => toggle(searchResult.name)}
                />
              ) : (
                <div className="col-span-full">No results for "{search}"</div>
              )
            )
          ) : (
            items.map(item => {
              const id = item.url.split('/').filter(Boolean).pop()
              const sprite = id ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` : null
              return (
                <PokemonCard
                  key={item.name}
                  name={item.name}
                  sprite={sprite}
                  favorite={favorites.includes(item.name)}
                  onToggleFavorite={() => toggle(item.name)}
                />
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
