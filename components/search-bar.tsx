"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        placeholder="Search movies, shows..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-card border border-border rounded-lg px-4 py-2 pl-10 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
    </form>
  )
}
