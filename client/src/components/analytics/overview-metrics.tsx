import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";
import { Users, Clock, MousePointer, ArrowUpRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { MarketingTooltip } from "@/components/ui/marketing-tooltip";

interface MetricsData {
  totalUsers: number;
  avgSessionDuration: number;
  conversionRate: number;
  bounceRate: number;
  dailyUsers: Array<{ date: string; users: number }>;
}

export function OverviewMetrics() {
  const { data: metrics, isLoading } = useQuery<MetricsData>({
    queryKey: ["/api/analytics/overview"],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const { data: activeUsersData, refetch: refetchActiveUsers } = useQuery<{ activeUsers: number }>({
    queryKey: ["/api/analytics/active-users"],
    refetchInterval: 30000,
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MarketingTooltip
        metric={{
          title: "Real-time User Activity",
          value: activeUsersData?.activeUsers || 0,
          insights: [
            "Track live user engagement",
            "Monitor peak activity periods",
            "Identify user behavior patterns"
          ],
          recommendation: "Consider launching targeted campaigns during peak activity hours"
        }}
      >
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
      </MarketingTooltip>

      <MarketingTooltip
        metric={{
          title: "Monthly Active Users",
          value: metrics?.totalUsers.toLocaleString() || 0,
          trend: {
            value: 12.5,
            direction: "up",
            timeframe: "last month"
          },
          insights: [
            "Steady growth in user base",
            "Strong retention indicators",
            "Potential for expanded reach"
          ],
          recommendation: "Focus on user retention strategies to maintain growth momentum"
        }}
      >
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
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </MarketingTooltip>

      <MarketingTooltip
        metric={{
          title: "Average Engagement Time",
          value: formatDuration(metrics?.avgSessionDuration || 0),
          trend: {
            value: 8.3,
            direction: "up",
            timeframe: "last week"
          },
          insights: [
            "Content engagement metrics",
            "User journey analysis",
            "Quality of interaction"
          ],
          recommendation: "Optimize content structure to increase engagement time"
        }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatDuration(metrics?.avgSessionDuration || 0)}
            </div>
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
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </MarketingTooltip>

      <MarketingTooltip
        metric={{
          title: "Lead Conversion Rate",
          value: `${metrics?.conversionRate.toFixed(1)}%`,
          trend: {
            value: 15.7,
            direction: "up",
            timeframe: "last quarter"
          },
          insights: [
            "Marketing funnel efficiency",
            "Campaign performance metrics",
            "Lead quality indicators"
          ],
          recommendation: "A/B test landing pages to optimize conversion paths"
        }}
      >
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
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </MarketingTooltip>
    </div>
  );
}