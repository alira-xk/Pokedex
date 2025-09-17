import { Link } from 'react-router-dom'
import { prefetchPokemonDetailsRoute } from '../../app/routePrefetch'

type Props = {
  name: string
  sprite?: string | null
  favorite?: boolean
  onToggleFavorite?: () => void
}

export default function PokemonCard({ name, sprite, favorite, onToggleFavorite }: Props) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-3 flex flex-col gap-3 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-2">
  <Link to={`/pokemon/${name}`} onMouseEnter={prefetchPokemonDetailsRoute} className="font-semibold capitalize hover:underline tracking-wide">{name}</Link>
        {onToggleFavorite && (
          <button
            type="button"
            onClick={onToggleFavorite}
            className={`ml-auto text-xs rounded-full px-3 py-1 border transition-colors ${favorite ? 'bg-red-600 text-white border-red-600' : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
            aria-pressed={!!favorite}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {favorite ? '★ Favorite' : '☆ Favorite'}
          </button>
        )}
      </div>
  <Link to={`/pokemon/${name}`} onMouseEnter={prefetchPokemonDetailsRoute} className="block group">
        <div className="aspect-square grid place-items-center bg-neutral-50 dark:bg-neutral-900 rounded-lg overflow-hidden">
          {sprite ? (
            <img src={sprite} alt="" className="w-28 h-28 object-contain transition-transform duration-200 group-hover:scale-110" loading="lazy" />
          ) : (
            <div className="text-neutral-400">No image</div>
          )}
        </div>
      </Link>
    </div>
  )
}
