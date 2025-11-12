"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

interface VideoPlayerProps {
  streamUrl: string
  movieTitle: string
  quality: string
  language: string
  onClose: () => void
}

export default function VideoPlayer({ streamUrl, movieTitle, quality, language, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)
    const handleError = () => {
      setIsLoading(false)
      setError("Failed to load video. The stream may be temporarily unavailable.")
    }

    video.addEventListener("loadstart", handleLoadStart)
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("error", handleError)

    return () => {
      video.removeEventListener("loadstart", handleLoadStart)
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("error", handleError)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{movieTitle}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Quality: {quality} | Language: {language}
            </p>
          </div>
          <button onClick={onClose} className="text-3xl text-foreground hover:text-accent transition p-2">
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                <p className="text-foreground">Loading video...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
              <div className="text-center">
                <p className="text-red-500 text-lg mb-4">{error}</p>
                <p className="text-foreground text-sm">Try selecting a different quality or language</p>
              </div>
            </div>
          )}

          <video ref={videoRef} src={streamUrl} controls className="w-full h-full" crossOrigin="anonymous" />
        </div>

        <div className="mt-4 p-4 bg-card rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">
            Streaming from:{" "}
            <span className="text-foreground font-mono text-xs break-all">{streamUrl.substring(0, 60)}...</span>
          </p>
        </div>
      </div>
    </div>
  )
}
