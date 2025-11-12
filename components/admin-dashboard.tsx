"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AdminStats from "@/components/admin-stats"
import MovieManagement from "@/components/movie-management"

type Tab = "overview" | "movies" | "analytics"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview")
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalUsers: 0,
    totalViews: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("https://movieapi.giftedtech.co.ke/api/search/action")
        const data = await response.json()
        setStats({
          totalMovies: data.results?.items?.length || 0,
          totalUsers: Math.floor(Math.random() * 10000) + 1000,
          totalViews: Math.floor(Math.random() * 100000) + 50000,
        })
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      }
    }

    fetchStats()
  }, [])

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b border-border">
        <Button
          onClick={() => setActiveTab("overview")}
          variant={activeTab === "overview" ? "default" : "ghost"}
          className={
            activeTab === "overview"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }
        >
          Overview
        </Button>
        <Button
          onClick={() => setActiveTab("movies")}
          variant={activeTab === "movies" ? "default" : "ghost"}
          className={
            activeTab === "movies"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }
        >
          Movies
        </Button>
        <Button
          onClick={() => setActiveTab("analytics")}
          variant={activeTab === "analytics" ? "default" : "ghost"}
          className={
            activeTab === "analytics"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }
        >
          Analytics
        </Button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Dashboard Overview</h2>
          <AdminStats stats={stats} />
        </div>
      )}

      {/* Movies Tab */}
      {activeTab === "movies" && (
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Movie Management</h2>
          <MovieManagement />
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div>
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Analytics</CardTitle>
              <CardDescription>Detailed viewing statistics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-secondary/50 p-4 rounded">
                  <p className="text-sm text-muted-foreground mb-2">Most Watched</p>
                  <p className="text-lg font-semibold text-foreground">Action Movies - 45% of total views</p>
                </div>
                <div className="bg-secondary/50 p-4 rounded">
                  <p className="text-sm text-muted-foreground mb-2">Peak Hours</p>
                  <p className="text-lg font-semibold text-foreground">8 PM - 11 PM (Evening)</p>
                </div>
                <div className="bg-secondary/50 p-4 rounded">
                  <p className="text-sm text-muted-foreground mb-2">Average Session Duration</p>
                  <p className="text-lg font-semibold text-foreground">2 hours 15 minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
