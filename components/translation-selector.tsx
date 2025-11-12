"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface TranslationOption {
  code: string
  name: string
}

interface TranslationSelectorProps {
  languages: TranslationOption[]
  selectedLanguage: string
  onLanguageChange: (languageCode: string) => void
}

const commonLanguages: TranslationOption[] = [
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
  { code: "hi", name: "Hindi" },
]

export default function TranslationSelector({
  languages,
  selectedLanguage,
  onLanguageChange,
}: TranslationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const availableLanguages = languages.length > 0 ? languages : commonLanguages

  const selectedLangName = availableLanguages.find((l) => l.code === selectedLanguage)?.name || "Select Language"

  return (
    <div className="relative w-full md:w-48">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-4 py-2 bg-card text-foreground rounded-lg font-semibold hover:bg-card/80 transition border border-border"
      >
        <span>{selectedLangName}</span>
        <ChevronDown className={`w-4 h-4 transition ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onLanguageChange(lang.code)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-3 hover:bg-accent hover:text-accent-foreground transition ${
                selectedLanguage === lang.code ? "bg-accent text-accent-foreground" : "text-foreground"
              } border-b border-border last:border-b-0`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
