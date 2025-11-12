"use client"

import MovieCard from "./movie-card"

interface MovieGridProps {
  title: string
  movies: any[]
}

export default function MovieGrid({ title, movies }: MovieGridProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.subjectId} movie={movie} />
        ))}
      </div>
    </section>
  )
}
