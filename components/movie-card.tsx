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

  const trailerId = movie.trailerUrl?.split("/").pop() || movie.subjectId

  return (
    <>
      <TrailerModal
        isOpen={showTrailer}
        onClose={() => setShowTrailer(false)}
        movieTitle={movie.title}
        movieId={trailerId}
      />

      <div
        className="relative group cursor-pointer overflow-hidden rounded transition-all duration-300 smooth-scale hover-lift"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative aspect-[2/3] bg-card overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
          {movie.cover?.url ? (
            <Image
              src={movie.cover.url || "/placeholder.svg"}
              alt={movie.title}
              fill
              className="object-cover brightness-90 group-hover:brightness-100 transition duration-200"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-xs text-muted-foreground">No image</span>
            </div>
          )}

          {hovered && (
            <div className="absolute inset-0 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-4 animate-in fade-in">
              <div className="space-y-3 w-full">
                <Link href={`/movie/${movie.subjectId}`}>
                  <button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 px-4 rounded flex items-center justify-center gap-2 transition transform hover:scale-105">
                    <Play className="w-5 h-5" fill="currentColor" />
                    Watch Now
                  </button>
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setShowTrailer(true)
                  }}
                  className="w-full bg-white/20 hover:bg-white/30 text-foreground font-bold py-3 px-4 rounded border border-white/20 transition flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  <Film className="w-5 h-5" />
                  Trailer
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 text-foreground font-bold py-3 px-4 rounded border border-white/10 transition backdrop-blur-sm">
                  Episodes
                </button>
              </div>
              {movie.imdbRatingValue && (
                <div className="text-center pt-2">
                  <p className="text-lg font-black text-accent">★ {movie.imdbRatingValue}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-4 bg-gradient-to-t from-black via-black/80 to-transparent absolute bottom-0 left-0 right-0">
          <h3 className="text-sm md:text-base font-bold text-foreground line-clamp-2 group-hover:text-accent transition">
            {movie.title}
          </h3>
          {movie.releaseDate && (
            <p className="text-xs text-muted-foreground mt-1">{new Date(movie.releaseDate).getFullYear()}</p>
          )}
        </div>
      </div>
    </>
  )
}
