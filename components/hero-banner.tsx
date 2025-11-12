"use client"

import Link from "next/link"
import Image from "next/image"
import { Play, Info } from "lucide-react"
import { useState } from "react"

interface HeroBannerProps {
  movie: any
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="relative h-96 md:h-[70vh] overflow-hidden bg-black">
      {movie.cover?.url && !imageError && (
        <div className="absolute inset-0 z-0">
          <Image
            src={movie.cover.url || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover brightness-75"
            priority
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center md:items-end px-6 md:px-12 pb-12 md:pb-16">
        <div className="max-w-2xl space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-tight">{movie.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-foreground/80">
            {movie.imdbRatingValue && (
              <div className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded">
                <span className="text-accent text-lg">★</span>
                <span className="font-bold">{movie.imdbRatingValue}</span>
              </div>
            )}
            {movie.releaseDate && <span className="font-medium">{new Date(movie.releaseDate).getFullYear()}</span>}
            {movie.duration && <span className="font-medium">{Math.floor(movie.duration / 60)}m</span>}
            {movie.genre && <span className="font-medium">{movie.genre.split(",")[0]}</span>}
          </div>

          <p className="text-foreground/90 text-base md:text-lg max-w-lg line-clamp-3 leading-relaxed">
            {movie.description || "Watch this amazing movie now"}
          </p>

          <div className="flex gap-4 pt-6">
            <Link href={`/movie/${movie.subjectId}`}>
              <button className="flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded font-bold text-base transition duration-200 transform hover:scale-105">
                <Play className="w-6 h-6" fill="currentColor" />
                Play
              </button>
            </Link>
            <Link href={`/movie/${movie.subjectId}`}>
              <button className="flex items-center gap-3 bg-white/20 hover:bg-white/30 text-foreground px-8 py-3 rounded font-bold text-base transition duration-200 backdrop-blur-sm">
                <Info className="w-5 h-5" />
                More Info
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
