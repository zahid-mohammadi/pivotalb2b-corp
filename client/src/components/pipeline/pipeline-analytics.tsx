import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Target, Activity, Users, Flame } from "lucide-react";
import type { PipelineDeal, PipelineStage } from "@shared/schema";

function getEngagementLevel(score: number) {
  if (score >= 150) return 'Very Hot';
  else if (score >= 80) return 'Hot';
  else if (score >= 30) return 'Warm';
  else return 'Cold';
}

export function PipelineAnalytics() {
  const { data: stages = [] } = useQuery<PipelineStage[]>({
    queryKey: ["/api/pipeline/stages"],
  });

  const { data: deals = [] } = useQuery<PipelineDeal[]>({
    queryKey: ["/api/pipeline/deals"],
  });

  const totalDeals = deals.length;
  const totalValue = deals.reduce((sum, deal) => sum + (deal.dealValue || 0), 0);
  const avgDealValue = totalDeals > 0 ? totalValue / totalDeals : 0;

  const weightedValue = deals.reduce((sum, deal) => {
    const probability = deal.probability || 50;
    return sum + ((deal.dealValue || 0) * probability / 100);
  }, 0);

  const stageDeals = stages.map(stage => ({
    stage,
    deals: deals.filter(d => d.stageId === stage.id),
    value: deals.filter(d => d.stageId === stage.id).reduce((sum, d) => sum + (d.dealValue || 0), 0)
  }));

  const firstStageDeals = stageDeals[0]?.deals.length || 1;
  const lastStageDeals = stageDeals[stageDeals.length - 1]?.deals.length || 0;
  const conversionRate = firstStageDeals > 0 ? (lastStageDeals / firstStageDeals) * 100 : 0;

  const engagementDistribution = {
    'Very Hot': deals.filter(d => (d.engagementScore || 0) >= 150).length,
    'Hot': deals.filter(d => (d.engagementScore || 0) >= 80 && (d.engagementScore || 0) < 150).length,
    'Warm': deals.filter(d => (d.engagementScore || 0) >= 30 && (d.engagementScore || 0) < 80).length,
    'Cold': deals.filter(d => (d.engagementScore || 0) < 30).length,
  };

  const maxEngagement = Math.max(...Object.values(engagementDistribution));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="total-deals">{totalDeals}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active opportunities in pipeline
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="pipeline-value">
              ${totalValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total potential revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="avg-deal-value">
              ${Math.round(avgDealValue).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Per opportunity
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue Forecast</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="revenue-forecast">
              ${Math.round(weightedValue).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Weighted by probability
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stageDeals.map((item, index) => {
                const percentage = firstStageDeals > 0 ? (item.deals.length / firstStageDeals) * 100 : 0;
                return (
                  <div key={item.stage.id} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.stage.color || '#6b7280' }}
                        />
                        <span className="font-medium">{item.stage.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">{item.deals.length} deals</Badge>
                        <span className="text-muted-foreground text-xs">
                          ${item.value.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="relative h-8 bg-muted rounded-md overflow-hidden">
                      <div 
                        className="absolute inset-y-0 left-0 rounded-md transition-all"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: item.stage.color || '#6b7280'
                        }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                );
              })}
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Overall Conversion Rate</span>
                  <Badge 
                    variant={conversionRate >= 20 ? "default" : "secondary"}
                    data-testid="conversion-rate"
                  >
                    {conversionRate.toFixed(1)}%
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Flame className="h-5 w-5" />
              Engagement Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span>🔥🔥 Very Hot (150+ pts)</span>
                  </div>
                  <Badge variant="outline" className="bg-red-100 text-red-700">
                    {engagementDistribution['Very Hot']} leads
                  </Badge>
                </div>
                <div className="relative h-6 bg-muted rounded-md overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-red-500 rounded-md transition-all"
                    style={{ 
                      width: maxEngagement > 0 ? `${(engagementDistribution['Very Hot'] / maxEngagement) * 100}%` : '0%'
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span>🔥 Hot (80-149 pts)</span>
                  </div>
                  <Badge variant="outline" className="bg-orange-100 text-orange-700">
                    {engagementDistribution['Hot']} leads
                  </Badge>
                </div>
                <div className="relative h-6 bg-muted rounded-md overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-orange-500 rounded-md transition-all"
                    style={{ 
                      width: maxEngagement > 0 ? `${(engagementDistribution['Hot'] / maxEngagement) * 100}%` : '0%'
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span>💫 Warm (30-79 pts)</span>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-700">
                    {engagementDistribution['Warm']} leads
                  </Badge>
                </div>
                <div className="relative h-6 bg-muted rounded-md overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-blue-500 rounded-md transition-all"
                    style={{ 
                      width: maxEngagement > 0 ? `${(engagementDistribution['Warm'] / maxEngagement) * 100}%` : '0%'
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span>❄️ Cold (0-29 pts)</span>
                  </div>
                  <Badge variant="outline" className="bg-gray-100 text-gray-600">
                    {engagementDistribution['Cold']} leads
                  </Badge>
                </div>
                <div className="relative h-6 bg-muted rounded-md overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-gray-500 rounded-md transition-all"
                    style={{ 
                      width: maxEngagement > 0 ? `${(engagementDistribution['Cold'] / maxEngagement) * 100}%` : '0%'
                    }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  Focus on nurturing warm and hot leads for better conversion rates
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pipeline Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Top Stage by Value</p>
              {stageDeals.length > 0 && (
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: stageDeals.reduce((max, item) => item.value > max.value ? item : max).stage.color || '#6b7280' }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {stageDeals.reduce((max, item) => item.value > max.value ? item : max).stage.name} - 
                    ${stageDeals.reduce((max, item) => item.value > max.value ? item : max).value.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Most Active Stage</p>
              {stageDeals.length > 0 && (
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: stageDeals.reduce((max, item) => item.deals.length > max.deals.length ? item : max).stage.color || '#6b7280' }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {stageDeals.reduce((max, item) => item.deals.length > max.deals.length ? item : max).stage.name} - 
                    {stageDeals.reduce((max, item) => item.deals.length > max.deals.length ? item : max).deals.length} deals
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Hot Leads</p>
              <span className="text-sm text-muted-foreground">
                {engagementDistribution['Very Hot'] + engagementDistribution['Hot']} leads ready for outreach
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
