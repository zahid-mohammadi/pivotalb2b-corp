import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useQuery } from "@tanstack/react-query";

const userFlowData = [
  { step: "Landing", users: 1000 },
  { step: "Features", users: 750 },
  { step: "Pricing", users: 500 },
  { step: "Trial", users: 250 },
  { step: "Signup", users: 100 },
];

export function UserBehavior() {
  const { data: pageViews, isLoading: pageViewsLoading } = useQuery({
    queryKey: ["/api/analytics/page-views"],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const pageViewChart = pageViewsLoading ? (
    <div className="h-[300px]">Loading...</div>
  ) : (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={pageViews}>
          <XAxis dataKey="page" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="views" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Popular Pages</CardTitle>
          <CardDescription>
            Most visited pages and average time spent
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pageViewChart}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Flow</CardTitle>
          <CardDescription>
            User journey through conversion funnel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userFlowData}>
                <XAxis
                  dataKey="step"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip />
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
    </div>
  );
}