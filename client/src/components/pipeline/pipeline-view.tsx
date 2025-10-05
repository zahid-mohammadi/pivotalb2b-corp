import { useState, useEffect } from "react";
import { PipelineKanban } from "./pipeline-kanban";
import { PipelineAnalytics } from "./pipeline-analytics";
import { DealProfile } from "./deal-profile";
import { DealForm } from "./deal-form";
import { CampaignList } from "../campaigns/campaign-list";
import { CampaignForm } from "../campaigns/campaign-form";
import { CampaignDetails } from "../campaigns/campaign-details";
import { M365ConnectionSettings } from "../settings/m365-connection";
import { AutomationRuleList } from "../automation/automation-rule-list";
import { AutomationRuleForm } from "../automation/automation-rule-form";
import type { PipelineDeal, EmailCampaign, AutomationRule } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Plus, BarChart3, Mail, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PipelineViewProps {
  initialTab?: "kanban" | "campaigns" | "analytics" | "settings" | "integrations" | "automation";
}

export function PipelineView({ initialTab = "kanban" }: PipelineViewProps = {}) {
  const [selectedDeal, setSelectedDeal] = useState<PipelineDeal | null>(null);
  const [showDealForm, setShowDealForm] = useState(false);
  const [formStageId, setFormStageId] = useState<number | undefined>(undefined);
  const [selectedCampaign, setSelectedCampaign] = useState<EmailCampaign | null>(null);
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [showCampaignDetails, setShowCampaignDetails] = useState(false);
  const [selectedRule, setSelectedRule] = useState<AutomationRule | null>(null);
  const [showRuleForm, setShowRuleForm] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState<string>(initialTab === "integrations" || initialTab === "automation" ? "settings" : initialTab);
  const [activeSettingsTab, setActiveSettingsTab] = useState<string>(initialTab === "automation" ? "automation" : "integrations");

  useEffect(() => {
    if (initialTab === "integrations" || initialTab === "automation") {
      setActiveMainTab("settings");
      setActiveSettingsTab(initialTab);
    } else {
      setActiveMainTab(initialTab);
    }
  }, [initialTab]);

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

  const handleCreateCampaign = () => {
    setSelectedCampaign(null);
    setShowCampaignForm(true);
  };

  const handleViewCampaign = (campaign: EmailCampaign) => {
    setSelectedCampaign(campaign);
    setShowCampaignDetails(true);
  };

  const handleCloseCampaignForm = () => {
    setShowCampaignForm(false);
    setSelectedCampaign(null);
  };

  const handleCloseCampaignDetails = () => {
    setShowCampaignDetails(false);
    setSelectedCampaign(null);
  };

  const handleCreateRule = () => {
    setSelectedRule(null);
    setShowRuleForm(true);
  };

  const handleEditRule = (rule: AutomationRule) => {
    setSelectedRule(rule);
    setShowRuleForm(true);
  };

  const handleCloseRuleForm = () => {
    setShowRuleForm(false);
    setSelectedRule(null);
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

      <Tabs value={activeMainTab} onValueChange={setActiveMainTab} className="flex-1 flex flex-col">
        <TabsList>
          <TabsTrigger value="kanban">Kanban View</TabsTrigger>
          <TabsTrigger value="campaigns" data-testid="tab-campaigns">
            <Mail className="h-4 w-4 mr-2" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" data-testid="tab-settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="flex-1 mt-6">
          <PipelineKanban
            onDealClick={handleDealClick}
            onCreateDeal={handleCreateDeal}
          />
        </TabsContent>

        <TabsContent value="campaigns" className="mt-6">
          <CampaignList
            onCreateCampaign={handleCreateCampaign}
            onViewCampaign={handleViewCampaign}
          />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <PipelineAnalytics />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Tabs value={activeSettingsTab} onValueChange={setActiveSettingsTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="automation">Automation Rules</TabsTrigger>
            </TabsList>

            <TabsContent value="integrations" className="space-y-4">
              <div className="max-w-2xl">
                <M365ConnectionSettings />
              </div>
            </TabsContent>

            <TabsContent value="automation">
              <AutomationRuleList
                onCreateRule={handleCreateRule}
                onEditRule={handleEditRule}
              />
            </TabsContent>
          </Tabs>
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

      <CampaignForm
        campaign={selectedCampaign || undefined}
        open={showCampaignForm}
        onClose={handleCloseCampaignForm}
      />

      {selectedCampaign && (
        <CampaignDetails
          campaign={selectedCampaign}
          open={showCampaignDetails}
          onClose={handleCloseCampaignDetails}
        />
      )}

      <AutomationRuleForm
        rule={selectedRule || undefined}
        open={showRuleForm}
        onClose={handleCloseRuleForm}
      />
    </div>
  );
}
