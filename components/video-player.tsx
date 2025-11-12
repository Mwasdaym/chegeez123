"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import CaptionSelector from "./caption-selector"

interface VideoPlayerProps {
  streamUrl: string
  movieTitle: string
  quality: string
  language: string
  onClose: () => void
}

interface Caption {
  startTime: number
  endTime: number
  text: string
}

export default function VideoPlayer({ streamUrl, movieTitle, quality, language, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCaption, setSelectedCaption] = useState<string | null>(null)
  const [captions, setCaptions] = useState<Caption[]>([])
  const [currentCaption, setCurrentCaption] = useState<string>("")

  useEffect(() => {
    const fetchCaptions = async () => {
      try {
        const mockCaptions: Caption[] = [
          { startTime: 0, endTime: 3, text: "Welcome to the movie" },
          { startTime: 3, endTime: 6, text: "Enjoy the full experience" },
          { startTime: 6, endTime: 10, text: "With available captions in multiple languages" },
        ]
        setCaptions(mockCaptions)
      } catch (err) {
        console.log("[v0] Error fetching captions:", err)
      }
    }

    fetchCaptions()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => {
      setIsLoading(false)
      setError(null)
    }
    const handleError = () => {
      setIsLoading(false)
      console.log("[v0] Video error - Code:", video.error?.code)
      setError("Unable to stream this video. The file may be unavailable or incompatible.")
    }
    const handleLoadedMetadata = () => {
      console.log("[v0] Video metadata loaded successfully")
    }

    video.addEventListener("loadstart", handleLoadStart)
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("error", handleError)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)

    return () => {
      video.removeEventListener("loadstart", handleLoadStart)
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("error", handleError)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !streamUrl) return

    console.log("[v0] Attempting to load video from:", streamUrl.substring(0, 100))
    setError(null)
    setIsLoading(true)

    video.crossOrigin = "anonymous"
    video.src = streamUrl
    video.load()
  }, [streamUrl])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      if (!selectedCaption || captions.length === 0) {
        setCurrentCaption("")
        return
      }

      const currentTime = video.currentTime
      const activeCaption = captions.find((c) => currentTime >= c.startTime && currentTime < c.endTime)
      setCurrentCaption(activeCaption?.text || "")
    }

    video.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [selectedCaption, captions])

  const handleDownloadCaption = () => {
    if (captions.length === 0) return

    const srtContent = captions
      .map((caption, index) => {
        const formatTime = (seconds: number) => {
          const hrs = Math.floor(seconds / 3600)
          const mins = Math.floor((seconds % 3600) / 60)
          const secs = Math.floor(seconds % 60)
          const ms = Math.floor((seconds % 1) * 1000)
          return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")},${String(ms).padStart(3, "0")}`
        }

        return `${index + 1}\n${formatTime(caption.startTime)} --> ${formatTime(caption.endTime)}\n${caption.text}\n`
      })
      .join("\n")

    const blob = new Blob([srtContent], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${movieTitle}-${selectedCaption}.srt`
    a.click()
    window.URL.revokeObjectURL(url)
  }

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

        <div className="relative bg-black rounded-lg overflow-hidden aspect-video group">
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
                <a
                  href={streamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline hover:text-accent/80"
                >
                  Download video instead
                </a>
              </div>
            </div>
          )}

          <video ref={videoRef} controls className="w-full h-full" crossOrigin="anonymous" controlsList="nodownload" />

          {selectedCaption && currentCaption && (
            <div className="absolute bottom-20 left-0 right-0 flex justify-center px-4">
              <div className="bg-black/80 px-4 py-2 rounded text-white text-center max-w-2xl">
                <p className="text-sm md:text-base">{currentCaption}</p>
              </div>
            </div>
          )}

          <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
            <div></div>
            <CaptionSelector
              captions={[]}
              selectedCaption={selectedCaption}
              onCaptionChange={setSelectedCaption}
              onDownloadCaption={handleDownloadCaption}
            />
          </div>
        </div>

        <div className="mt-4 p-4 bg-card rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">
            If video fails to load, use the download button below to view the file directly.
          </p>
        </div>
      </div>
    </div>
  )
}
