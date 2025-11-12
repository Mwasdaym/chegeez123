"use client"

import Link from "next/link"
import Image from "next/image"
import { Play } from "lucide-react"
import { useState } from "react"

interface MovieCardProps {
  movie: any
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/movie/${movie.subjectId}`}>
      <div
        className="relative group cursor-pointer overflow-hidden rounded-lg transition-transform hover:scale-105"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Poster Image */}
        <div className="relative aspect-video bg-card overflow-hidden">
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

          {/* Overlay on Hover */}
          {hovered && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-2">
              <Play className="w-8 h-8 text-accent" fill="currentColor" />
              <p className="text-xs font-bold text-center px-2">
                {movie.imdbRatingValue && `★ ${movie.imdbRatingValue}`}
              </p>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="p-2">
          <h3 className="text-xs md:text-sm font-semibold text-foreground line-clamp-2 group-hover:text-accent transition">
            {movie.title}
          </h3>
          {movie.releaseDate && (
            <p className="text-xs text-muted-foreground mt-1">{new Date(movie.releaseDate).getFullYear()}</p>
          )}
        </div>
      </div>
    </Link>
  )
}
