"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAdminSession, clearAdminSession } from "@/lib/auth"
import AdminDashboard from "@/components/admin-dashboard"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      if (getAdminSession()) {
        setIsAuthenticated(true)
      } else {
        router.push("/login")
      }
      setLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    clearAdminSession()
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-primary">UNLIMITED STREAM</h1>
            <p className="text-sm text-muted-foreground">Admin Dashboard</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-border hover:bg-secondary bg-transparent">
            Logout
          </Button>
        </div>
      </header>

      {/* Admin Dashboard */}
      <main className="p-6">
        <AdminDashboard />
      </main>
    </div>
  )
}
