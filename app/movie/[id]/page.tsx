"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Spinner } from "@/components/spinner"
import VideoPlayer from "@/components/video-player"
import TrailerModal from "@/components/trailer-modal"
import { Download, Share2, Heart, Play, List, Film } from "lucide-react"
import Image from "next/image"

interface MovieSource {
  id: string
  quality: string
  download_url: string
  size: string
  format: string
}

export default function MovieDetailPage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const [movie, setMovie] = useState<any>(null)
  const [sources, setSources] = useState<MovieSource[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedQuality, setSelectedQuality] = useState("720p")
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [isFavorite, setIsFavorite] = useState(false)
  const [showEpisodes, setShowEpisodes] = useState(false)
  const [showTrailer, setShowTrailer] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [infoRes, sourcesRes] = await Promise.all([
          fetch(`https://movieapi.giftedtech.co.ke/api/info/${id}`),
          fetch(`https://movieapi.giftedtech.co.ke/api/sources/${id}`),
        ])

        const infoData = await infoRes.json()
        const sourcesData = await sourcesRes.json()

        if (infoData.results?.subject) {
          setMovie(infoData.results.subject)
        }
        if (sourcesData.results) {
          const parsedSources = sourcesData.results.map((source: any) => ({
            id: source.id,
            quality: source.quality,
            download_url: decodeURIComponent(source.download_url),
            size: source.size,
            format: source.format,
          }))
          setSources(parsedSources)

          const quality720p = parsedSources.find((s: any) => s.quality === "720p")
          if (quality720p) {
            setSelectedQuality("720p")
          } else if (parsedSources.length > 0) {
            setSelectedQuality(parsedSources[0].quality)
          }
        }
      } catch (error) {
        console.error("[v0] Failed to fetch movie details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

  const handleAddToWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]")
    const isInList = watchlist.find((m: any) => m.subjectId === movie?.subjectId)

    if (isInList) {
      const updated = watchlist.filter((m: any) => m.subjectId !== movie?.subjectId)
      localStorage.setItem("watchlist", JSON.stringify(updated))
    } else {
      watchlist.push(movie)
      localStorage.setItem("watchlist", JSON.stringify(watchlist))
    }
    setIsFavorite(!isFavorite)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-muted-foreground">Movie not found</p>
        </div>
      </div>
    )
  }

  const selectedSource = sources.find((s) => s.quality === selectedQuality)
  const qualityOptions = sources.map((s) => ({
    quality: s.quality,
    size: s.size ? `${(Number.parseInt(s.size) / 1024 / 1024 / 1024).toFixed(2)} GB` : "Unknown",
  }))

  return (
    <div className="min-h-screen bg-background">
      <TrailerModal
        isOpen={showTrailer}
        onClose={() => setShowTrailer(false)}
        movieTitle={movie?.title || "Movie"}
        movieId={movie?.subjectId || ""}
      />

      {showPlayer && selectedSource && (
        <VideoPlayer
          streamUrl={selectedSource.download_url}
          movieTitle={movie.title}
          quality={selectedQuality}
          language={selectedLanguage}
          onClose={() => setShowPlayer(false)}
        />
      )}

      <Navigation />

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden bg-gradient-to-b from-black/50 to-background">
        {movie.stills?.url && (
          <div className="absolute inset-0 z-0">
            <Image src={movie.stills.url || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
          </div>
        )}

        <div className="relative z-10 h-full flex items-end px-4 md:px-8 pb-8">
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 text-foreground hover:text-accent transition"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Title & Info */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">{movie.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                {movie.imdbRatingValue && (
                  <div className="flex items-center gap-1 bg-card px-3 py-1 rounded">
                    <span className="text-accent">★</span>
                    <span>{movie.imdbRatingValue}</span>
                  </div>
                )}
                {movie.releaseDate && (
                  <span className="text-muted-foreground">{new Date(movie.releaseDate).getFullYear()}</span>
                )}
                {movie.duration && <span className="text-muted-foreground">{Math.floor(movie.duration / 60)}m</span>}
                {movie.countryName && <span className="text-muted-foreground">{movie.countryName}</span>}
              </div>

              {movie.genre && (
                <div className="flex flex-wrap gap-2">
                  {movie.genre.split(",").map((g: string) => (
                    <span key={g} className="bg-card px-3 py-1 rounded text-xs text-foreground">
                      {g.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            {movie.description && (
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-foreground">Synopsis</h2>
                <p className="text-foreground/80 leading-relaxed">{movie.description}</p>
              </div>
            )}

            {/* Cast */}
            {movie.stars && movie.stars.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">Cast</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {movie.stars.slice(0, 6).map((actor: any) => (
                    <div key={actor.staffId} className="text-center">
                      {actor.avatarUrl && (
                        <div className="relative w-20 h-20 mx-auto mb-2 rounded-lg overflow-hidden">
                          <Image
                            src={actor.avatarUrl || "/placeholder.svg"}
                            alt={actor.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <p className="font-semibold text-sm text-foreground">{actor.name}</p>
                      {actor.character && <p className="text-xs text-muted-foreground">as {actor.character}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video Player Controls */}
            <div className="space-y-6 bg-card p-6 rounded-lg border border-border">
              <h2 className="text-2xl font-bold text-foreground">Watch Now</h2>

              <div className="space-y-4">
                {/* Quality Selection */}
                {qualityOptions.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Video Quality</label>
                    <div className="flex flex-wrap gap-2">
                      {qualityOptions.map((option) => (
                        <button
                          key={option.quality}
                          onClick={() => setSelectedQuality(option.quality)}
                          className={`px-4 py-2 rounded-lg font-semibold transition ${
                            selectedQuality === option.quality
                              ? "bg-accent text-accent-foreground"
                              : "bg-background hover:bg-background/80 text-foreground border border-border"
                          }`}
                        >
                          {option.quality}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Language/Translation Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Audio Language</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-4 py-2 bg-background text-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option>
                    <option value="zh">Chinese</option>
                    <option value="ar">Arabic</option>
                    <option value="pt">Portuguese</option>
                    <option value="ru">Russian</option>
                  </select>
                </div>
              </div>

              {/* Download Button */}
              {selectedSource && (
                <a
                  href={selectedSource.download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:bg-accent/90 transition w-full justify-center"
                >
                  <Download className="w-5 h-5" />
                  Download {selectedSource.quality} (
                  {(Number.parseInt(selectedSource.size) / 1024 / 1024 / 1024).toFixed(2)} GB)
                </a>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Poster */}
            {movie.cover?.url && (
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                <Image src={movie.cover.url || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={() => setShowPlayer(true)}
                disabled={!selectedSource}
                className="w-full bg-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-accent-foreground font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition"
              >
                <Play className="w-5 h-5" fill="currentColor" />
                Watch Now
              </button>
              <button
                onClick={() => setShowTrailer(true)}
                className="w-full bg-card hover:bg-card/80 text-foreground font-bold py-3 px-4 rounded-lg border border-border flex items-center justify-center gap-2 transition"
              >
                <Film className="w-5 h-5" />
                Trailer
              </button>
              <button
                onClick={() => setShowEpisodes(!showEpisodes)}
                className="w-full bg-card hover:bg-card/80 text-foreground font-bold py-3 px-4 rounded-lg border border-border flex items-center justify-center gap-2 transition"
              >
                <List className="w-5 h-5" />
                Episodes
              </button>
            </div>

            {/* Episodes Section */}
            {showEpisodes && (
              <div className="bg-card p-4 rounded-lg border border-border space-y-3 max-h-96 overflow-y-auto">
                <h3 className="font-bold text-foreground text-lg">Episodes</h3>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((ep) => (
                    <button
                      key={ep}
                      className="w-full text-left p-3 bg-background hover:bg-background/80 rounded-lg transition border border-border text-sm text-foreground hover:text-accent"
                    >
                      Episode {ep}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Watchlist Button */}
            <button
              onClick={handleAddToWatchlist}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold transition ${
                isFavorite
                  ? "bg-accent text-accent-foreground"
                  : "bg-card text-foreground hover:bg-card/80 border border-border"
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
              Watchlist
            </button>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-card text-foreground rounded-lg font-bold hover:bg-card/80 transition border border-border">
              <Share2 className="w-5 h-5" />
              Share
            </button>

            {/* Additional Info */}
            {movie.subtitles && (
              <div className="bg-card p-4 rounded-lg space-y-2 border border-border">
                <h3 className="font-bold text-foreground">Subtitles</h3>
                <p className="text-sm text-foreground/80">{movie.subtitles}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
