"use client"

import { X } from "lucide-react"
import { useState, useEffect } from "react"

interface TrailerModalProps {
  isOpen: boolean
  onClose: () => void
  movieTitle: string
  movieId: string
}

export default function TrailerModal({ isOpen, onClose, movieTitle, movieId }: TrailerModalProps) {
  const [trailerUrl, setTrailerUrl] = useState("")

  useEffect(() => {
    if (isOpen) {
      // Construct trailer URL using YouTube embed
      setTrailerUrl(`https://www.youtube.com/embed/${movieId}?autoplay=1`)
    }
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
        <div className="relative w-full bg-black" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={trailerUrl}
            title={`${movieTitle} Trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
