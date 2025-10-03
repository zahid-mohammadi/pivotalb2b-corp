import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Plus, Mail, Phone, Building, DollarSign, User, ArrowRight } from "lucide-react";
import type { PipelineStage, PipelineDeal } from "@shared/schema";

interface DealCardProps {
  deal: PipelineDeal;
  onClick: (deal: PipelineDeal) => void;
  onMoveStage: (deal: PipelineDeal, newStageId: number) => void;
  stages: PipelineStage[];
}

function DealCard({ deal, onClick, onMoveStage, stages }: DealCardProps) {
  const currentStageIndex = stages.findIndex(s => s.id === deal.stageId);
  const nextStage = stages[currentStageIndex + 1];

  return (
    <Card 
      className="mb-3 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(deal)}
      data-testid={`deal-card-${deal.id}`}
    >
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h4 className="font-semibold text-sm">{deal.fullName}</h4>
            {deal.dealValue && (
              <Badge variant="secondary" className="text-xs">
                <DollarSign className="h-3 w-3 mr-1" />
                {deal.dealValue.toLocaleString()}
              </Badge>
            )}
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

  const getDealsByStage = (stageId: number) => {
    return deals.filter(deal => deal.stageId === stageId);
  };

  const getTotalValue = (stageId: number) => {
    return getDealsByStage(stageId).reduce((sum, deal) => sum + (deal.dealValue || 0), 0);
  };

  return (
    <div className="h-full">
      <div className="flex gap-4 h-full overflow-x-auto pb-4">
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
