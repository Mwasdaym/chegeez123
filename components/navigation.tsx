"use client"

import Link from "next/link"
import { useState } from "react"
import SearchBar from "./search-bar"

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="text-2xl font-bold text-accent">🎬 MovieBox</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-foreground hover:text-accent transition">
              Home
            </Link>
            <Link href="/movies" className="text-foreground hover:text-accent transition">
              Movies
            </Link>
            <Link href="/tv-shows" className="text-foreground hover:text-accent transition">
              TV Shows
            </Link>
            <Link href="/watchlist" className="text-foreground hover:text-accent transition">
              My Watchlist
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:block flex-1 max-w-sm">
            <SearchBar />
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-foreground text-xl">
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 pb-4">
            <Link href="/" className="block text-foreground hover:text-accent py-2">
              Home
            </Link>
            <Link href="/movies" className="block text-foreground hover:text-accent py-2">
              Movies
            </Link>
            <Link href="/tv-shows" className="block text-foreground hover:text-accent py-2">
              TV Shows
            </Link>
            <Link href="/watchlist" className="block text-foreground hover:text-accent py-2">
              My Watchlist
            </Link>
            <div className="pt-2">
              <SearchBar />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
