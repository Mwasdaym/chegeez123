"use client"

import { X } from "lucide-react"
import { useState, useEffect } from "react"
import { Spinner } from "./spinner"

interface TrailerModalProps {
  isOpen: boolean
  onClose: () => void
  movieTitle: string
  movieId: string
}

export default function TrailerModal({ isOpen, onClose, movieTitle, movieId }: TrailerModalProps) {
  const [trailerUrl, setTrailerUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTrailer = async () => {
      if (!isOpen) return

      setLoading(true)
      setError("")

      try {
        console.log("[v0] Fetching trailer for movie ID:", movieId)

        const response = await fetch(`https://movieapi.giftedtech.co.ke/api/trailer/${movieId}`)
        const data = await response.json()

        console.log("[v0] Trailer response:", data)

        if (data.results?.download_url) {
          const trailerVideoUrl = decodeURIComponent(data.results.download_url)
          setTrailerUrl(trailerVideoUrl)
        } else {
          setError("Trailer not available for this movie")
        }
      } catch (err) {
        console.error("[v0] Failed to fetch trailer:", err)
        setError("Failed to load trailer")
      } finally {
        setLoading(false)
      }
    }

    fetchTrailer()
  }, [isOpen, movieId])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card rounded-lg overflow-hidden max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">{movieTitle} - Trailer</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition"
            aria-label="Close trailer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Video Container */}
        {loading && (
          <div
            className="relative w-full bg-black flex items-center justify-center"
            style={{ paddingBottom: "56.25%" }}
          >
            <Spinner />
          </div>
        )}

        {error && (
          <div
            className="relative w-full bg-black p-8 flex items-center justify-center"
            style={{ paddingBottom: "56.25%" }}
          >
            <p className="text-accent text-center">{error}</p>
          </div>
        )}

        {trailerUrl && !loading && (
          <div className="relative w-full bg-black" style={{ paddingBottom: "56.25%" }}>
            <video className="absolute inset-0 w-full h-full" controls autoPlay controlsList="nodownload">
              <source src={trailerUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  )
}
