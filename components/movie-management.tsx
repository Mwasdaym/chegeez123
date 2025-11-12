"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/spinner"

interface Movie {
  id: string
  title: string
  image: string
  rating?: number
}

export default function MovieManagement() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://movieapi.giftedtech.co.ke/api/search/popular")
        const data = await response.json()
        setMovies(data.results?.items?.slice(0, 20) || [])
      } catch (error) {
        console.error("Failed to fetch movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  const filteredMovies = movies.filter((movie) => movie.title?.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-secondary border-border text-foreground placeholder-muted-foreground"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMovies.map((movie) => (
            <Card key={movie.id} className="bg-card border-border overflow-hidden">
              <div className="aspect-video bg-secondary relative overflow-hidden">
                <img src={movie.image || "/placeholder.svg"} alt={movie.title} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground truncate">{movie.title}</h3>
                <div className="flex justify-between items-center mt-4">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border hover:bg-secondary text-destructive bg-transparent"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
