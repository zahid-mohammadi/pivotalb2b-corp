import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Mail, Phone, Building, DollarSign, Calendar, MessageSquare, X, Save, Flame } from "lucide-react";
import type { PipelineDeal, LeadActivity, PipelineStage } from "@shared/schema";
import { format } from "date-fns";
import { useState } from "react";

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

interface DealProfileProps {
  deal: PipelineDeal;
  onClose: () => void;
}

export function DealProfile({ deal, onClose }: DealProfileProps) {
  const [notes, setNotes] = useState(deal.notes || "");
  const [newActivity, setNewActivity] = useState({ subject: "", description: "" });

  const { data: stages = [] } = useQuery<PipelineStage[]>({
    queryKey: ["/api/pipeline/stages"],
  });

  const { data: activities = [] } = useQuery<LeadActivity[]>({
    queryKey: ["/api/pipeline/deals", deal.id, "activities"],
  });

  const updateDealMutation = useMutation({
    mutationFn: async (data: Partial<PipelineDeal>) => {
      await apiRequest("PATCH", `/api/pipeline/deals/${deal.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pipeline/deals"] });
    },
  });

  const createActivityMutation = useMutation({
    mutationFn: async (activity: { dealId: number; activityType: string; subject: string; description: string }) => {
      await apiRequest("POST", `/api/pipeline/deals/${deal.id}/activities`, activity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pipeline/deals", deal.id, "activities"] });
      setNewActivity({ subject: "", description: "" });
    },
  });

  const currentStage = stages.find(s => s.id === deal.stageId);
  const score = deal.engagementScore || 0;
  const engagement = getEngagementLevel(score);

  const handleSaveNotes = () => {
    updateDealMutation.mutate({ notes });
  };

  const handleAddActivity = () => {
    if (!newActivity.subject) return;
    createActivityMutation.mutate({
      dealId: deal.id,
      activityType: "note",
      subject: newActivity.subject,
      description: newActivity.description,
    });
  };

  const activityIcons: Record<string, any> = {
    email: Mail,
    call: Phone,
    note: MessageSquare,
    meeting: Calendar,
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl" data-testid="deal-profile-title">{deal.fullName}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{deal.company}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} data-testid="close-deal-profile">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-hidden p-0">
          <div className="grid md:grid-cols-3 gap-0 h-full">
            <div className="md:col-span-1 border-r p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-sm mb-3">Deal Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{deal.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{deal.email}</span>
                  </div>
                  {deal.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{deal.phone}</span>
                    </div>
                  )}
                  {deal.jobTitle && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Title: </span>
                      <span>{deal.jobTitle}</span>
                    </div>
                  )}
                  <div className="text-sm">
                    <span className="text-muted-foreground">Source: </span>
                    <Badge variant="outline">{deal.source}</Badge>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Stage: </span>
                    <Badge style={{ backgroundColor: currentStage?.color || undefined }}>
                      {currentStage?.name}
                    </Badge>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Engagement: </span>
                    <Badge 
                      variant="outline" 
                      className={engagement.color}
                      data-testid="engagement-score-profile"
                    >
                      {engagement.icon} {engagement.level} ({score} pts)
                    </Badge>
                  </div>
                  {deal.dealValue && (
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>${deal.dealValue.toLocaleString()}</span>
                    </div>
                  )}
                  {deal.probability && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Win Probability: </span>
                      <span>{deal.probability}%</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-semibold">Notes</Label>
                  <Button 
                    size="sm" 
                    onClick={handleSaveNotes}
                    disabled={updateDealMutation.isPending}
                    data-testid="save-notes"
                  >
                    <Save className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                </div>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this deal..."
                  className="min-h-[100px]"
                  data-testid="deal-notes"
                />
              </div>
            </div>

            <div className="md:col-span-2 p-6">
              <Tabs defaultValue="activities" className="h-full flex flex-col">
                <TabsList>
                  <TabsTrigger value="activities">Activity Timeline</TabsTrigger>
                  <TabsTrigger value="new-activity">Add Activity</TabsTrigger>
                </TabsList>
                
                <TabsContent value="activities" className="flex-1 overflow-hidden mt-4">
                  <ScrollArea className="h-full">
                    <div className="space-y-4">
                      {activities.map((activity) => {
                        const Icon = activityIcons[activity.activityType] || MessageSquare;
                        return (
                          <div key={activity.id} className="flex gap-3 pb-4 border-b last:border-0">
                            <div className="mt-1">
                              <div className="p-2 bg-muted rounded-full">
                                <Icon className="h-4 w-4" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <h4 className="font-medium text-sm">{activity.subject}</h4>
                                <span className="text-xs text-muted-foreground">
                                  {format(new Date(activity.createdAt), "MMM d, h:mm a")}
                                </span>
                              </div>
                              {activity.description && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  {activity.description}
                                </p>
                              )}
                              <Badge variant="secondary" className="mt-2 text-xs">
                                {activity.activityType}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                      {activities.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">
                          No activities yet. Add one to start tracking engagement.
                        </p>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="new-activity" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="activity-subject">Subject</Label>
                      <Input
                        id="activity-subject"
                        value={newActivity.subject}
                        onChange={(e) => setNewActivity({ ...newActivity, subject: e.target.value })}
                        placeholder="e.g., Follow-up call scheduled"
                        data-testid="activity-subject"
                      />
                    </div>
                    <div>
                      <Label htmlFor="activity-description">Description (optional)</Label>
                      <Textarea
                        id="activity-description"
                        value={newActivity.description}
                        onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                        placeholder="Add details about this activity..."
                        className="min-h-[100px]"
                        data-testid="activity-description"
                      />
                    </div>
                    <Button 
                      onClick={handleAddActivity}
                      disabled={!newActivity.subject || createActivityMutation.isPending}
                      data-testid="add-activity"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Add Activity
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
