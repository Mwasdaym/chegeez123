"use client"

import Link from "next/link"
import Image from "next/image"
import { Play, Film } from "lucide-react"
import { useState } from "react"
import TrailerModal from "./trailer-modal"

interface MovieCardProps {
  movie: any
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [hovered, setHovered] = useState(false)
  const [showTrailer, setShowTrailer] = useState(false)

  // Extract trailer ID from movie data (YouTube ID or similar)
  const trailerId = movie.trailerUrl?.split("/").pop() || movie.subjectId

  return (
    <>
      <TrailerModal
        isOpen={showTrailer}
        onClose={() => setShowTrailer(false)}
        movieTitle={movie.title}
        movieId={trailerId}
      />

      <Link href={`/movie/${movie.subjectId}`}>
        <div
          className="relative group cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:scale-110 hover:z-50"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Poster Image */}
          <div className="relative aspect-[2/3] bg-card overflow-hidden">
            {movie.cover?.url ? (
              <Image
                src={movie.cover.url || "/placeholder.svg"}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-xs text-muted-foreground">No image</span>
              </div>
            )}

            {hovered && (
              <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center gap-3 p-4">
                <div className="space-y-2 w-full">
                  <button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-2 px-4 rounded-md flex items-center justify-center gap-2 transition">
                    <Play className="w-4 h-4" fill="currentColor" />
                    Watch Now
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      setShowTrailer(true)
                    }}
                    className="w-full bg-card hover:bg-card/80 text-foreground font-bold py-2 px-4 rounded-md border border-border transition flex items-center justify-center gap-2"
                  >
                    <Film className="w-4 h-4" />
                    Trailer
                  </button>
                  <button className="w-full bg-card hover:bg-card/80 text-foreground font-bold py-2 px-4 rounded-md border border-border transition">
                    Episodes
                  </button>
                </div>
                <div className="text-center pt-2">
                  {movie.imdbRatingValue && <p className="text-sm font-bold text-accent">★ {movie.imdbRatingValue}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="p-3 bg-card/50 absolute bottom-0 left-0 right-0">
            <h3 className="text-xs md:text-sm font-semibold text-foreground line-clamp-2 group-hover:text-accent transition">
              {movie.title}
            </h3>
            {movie.releaseDate && (
              <p className="text-xs text-muted-foreground mt-1">{new Date(movie.releaseDate).getFullYear()}</p>
            )}
          </div>
        </div>
      </Link>
    </>
  )
}
