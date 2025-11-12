"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface QualityOption {
  quality: string
  size: string
}

interface QualitySelectorProps {
  qualities: QualityOption[]
  selectedQuality: string
  onQualityChange: (quality: string) => void
}

export default function QualitySelector({ qualities, selectedQuality, onQualityChange }: QualitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative w-full md:w-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-4 py-2 bg-card text-foreground rounded-lg font-semibold hover:bg-card/80 transition border border-border"
      >
        <span>Quality: {selectedQuality}</span>
        <ChevronDown className={`w-4 h-4 transition ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10">
          {qualities.map((option) => (
            <button
              key={option.quality}
              onClick={() => {
                onQualityChange(option.quality)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-3 hover:bg-accent hover:text-accent-foreground transition flex justify-between items-center ${
                selectedQuality === option.quality ? "bg-accent text-accent-foreground" : "text-foreground"
              } border-b border-border last:border-b-0`}
            >
              <span>{option.quality}</span>
              <span className="text-xs opacity-75">({option.size})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
