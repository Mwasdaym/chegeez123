"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import HeroBanner from "@/components/hero-banner"
import MovieGrid from "@/components/movie-grid"
import Footer from "@/components/footer"
import { Spinner } from "@/components/spinner"

interface Movie {
  id?: string
  subjectId?: string
  title?: string
  name?: string
  cover?: { url: string }
  imdbRatingValue?: number
  releaseDate?: string
  ranking?: number
}

const MOVIE_API = "https://movieapi.giftedtech.co.ke"

async function fetchMovies(query: string): Promise<Movie[]> {
  try {
    const response = await fetch(`${MOVIE_API}/api/search/${encodeURIComponent(query)}`)
    if (!response.ok) throw new Error("Failed to fetch")
    const data = await response.json()
    const items = data.results?.items || data.items || []
    return items.map((movie: any) => ({
      id: movie.subjectId,
      subjectId: movie.subjectId,
      title: movie.title,
      cover: movie.cover,
      imdbRatingValue: movie.imdbRatingValue,
      releaseDate: movie.releaseDate,
    }))
  } catch (error) {
    console.error("[v0] Error fetching from Movie API:", error)
    return []
  }
}

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([])
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [newMovies, setNewMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchContent = async () => {
      try {
        console.log("[v0] Fetching movies from Movie API...")
        const [trending, popular, newReleases] = await Promise.all([
          fetchMovies("action"),
          fetchMovies("marvel"),
          fetchMovies("new"),
        ])

        console.log("[v0] Trending movies:", trending.length)
        console.log("[v0] Popular movies:", popular.length)
        console.log("[v0] New movies:", newReleases.length)

        setTrendingMovies(trending.slice(0, 24))
        setPopularMovies(popular.slice(0, 24))
        setNewMovies(newReleases.slice(0, 24))
      } catch (error) {
        console.error("[v0] Failed to fetch content:", error)
        setError("Failed to load movies")
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  const featuredMovie = trendingMovies[0]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center text-red-500">
            <p className="text-xl font-bold">{error}</p>
            <p className="text-sm mt-2">Check console for details</p>
          </div>
        </div>
      ) : (
        <>
          {featuredMovie && <HeroBanner movie={featuredMovie} />}
          <div className="px-4 md:px-8 py-8 space-y-12">
            {trendingMovies.length > 0 ? (
              <MovieGrid title="Trending Now" movies={trendingMovies} />
            ) : (
              <div className="text-white text-center py-8">No trending movies found</div>
            )}
            {popularMovies.length > 0 ? (
              <MovieGrid title="Popular Now" movies={popularMovies} />
            ) : (
              <div className="text-white text-center py-8">No popular movies found</div>
            )}
            {newMovies.length > 0 ? (
              <MovieGrid title="New Releases" movies={newMovies} />
            ) : (
              <div className="text-white text-center py-8">No new releases found</div>
            )}
          </div>
          <Footer />
        </>
      )}
    </div>
  )
}
