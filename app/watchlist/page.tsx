"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import MovieGrid from "@/components/movie-grid"
import Footer from "@/components/footer"

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("watchlist")
    if (saved) {
      setWatchlist(JSON.parse(saved))
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">My Watchlist</h1>

        {watchlist.length > 0 ? (
          <MovieGrid title="" movies={watchlist} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-4">Your watchlist is empty</p>
            <a href="/movies" className="text-accent hover:underline">
              Browse movies to add to your watchlist
            </a>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
