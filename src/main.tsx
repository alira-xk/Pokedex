import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import RootLayout from './modules/app/RootLayout'
import { PageSkeleton, DetailsSkeleton } from './modules/ui/Skeletons'

const HomePage = lazy(() => import('./modules/pokemon/HomePage'))
const PokemonDetailsPage = lazy(() => import('./modules/pokemon/PokemonDetailsPage'))
const FavoritesPage = lazy(() => import('./modules/pokemon/FavoritesPage'))
const AboutPage = lazy(() => import('./modules/misc/AboutPage'))

import AnimatedOutlet from './modules/app/route-animations/AnimatedOutlet'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageSkeleton /> }>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'pokemon/:name',
        element: (
          <Suspense fallback={<DetailsSkeleton /> }>
            <PokemonDetailsPage />
          </Suspense>
        ),
      },
      {
        path: 'favorites',
        element: (
          <Suspense fallback={<PageSkeleton /> }>
            <FavoritesPage />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<PageSkeleton /> }>
            <AboutPage />
          </Suspense>
        ),
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
