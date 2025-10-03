import { useQuery, useMutation } from "@tanstack/react-query";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Mail, Eye, MousePointer, XCircle, Users, Calendar, Clock, Send } from "lucide-react";
import { format } from "date-fns";
import type { EmailCampaign } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

interface CampaignStats {
  totalSent: number;
  totalOpened: number;
  totalClicked: number;
  totalBounced: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
}

interface CampaignDetailsProps {
  campaign: EmailCampaign;
  open: boolean;
  onClose: () => void;
}

export function CampaignDetails({ campaign, open, onClose }: CampaignDetailsProps) {
  const { toast } = useToast();

  const { data: stats } = useQuery<CampaignStats>({
    queryKey: ["/api/campaigns", campaign.id, "stats"],
    queryFn: async () => {
      const response = await fetch(`/api/campaigns/${campaign.id}/stats`);
      if (!response.ok) throw new Error("Failed to fetch stats");
      return response.json();
    },
    enabled: open,
  });

  const sendCampaignMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest(`/api/pipeline/campaigns/${campaign.id}/execute`, "POST");
    },
    onSuccess: () => {
      toast({
        title: "Campaign Sent",
        description: "Your campaign has been sent successfully with tracking enabled.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/pipeline/campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["/api/campaigns", campaign.id, "stats"] });
      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to send campaign",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />Draft</Badge>;
      case "scheduled":
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Scheduled</Badge>;
      case "sent":
        return <Badge variant="default"><Mail className="h-3 w-3 mr-1" />Sent</Badge>;
      case "sending":
        return <Badge variant="secondary"><Mail className="h-3 w-3 mr-1" />Sending</Badge>;
      case "failed":
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-3xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{campaign.name}</SheetTitle>
          <SheetDescription>
            Campaign analytics and performance metrics
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              {getStatusBadge(campaign.status)}
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Created</p>
              <p className="text-sm font-medium">
                {format(new Date(campaign.createdAt), "MMM d, yyyy")}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Subject Line</p>
            <p className="text-base font-medium">{campaign.subject}</p>
          </div>

          {(campaign.status === "draft" || campaign.status === "scheduled") && (
            <Button
              onClick={() => sendCampaignMutation.mutate()}
              disabled={sendCampaignMutation.isPending}
              className="w-full"
              data-testid="button-send-campaign"
            >
              <Send className="h-4 w-4 mr-2" />
              {sendCampaignMutation.isPending ? "Sending..." : "Send Campaign Now"}
            </Button>
          )}

          {campaign.scheduledAt && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Scheduled For</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">
                  {format(new Date(campaign.scheduledAt), "MMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
            </div>
          )}

          {campaign.sentAt && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Sent At</p>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-medium">
                  {format(new Date(campaign.sentAt), "MMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
            </div>
          )}

          {stats && campaign.status === "sent" && (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-500" />
                      Total Sent
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalSent}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Eye className="h-4 w-4 text-green-500" />
                      Open Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.openRate.toFixed(1)}%</div>
                    <Progress value={stats.openRate} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <MousePointer className="h-4 w-4 text-purple-500" />
                      Click Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.clickRate.toFixed(1)}%</div>
                    <Progress value={stats.clickRate} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      Bounce Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.bounceRate.toFixed(1)}%</div>
                    <Progress value={stats.bounceRate} className="mt-2" />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Engagement Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Opened</span>
                    <span className="text-sm font-medium">{stats.totalOpened} recipients</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Clicked</span>
                    <span className="text-sm font-medium">{stats.totalClicked} recipients</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Bounced</span>
                    <span className="text-sm font-medium">{stats.totalBounced} recipients</span>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {campaign.status === "draft" && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  This campaign hasn't been sent yet. Analytics will be available after sending.
                </p>
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            <p className="text-sm font-medium">Email Preview</p>
            <Card>
              <CardContent className="pt-6">
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: campaign.content }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
