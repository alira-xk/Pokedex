import { useEffect, useMemo, useState } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import type { PokemonDetails, PokemonListResponse } from './api'
import { fetchPokemonByName, fetchPokemonPage } from './api'

export function usePokemonPage(page: number, pageSize = 24) {
  const offset = (page - 1) * pageSize
  return useQuery<PokemonListResponse, Error>({
    queryKey: ['pokemon', 'page', { page, pageSize }],
    queryFn: () => fetchPokemonPage(offset, pageSize),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  })
}

export function usePokemon(name: string) {
  return useQuery<PokemonDetails, Error>({
    queryKey: ['pokemon', 'detail', name],
    queryFn: () => fetchPokemonByName(name),
    enabled: !!name,
    staleTime: 1000 * 60 * 10,
  })
}

const FAV_KEY = 'favorites'
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(FAV_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites))
  }, [favorites])

  const api = useMemo(() => ({
    add: (name: string) => setFavorites((prev: string[]) => prev.includes(name) ? prev : [...prev, name]),
    remove: (name: string) => setFavorites((prev: string[]) => prev.filter((n: string) => n !== name)),
    toggle: (name: string) => setFavorites((prev: string[]) => prev.includes(name) ? prev.filter((n: string) => n !== name) : [...prev, name]),
    has: (name: string) => favorites.includes(name),
  }), [favorites])

  return { favorites, ...api }
}
