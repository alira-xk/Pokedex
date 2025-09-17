export type PokemonListItem = { name: string; url: string }
export type PokemonListResponse = { count: number; next: string | null; previous: string | null; results: PokemonListItem[] }

export type PokemonDetails = {
  id: number
  name: string
  sprites: { front_default: string | null }
  types: { slot: number; type: { name: string; url: string } }[]
  stats: { base_stat: number; stat: { name: string } }[]
  abilities: { ability: { name: string } }[]
}

const API = 'https://pokeapi.co/api/v2'

export async function fetchPokemonPage(offset = 0, limit = 24): Promise<PokemonListResponse> {
  const res = await fetch(`${API}/pokemon?offset=${offset}&limit=${limit}`)
  if (!res.ok) throw new Error('Failed to fetch Pokémon list')
  return res.json()
}

export async function fetchPokemonByName(name: string): Promise<PokemonDetails> {
  const res = await fetch(`${API}/pokemon/${name}`)
  if (!res.ok) throw new Error('Pokémon not found')
  return res.json()
}
