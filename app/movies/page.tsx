"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import MovieGrid from "@/components/movie-grid"
import Footer from "@/components/footer"
import { Spinner } from "@/components/spinner"

export default function MoviesPage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://movieapi.giftedtech.co.ke/api/search/movie")
        const data = await response.json()
        if (data.results?.items) {
          setMovies(data.results.items.slice(0, 48))
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">All Movies</h1>

        {loading ? (
          <div className="flex items-center justify-center min-h-96">
            <Spinner />
          </div>
        ) : (
          <MovieGrid title="" movies={movies} />
        )}
      </div>

      <Footer />
    </div>
  )
}
