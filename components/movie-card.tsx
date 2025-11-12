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
  const [imageError, setImageError] = useState(false)

  const movieId = movie.id || movie.subjectId
  const posterUrl = movie.cover?.url || "/abstract-movie-poster.png"
  const title = movie.title
  const rating = movie.imdbRatingValue
  const releaseDate = movie.releaseDate

  return (
    <>
      <TrailerModal isOpen={showTrailer} onClose={() => setShowTrailer(false)} movieTitle={title} movieId={movieId} />

      <div
        className="relative group cursor-pointer overflow-hidden rounded transition-all duration-300 smooth-scale hover-lift"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative aspect-[2/3] bg-card overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
          {!imageError ? (
            <Image
              src={posterUrl || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover brightness-90 group-hover:brightness-100 transition duration-200"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
              priority={false}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
              <Film className="w-12 h-12 text-muted-foreground" />
            </div>
          )}

          {hovered && (
            <div className="absolute inset-0 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-4 animate-in fade-in">
              <div className="space-y-3 w-full">
                <Link href={`/movie/${movieId}`}>
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
              {rating && (
                <div className="text-center pt-2">
                  <p className="text-lg font-black text-accent">★ {rating.toFixed(1)}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-4 bg-gradient-to-t from-black via-black/80 to-transparent absolute bottom-0 left-0 right-0">
          <h3 className="text-sm md:text-base font-bold text-foreground line-clamp-2 group-hover:text-accent transition">
            {title}
          </h3>
          {releaseDate && <p className="text-xs text-muted-foreground mt-1">{new Date(releaseDate).getFullYear()}</p>}
        </div>
      </div>
    </>
  )
}
