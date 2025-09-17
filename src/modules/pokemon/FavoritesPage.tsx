import { useFavorites } from './hooks'
import PokemonCard from './components/PokemonCard'
import { useQueries } from '@tanstack/react-query'
import { fetchPokemonByName } from './api'

export default function FavoritesPage() {
  const { favorites, remove } = useFavorites()
  const queries = useQueries({
    queries: favorites.map((name) => ({
      queryKey: ['pokemon', 'detail', name],
      queryFn: () => fetchPokemonByName(name),
      enabled: !!name,
      staleTime: 1000 * 60 * 10,
    })),
  })
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {queries.map((q, i) => {
            const name = favorites[i]
            if (q.isLoading || q.isError || !q.data) {
              return (
                <div key={name} className="h-40 rounded bg-neutral-100 dark:bg-neutral-900 animate-pulse" />
              )
            }
            const sprite = q.data.sprites.front_default ?? undefined
            return (
              <PokemonCard key={name} name={name} sprite={sprite} onToggleFavorite={() => remove(name)} favorite />
            )
          })}
        </div>
      )}
    </div>
  )
}
