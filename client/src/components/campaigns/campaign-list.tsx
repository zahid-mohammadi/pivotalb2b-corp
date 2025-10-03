import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Mail, Clock, CheckCircle, XCircle, BarChart2, Trash2 } from "lucide-react";
import { format } from "date-fns";
import type { EmailCampaign } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface CampaignListProps {
  onCreateCampaign: () => void;
  onViewCampaign: (campaign: EmailCampaign) => void;
}

export function CampaignList({ onCreateCampaign, onViewCampaign }: CampaignListProps) {
  const { toast } = useToast();
  
  const { data: campaigns, isLoading } = useQuery<EmailCampaign[]>({
    queryKey: ["/api/campaigns"],
  });

  const handleDeleteCampaign = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this campaign?")) {
      return;
    }

    try {
      await apiRequest("DELETE", `/api/campaigns/${id}`);
      
      queryClient.invalidateQueries({ queryKey: ["/api/campaigns"] });
      
      toast({
        title: "Campaign deleted",
        description: "The campaign has been successfully deleted",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete campaign",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />Draft</Badge>;
      case "scheduled":
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Scheduled</Badge>;
      case "sent":
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Sent</Badge>;
      case "sending":
        return <Badge variant="secondary"><Mail className="h-3 w-3 mr-1" />Sending</Badge>;
      case "failed":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading campaigns...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Email Campaigns</h2>
          <p className="text-muted-foreground">
            Create and manage email campaigns for your pipeline
          </p>
        </div>
        <Button onClick={onCreateCampaign} data-testid="button-create-campaign">
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {!campaigns || campaigns.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No campaigns yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get started by creating your first email campaign
            </p>
            <Button onClick={onCreateCampaign} data-testid="button-create-first-campaign">
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{campaign.name}</CardTitle>
                    {getStatusBadge(campaign.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Subject</p>
                  <p className="text-sm font-medium line-clamp-1">{campaign.subject}</p>
                </div>
                
                {campaign.scheduledAt && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Scheduled For</p>
                    <p className="text-sm font-medium">
                      {format(new Date(campaign.scheduledAt), "MMM d, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Created</p>
                  <p className="text-sm">
                    {format(new Date(campaign.createdAt), "MMM d, yyyy")}
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => onViewCampaign(campaign)}
                    data-testid={`button-view-campaign-${campaign.id}`}
                  >
                    <BarChart2 className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    data-testid={`button-delete-campaign-${campaign.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
