"use client"

import Link from "next/link"
import Image from "next/image"
import { Play, Info } from "lucide-react"

interface HeroBannerProps {
  movie: any
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  return (
    <div className="relative h-96 md:h-screen overflow-hidden bg-gradient-to-b from-black/50 to-background">
      {/* Background Image */}
      {movie.cover?.url && (
        <div className="absolute inset-0 z-0">
          <Image src={movie.cover.url || "/placeholder.svg"} alt={movie.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-end px-4 md:px-8 pb-20">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">{movie.title}</h1>

          <div className="flex items-center gap-4 text-sm md:text-base">
            {movie.imdbRatingValue && (
              <div className="flex items-center gap-1">
                <span className="text-accent">★</span>
                <span>{movie.imdbRatingValue}</span>
              </div>
            )}
            {movie.releaseDate && (
              <span className="text-muted-foreground">{new Date(movie.releaseDate).getFullYear()}</span>
            )}
            {movie.duration && <span className="text-muted-foreground">{Math.floor(movie.duration / 60)}m</span>}
            {movie.genre && <span className="text-muted-foreground">{movie.genre.split(",")[0]}</span>}
          </div>

          <p className="text-foreground/80 max-w-lg line-clamp-2">
            {movie.description || "Watch this amazing movie now"}
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 pt-4">
            <Link href={`/movie/${movie.subjectId}`}>
              <button className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:bg-accent/90 transition">
                <Play className="w-5 h-5" />
                Play
              </button>
            </Link>
            <Link href={`/movie/${movie.subjectId}`}>
              <button className="flex items-center gap-2 bg-card border border-border text-foreground px-6 py-3 rounded-lg font-bold hover:bg-card/80 transition">
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
