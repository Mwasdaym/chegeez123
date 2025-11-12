"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface StreamServer {
  id: string
  name: string
  url: string
}

interface StreamSelectorProps {
  servers: StreamServer[]
  selectedServer: StreamServer | null
  onServerChange: (server: StreamServer) => void
}

export default function StreamSelector({ servers, selectedServer, onServerChange }: StreamSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative w-full md:w-48">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-4 py-2 bg-card text-foreground rounded-lg font-semibold hover:bg-card/80 transition border border-border"
      >
        <span>{selectedServer?.name || "Select Stream"}</span>
        <ChevronDown className={`w-4 h-4 transition ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10">
          {servers.map((server) => (
            <button
              key={server.id}
              onClick={() => {
                onServerChange(server)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-3 hover:bg-accent hover:text-accent-foreground transition ${
                selectedServer?.id === server.id ? "bg-accent text-accent-foreground" : "text-foreground"
              } border-b border-border last:border-b-0`}
            >
              {server.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
