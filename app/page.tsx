"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import HeroBanner from "@/components/hero-banner"
import MovieGrid from "@/components/movie-grid"
import Footer from "@/components/footer"
import { Spinner } from "@/components/spinner"
import { getTrendingMovies, getMoviesByGenre } from "@/lib/tmdb"

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [actionMovies, setActionMovies] = useState([])
  const [dramaMovies, setDramaMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchContent = async () => {
      try {
        console.log("[v0] Fetching trending movies...")
        const [trending, action, drama] = await Promise.all([
          getTrendingMovies(),
          getMoviesByGenre(28), // Action
          getMoviesByGenre(18), // Drama
        ])

        console.log("[v0] Trending movies:", trending.length)
        console.log("[v0] Action movies:", action.length)
        console.log("[v0] Drama movies:", drama.length)

        setTrendingMovies(trending.slice(0, 24))
        setActionMovies(action.slice(0, 24))
        setDramaMovies(drama.slice(0, 24))
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
            {actionMovies.length > 0 ? (
              <MovieGrid title="Action Movies" movies={actionMovies} />
            ) : (
              <div className="text-white text-center py-8">No action movies found</div>
            )}
            {dramaMovies.length > 0 ? (
              <MovieGrid title="Drama Series" movies={dramaMovies} />
            ) : (
              <div className="text-white text-center py-8">No drama movies found</div>
            )}
          </div>
          <Footer />
        </>
      )}
    </div>
  )
}
