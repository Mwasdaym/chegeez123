"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import MovieGrid from "@/components/movie-grid"
import Footer from "@/components/footer"
import { Spinner } from "@/components/spinner"

export default function TVShowsPage() {
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch("https://movieapi.giftedtech.co.ke/api/search/tv")
        const data = await response.json()
        if (data.results?.items) {
          setShows(data.results.items.slice(0, 48))
        }
      } catch (error) {
        console.error("Failed to fetch TV shows:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchShows()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">TV Shows</h1>

        {loading ? (
          <div className="flex items-center justify-center min-h-96">
            <Spinner />
          </div>
        ) : (
          <MovieGrid title="" movies={shows} />
        )}
      </div>

      <Footer />
    </div>
  )
}
