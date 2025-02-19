import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Globe, Search, Share2, Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const COLORS = ['hsl(var(--primary))', '#4F46E5', '#7C3AED', '#EC4899'];
const ICONS = {
  "Organic Search": Search,
  "Direct": Globe,
  "Social Media": Share2,
  "Email": Mail,
};

export function TrafficSources() {
  const { data: trafficData, isLoading } = useQuery({
    queryKey: ["/api/analytics/traffic-sources"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
          <CardDescription>Loading traffic data...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Sources</CardTitle>
        <CardDescription>
          Overview of website traffic sources and distribution
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={trafficData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {trafficData?.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {trafficData?.map((source: any, index: number) => {
            const Icon = ICONS[source.name as keyof typeof ICONS] || Globe;
            return (
              <div
                key={source.name}
                className="flex items-center p-4 bg-muted rounded-lg"
              >
                <div
                  className="p-2 rounded-full mr-3"
                  style={{ backgroundColor: COLORS[index] + '20' }}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: COLORS[index] }}
                  />
                </div>
                <div>
                  <div className="font-medium">{source.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {source.value}% of traffic
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}