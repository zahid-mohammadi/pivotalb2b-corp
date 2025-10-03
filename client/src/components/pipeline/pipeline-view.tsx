import { useState } from "react";
import { PipelineKanban } from "./pipeline-kanban";
import { DealProfile } from "./deal-profile";
import { DealForm } from "./deal-form";
import type { PipelineDeal } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Plus, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PipelineView() {
  const [selectedDeal, setSelectedDeal] = useState<PipelineDeal | null>(null);
  const [showDealForm, setShowDealForm] = useState(false);
  const [formStageId, setFormStageId] = useState<number | undefined>(undefined);

  const handleDealClick = (deal: PipelineDeal) => {
    setSelectedDeal(deal);
  };

  const handleCreateDeal = (stageId?: number) => {
    setFormStageId(stageId);
    setShowDealForm(true);
  };

  const handleCloseDealProfile = () => {
    setSelectedDeal(null);
  };

  const handleCloseDealForm = () => {
    setShowDealForm(false);
    setFormStageId(undefined);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Pipeline</h2>
          <p className="text-muted-foreground">
            Manage your deals and track progress through the sales pipeline
          </p>
        </div>
        <Button onClick={() => handleCreateDeal()} data-testid="button-create-deal">
          <Plus className="h-4 w-4 mr-2" />
          New Deal
        </Button>
      </div>

      <Tabs defaultValue="kanban" className="flex-1 flex flex-col">
        <TabsList>
          <TabsTrigger value="kanban">Kanban View</TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="flex-1 mt-6">
          <PipelineKanban
            onDealClick={handleDealClick}
            onCreateDeal={handleCreateDeal}
          />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="text-center text-muted-foreground py-12">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Pipeline analytics coming soon</p>
            <p className="text-sm mt-2">Track conversion rates, deal velocity, and revenue forecasts</p>
          </div>
        </TabsContent>
      </Tabs>

      {selectedDeal && (
        <DealProfile deal={selectedDeal} onClose={handleCloseDealProfile} />
      )}

      {showDealForm && (
        <DealForm
          defaultStageId={formStageId}
          onClose={handleCloseDealForm}
        />
      )}
    </div>
  );
}
