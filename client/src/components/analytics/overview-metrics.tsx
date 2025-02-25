import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Users, Clock, MousePointer, ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function OverviewMetrics() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/analytics/overview"],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const { data: activeUsersData, refetch: refetchActiveUsers } = useQuery({
    queryKey: ["/api/analytics/active-users"],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  useEffect(() => {
    const pingInterval = setInterval(() => {
      const sessionId = localStorage.getItem('sessionId');
      if (sessionId) {
        fetch('/api/analytics/ping', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId })
        }).catch(console.error);
      }
    }, 60000); // Ping every minute

    return () => clearInterval(pingInterval);
  }, []);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4).fill(0).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">...</div>
              <div className="text-xs text-muted-foreground">Loading data</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Online Users</CardTitle>
          <Users className="h-4 w-4 text-primary animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeUsersData?.activeUsers || 0}</div>
          <div className="text-xs text-muted-foreground">
            Currently active on the site
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics?.totalUsers.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">
            Active users in last 30 days
          </div>
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics?.dailyUsers}>
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatDuration(metrics?.avgSessionDuration || 0)}</div>
          <div className="text-xs text-muted-foreground">
            Average time spent on site
          </div>
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics?.dailyUsers}>
                <Bar
                  dataKey="users"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics?.conversionRate.toFixed(1)}%</div>
          <div className="text-xs text-muted-foreground">
            Of total visitors
          </div>
          <div className="mt-4 h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics?.dailyUsers}>
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
          <MousePointer className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics?.bounceRate.toFixed(1)}%</div>
          <div className="text-xs text-muted-foreground">
            Single page visits
          </div>
          <div className="mt-4 h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics?.dailyUsers}>
                <Bar
                  dataKey="users"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}