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

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [trending, action, drama] = await Promise.all([
          getTrendingMovies(),
          getMoviesByGenre(28), // Action
          getMoviesByGenre(18), // Drama
        ])

        setTrendingMovies(trending.slice(0, 24))
        setActionMovies(action.slice(0, 24))
        setDramaMovies(drama.slice(0, 24))
      } catch (error) {
        console.error("Failed to fetch content:", error)
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
      ) : (
        <>
          {featuredMovie && <HeroBanner movie={featuredMovie} />}
          <div className="px-4 md:px-8 py-8 space-y-12">
            <MovieGrid title="Trending Now" movies={trendingMovies} />
            <MovieGrid title="Action Movies" movies={actionMovies} />
            <MovieGrid title="Drama Series" movies={dramaMovies} />
          </div>
          <Footer />
        </>
      )}
    </div>
  )
}
