"use client"

import { useState } from "react"
import { ChevronDown, Download } from "lucide-react"

interface CaptionOption {
  code: string
  name: string
}

interface CaptionSelectorProps {
  captions: CaptionOption[]
  selectedCaption: string | null
  onCaptionChange: (captionCode: string | null) => void
  onDownloadCaption: () => void
}

const commonCaptions: CaptionOption[] = [
  { code: "off", name: "Off" },
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
]

export default function CaptionSelector({
  captions,
  selectedCaption,
  onCaptionChange,
  onDownloadCaption,
}: CaptionSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const availableCaptions = captions.length > 0 ? captions : commonCaptions

  const selectedCaptionName = availableCaptions.find((c) => c.code === selectedCaption)?.name || "Subtitles"

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition border border-accent-foreground/20"
        >
          <span>CC</span>
          <ChevronDown className={`w-4 h-4 transition ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {selectedCaption && selectedCaption !== "off" && (
          <button
            onClick={onDownloadCaption}
            title="Download captions"
            className="p-2 bg-card text-foreground rounded-lg hover:bg-card/80 transition border border-border"
          >
            <Download className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10 min-w-48 max-h-60 overflow-y-auto">
          {availableCaptions.map((caption) => (
            <button
              key={caption.code}
              onClick={() => {
                onCaptionChange(caption.code === "off" ? null : caption.code)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-3 hover:bg-accent hover:text-accent-foreground transition ${
                selectedCaption === (caption.code === "off" ? null : caption.code)
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground"
              } border-b border-border last:border-b-0`}
            >
              {caption.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
