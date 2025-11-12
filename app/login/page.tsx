"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { verifyCredentials, setAdminSession } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (verifyCredentials(username, password)) {
        setAdminSession()
        router.push("/admin")
      } else {
        setError("Invalid username or password")
      }
    } catch {
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">UNLIMITED STREAM</h1>
            <p className="text-muted-foreground">Admin Portal</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-secondary border-border text-foreground placeholder-muted-foreground"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-secondary border-border text-foreground placeholder-muted-foreground"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-destructive/20 border border-destructive text-destructive px-4 py-2 rounded text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !username || !password}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center mb-3">Demo Credentials</p>
            <div className="space-y-2 text-xs text-muted-foreground bg-secondary/50 p-3 rounded">
              <p>
                <strong>Username:</strong> admin
              </p>
              <p>
                <strong>Password:</strong> Ak47@4jkq
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
