import { Link, useParams } from 'react-router-dom'
import { usePokemon } from './hooks'

export default function PokemonDetailsPage() {
  const { name = '' } = useParams()
  const { data, isLoading, isError, refetch } = usePokemon(name)

  if (isLoading) return <div>Loading…</div>
  if (isError || !data) return (
    <div className="space-y-3">
      <div className="p-4 border rounded text-red-700 border-red-300 bg-red-50">Error loading Pokémon.</div>
      <button className="underline" onClick={() => refetch()}>Retry</button>
      <div><Link className="underline" to="/">Back</Link></div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold capitalize">{data.name}</h1>
        <Link className="underline" to="/">Back to list</Link>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="aspect-square grid place-items-center bg-neutral-50 dark:bg-neutral-900 rounded-md">
          {data.sprites.front_default ? (
            <img src={data.sprites.front_default} alt="" className="w-48 h-48 object-contain" />
          ) : (
            <div className="text-neutral-400">No image</div>
          )}
        </div>
        <div className="space-y-4">
          <div>
            <div className="font-semibold">Types</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.types.map(t => (
                <span
                  key={t.type.name}
                  className={`px-2 py-1 rounded capitalize text-sm ${typeClass(t.type.name)}`}
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="font-semibold">Stats</div>
            <ul className="mt-2 space-y-2">
              {data.stats.map(s => (
                <li key={s.stat.name} className="flex items-center gap-3">
                  <span className="w-28 capitalize text-sm">{s.stat.name}</span>
                  <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded w-full overflow-hidden">
                    <div className="h-2 bg-red-600" style={{ width: `${Math.min(100, s.base_stat)}%` }} />
                  </div>
                  <span className="text-sm tabular-nums w-10 text-right">{s.base_stat}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold">Abilities</div>
            <ul className="mt-2 list-disc list-inside">
              {data.abilities.map(a => (
                <li key={a.ability.name} className="capitalize text-sm">{a.ability.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function typeClass(type: string) {
  const map: Record<string, string> = {
    normal: 'bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50',
    fire: 'bg-orange-200 dark:bg-orange-700 text-orange-900 dark:text-white',
    water: 'bg-blue-200 dark:bg-blue-700 text-blue-900 dark:text-white',
    electric: 'bg-yellow-200 dark:bg-yellow-600 text-yellow-900 dark:text-neutral-950',
    grass: 'bg-green-200 dark:bg-green-700 text-green-900 dark:text-white',
    ice: 'bg-cyan-200 dark:bg-cyan-700 text-cyan-900 dark:text-white',
    fighting: 'bg-red-300 dark:bg-red-800 text-red-950 dark:text-white',
    poison: 'bg-purple-200 dark:bg-purple-700 text-purple-900 dark:text-white',
    ground: 'bg-amber-200 dark:bg-amber-700 text-amber-900 dark:text-neutral-950',
    flying: 'bg-indigo-200 dark:bg-indigo-700 text-indigo-900 dark:text-white',
    psychic: 'bg-pink-200 dark:bg-pink-700 text-pink-900 dark:text-white',
    bug: 'bg-lime-200 dark:bg-lime-700 text-lime-900 dark:text-neutral-950',
    rock: 'bg-stone-300 dark:bg-stone-700 text-stone-900 dark:text-white',
    ghost: 'bg-violet-200 dark:bg-violet-700 text-violet-900 dark:text-white',
    dragon: 'bg-sky-200 dark:bg-sky-700 text-sky-900 dark:text-white',
    dark: 'bg-neutral-700 text-white',
    steel: 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white',
    fairy: 'bg-fuchsia-200 dark:bg-fuchsia-700 text-fuchsia-900 dark:text-white',
  }
  return map[type] ?? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50'
}
