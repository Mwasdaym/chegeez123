const TMDB_API_KEY = "a20daf51bdc3107a8d89eae45e095754"
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export interface TMDBMovie {
  id: number
  title: string
  poster_path: string
  backdrop_path: string
  overview: string
  release_date: string
  vote_average: number
  genres: { id: number; name: string }[]
  runtime: number
  budget: number
  revenue: number
  production_companies: { id: number; name: string; logo_path: string | null }[]
  cast: {
    id: number
    name: string
    character: string
    profile_path: string | null
  }[]
  recommendations: {
    results: Array<{
      id: number
      title: string
      poster_path: string
      release_date: string
    }>
  }
  videos: {
    results: Array<{
      id: string
      name: string
      key: string
      site: string
      type: string
    }>
  }
}

export async function searchTMDBMovies(query: string) {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`,
    )
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error("Failed to search TMDB:", error)
    return []
  }
}

export async function getTMDBMovieDetails(movieId: number): Promise<TMDBMovie | null> {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=credits,recommendations,videos`,
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error("Failed to fetch TMDB movie details:", error)
    return null
  }
}

export async function getTrendingMovies() {
  try {
    const response = await fetch(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`)
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error("Failed to fetch trending movies:", error)
    return []
  }
}

export async function getMoviesByGenre(genreId: number) {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`,
    )
    const data = await response.json()
    return data.results || []
  } catch (error) {
    console.error("Failed to fetch movies by genre:", error)
    return []
  }
}

export function getTMDBImageUrl(path: string | null, size = "w500") {
  if (!path) return "/placeholder.svg"
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export function getYouTubeTrailerUrl(videos: any[] | undefined) {
  if (!videos) return null
  const trailer = videos.find((v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"))
  return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null
}
