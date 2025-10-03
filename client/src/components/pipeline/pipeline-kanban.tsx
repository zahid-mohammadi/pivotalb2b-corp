import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Plus, Mail, Phone, Building, DollarSign, User, ArrowRight, Flame, Search, Filter } from "lucide-react";
import type { PipelineStage, PipelineDeal } from "@shared/schema";

interface DealCardProps {
  deal: PipelineDeal;
  onClick: (deal: PipelineDeal) => void;
  onMoveStage: (deal: PipelineDeal, newStageId: number) => void;
  stages: PipelineStage[];
}

function getEngagementLevel(score: number) {
  if (score >= 150) {
    return { level: 'Very Hot', color: 'bg-red-100 text-red-700 border-red-300', icon: '🔥🔥' };
  } else if (score >= 80) {
    return { level: 'Hot', color: 'bg-orange-100 text-orange-700 border-orange-300', icon: '🔥' };
  } else if (score >= 30) {
    return { level: 'Warm', color: 'bg-blue-100 text-blue-700 border-blue-300', icon: '💫' };
  } else {
    return { level: 'Cold', color: 'bg-gray-100 text-gray-600 border-gray-300', icon: '❄️' };
  }
}

function DealCard({ deal, onClick, onMoveStage, stages }: DealCardProps) {
  const currentStageIndex = stages.findIndex(s => s.id === deal.stageId);
  const nextStage = stages[currentStageIndex + 1];
  const score = deal.engagementScore || 0;
  const engagement = getEngagementLevel(score);

  return (
    <Card 
      className="mb-3 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(deal)}
      data-testid={`deal-card-${deal.id}`}
    >
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-semibold text-sm flex-1">{deal.fullName}</h4>
            <div className="flex gap-1">
              <Badge 
                variant="outline" 
                className={`text-xs px-2 ${engagement.color}`}
                data-testid={`engagement-badge-${deal.id}`}
              >
                {engagement.icon} {score}
              </Badge>
              {deal.dealValue && (
                <Badge variant="secondary" className="text-xs">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {deal.dealValue.toLocaleString()}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Building className="h-3 w-3" />
              <span>{deal.company}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span className="truncate">{deal.email}</span>
            </div>
            {deal.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span>{deal.phone}</span>
              </div>
            )}
          </div>

          {nextStage && (
            <Button
              size="sm"
              variant="ghost"
              className="w-full mt-2 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onMoveStage(deal, nextStage.id);
              }}
              data-testid={`move-deal-${deal.id}`}
            >
              Move to {nextStage.name} <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface PipelineKanbanProps {
  onDealClick: (deal: PipelineDeal) => void;
  onCreateDeal: (stageId: number) => void;
}

export function PipelineKanban({ onDealClick, onCreateDeal }: PipelineKanbanProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [engagementFilter, setEngagementFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");

  const { data: stages = [] } = useQuery<PipelineStage[]>({
    queryKey: ["/api/pipeline/stages"],
  });

  const { data: deals = [] } = useQuery<PipelineDeal[]>({
    queryKey: ["/api/pipeline/deals"],
  });

  const moveDealMutation = useMutation({
    mutationFn: async ({ dealId, stageId }: { dealId: number; stageId: number }) => {
      await apiRequest("PATCH", `/api/pipeline/deals/${dealId}`, { stageId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pipeline/deals"] });
    },
  });

  const handleMoveStage = (deal: PipelineDeal, newStageId: number) => {
    moveDealMutation.mutate({ dealId: deal.id, stageId: newStageId });
  };

  const getEngagementLevelName = (score: number): string => {
    if (score >= 150) return 'very-hot';
    else if (score >= 80) return 'hot';
    else if (score >= 30) return 'warm';
    else return 'cold';
  };

  const filterDeals = (deals: PipelineDeal[]) => {
    return deals.filter(deal => {
      const matchesSearch = searchQuery === "" || 
        deal.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.company.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesEngagement = engagementFilter === "all" || 
        getEngagementLevelName(deal.engagementScore || 0) === engagementFilter;

      const matchesSource = sourceFilter === "all" || 
        deal.source === sourceFilter;

      return matchesSearch && matchesEngagement && matchesSource;
    });
  };

  const getDealsByStage = (stageId: number) => {
    const stageDeals = deals.filter(deal => deal.stageId === stageId);
    return filterDeals(stageDeals);
  };

  const getTotalValue = (stageId: number) => {
    return getDealsByStage(stageId).reduce((sum, deal) => sum + (deal.dealValue || 0), 0);
  };

  const uniqueSources = Array.from(new Set(deals.map(d => d.source)));
  const filteredDealsCount = filterDeals(deals).length;

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="search-deals"
          />
        </div>
        <Select value={engagementFilter} onValueChange={setEngagementFilter}>
          <SelectTrigger className="w-full sm:w-48" data-testid="filter-engagement">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Engagement" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Engagement</SelectItem>
            <SelectItem value="very-hot">🔥🔥 Very Hot</SelectItem>
            <SelectItem value="hot">🔥 Hot</SelectItem>
            <SelectItem value="warm">💫 Warm</SelectItem>
            <SelectItem value="cold">❄️ Cold</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-full sm:w-48" data-testid="filter-source">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            {uniqueSources.map(source => (
              <SelectItem key={source} value={source}>
                {source.replace('_', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {(searchQuery || engagementFilter !== "all" || sourceFilter !== "all") && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {filteredDealsCount} {filteredDealsCount === 1 ? 'result' : 'results'}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setEngagementFilter("all");
              setSourceFilter("all");
            }}
            data-testid="clear-filters"
          >
            Clear filters
          </Button>
        </div>
      )}

      <div className="flex gap-4 flex-1 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageDeals = getDealsByStage(stage.id);
          const totalValue = getTotalValue(stage.id);

          return (
            <div
              key={stage.id}
              className="flex-shrink-0 w-80"
              data-testid={`stage-column-${stage.id}`}
            >
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: stage.color || '#6b7280' }}
                      />
                      {stage.name}
                    </CardTitle>
                    <Badge variant="secondary">{stageDeals.length}</Badge>
                  </div>
                  {totalValue > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Total: ${totalValue.toLocaleString()}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden pt-0">
                  <ScrollArea className="h-full pr-3">
                    <div className="space-y-2">
                      {stageDeals.map((deal) => (
                        <DealCard
                          key={deal.id}
                          deal={deal}
                          onClick={onDealClick}
                          onMoveStage={handleMoveStage}
                          stages={stages}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-3"
                    onClick={() => onCreateDeal(stage.id)}
                    data-testid={`create-deal-${stage.id}`}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Deal
                  </Button>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
