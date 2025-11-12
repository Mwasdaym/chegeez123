"use client"

import MovieCard from "./movie-card"

interface MovieGridProps {
  title: string
  movies: any[]
}

export default function MovieGrid({ title, movies }: MovieGridProps) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">{title}</h2>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 lg:gap-4 xl:grid-cols-6 xl:gap-4">
        {movies && movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-muted-foreground col-span-full">No movies found</p>
        )}
      </div>
    </section>
  )
}
