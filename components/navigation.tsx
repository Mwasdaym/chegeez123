"use client"

import Link from "next/link"
import { useState } from "react"
import SearchBar from "./search-bar"

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-b from-black/90 via-black/80 to-transparent backdrop-blur-sm border-b border-border/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="text-xl md:text-2xl font-black text-accent tracking-tight">
              UNLIMITED
              <br className="hidden md:block" />
              <span className="hidden md:inline"> </span>STREAM
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="text-foreground/80 hover:text-foreground transition duration-200">
              Home
            </Link>
            <Link href="/movies" className="text-foreground/80 hover:text-foreground transition duration-200">
              Movies
            </Link>
            <Link href="/tv-shows" className="text-foreground/80 hover:text-foreground transition duration-200">
              Series
            </Link>
            <Link href="/watchlist" className="text-foreground/80 hover:text-foreground transition duration-200">
              My List
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:block flex-1 max-w-xs">
            <SearchBar />
          </div>

          {/* Admin Link */}
          <Link
            href="/login"
            className="hidden md:block px-4 py-2 text-xs font-bold text-accent hover:text-accent/80 transition duration-200"
          >
            ADMIN
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground text-2xl font-bold"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-4 border-t border-border/30 pt-4">
            <Link href="/" className="block text-foreground/80 hover:text-foreground py-2 font-medium">
              Home
            </Link>
            <Link href="/movies" className="block text-foreground/80 hover:text-foreground py-2 font-medium">
              Movies
            </Link>
            <Link href="/tv-shows" className="block text-foreground/80 hover:text-foreground py-2 font-medium">
              Series
            </Link>
            <Link href="/watchlist" className="block text-foreground/80 hover:text-foreground py-2 font-medium">
              My List
            </Link>
            <Link href="/login" className="block text-accent py-2 font-bold text-sm">
              Admin Login
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
