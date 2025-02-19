import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer } from "recharts";
import { Users, Clock, MousePointer, ArrowUpRight } from "lucide-react";

const mockData = {
  dailyUsers: [
    { date: "Mon", users: 145 },
    { date: "Tue", users: 232 },
    { date: "Wed", users: 186 },
    { date: "Thu", users: 256 },
    { date: "Fri", users: 236 },
    { date: "Sat", users: 164 },
    { date: "Sun", users: 142 }
  ],
  engagementData: [
    { hour: "00", sessions: 24 },
    { hour: "03", sessions: 18 },
    { hour: "06", sessions: 42 },
    { hour: "09", sessions: 126 },
    { hour: "12", sessions: 168 },
    { hour: "15", sessions: 186 },
    { hour: "18", sessions: 142 },
    { hour: "21", sessions: 86 }
  ]
};

export function OverviewMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2,350</div>
          <div className="text-xs text-muted-foreground">
            +180 from last month
          </div>
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.dailyUsers}>
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
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
          <div className="text-2xl font-bold">4m 32s</div>
          <div className="text-xs text-muted-foreground">
            +12% from last week
          </div>
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.engagementData}>
                <Bar
                  dataKey="sessions"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
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
          <div className="text-2xl font-bold">3.2%</div>
          <div className="text-xs text-muted-foreground">
            +0.5% from last month
          </div>
          <div className="mt-4 h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.dailyUsers}>
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
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
          <div className="text-2xl font-bold">42.3%</div>
          <div className="text-xs text-muted-foreground">
            -3% from last month
          </div>
          <div className="mt-4 h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.engagementData}>
                <Bar
                  dataKey="sessions"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}