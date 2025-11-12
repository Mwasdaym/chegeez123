import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Stats {
  totalMovies: number
  totalUsers: number
  totalViews: number
}

export default function AdminStats({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-card border-border hover:border-primary transition-colors">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Movies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary">{stats.totalMovies.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-2">+12 this month</p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border hover:border-primary transition-colors">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-accent">{stats.totalUsers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-2">+8% from last month</p>
        </CardContent>
      </Card>

      <Card className="bg-card border-border hover:border-primary transition-colors">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-500">{stats.totalViews.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-2">+23% from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}
