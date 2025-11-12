"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Navigation from "@/components/navigation"
import MovieGrid from "@/components/movie-grid"
import Footer from "@/components/footer"
import { Spinner } from "@/components/spinner"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!query) {
      setLoading(false)
      return
    }

    const fetchResults = async () => {
      try {
        const response = await fetch(`https://movieapi.giftedtech.co.ke/api/search/${encodeURIComponent(query)}`)
        const data = await response.json()
        if (data.results?.items) {
          setResults(data.results.items.slice(0, 48))
        }
      } catch (error) {
        console.error("Failed to search:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Search Results</h1>
        <p className="text-muted-foreground mb-8">{query ? `Results for "${query}"` : "Enter a search query"}</p>

        {loading ? (
          <div className="flex items-center justify-center min-h-96">
            <Spinner />
          </div>
        ) : results.length > 0 ? (
          <MovieGrid title="" movies={results} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No results found for "{query}"</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
