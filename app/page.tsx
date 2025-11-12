"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import HeroBanner from "@/components/hero-banner"
import MovieGrid from "@/components/movie-grid"
import Footer from "@/components/footer"
import { Spinner } from "@/components/spinner"

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch("https://movieapi.giftedtech.co.ke/api/search/action")
        const data = await response.json()
        if (data.results?.items) {
          setTrendingMovies(data.results.items.slice(0, 24))
        }
      } catch (error) {
        console.error("Failed to fetch trending movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingMovies()
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
          <div className="px-4 md:px-8 py-8">
            <MovieGrid title="Trending Now" movies={trendingMovies} />
          </div>
          <Footer />
        </>
      )}
    </div>
  )
}
