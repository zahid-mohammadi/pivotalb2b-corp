import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Zap, Trash2, Edit, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import type { AutomationRule } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AutomationRuleListProps {
  onCreateRule: () => void;
  onEditRule: (rule: AutomationRule) => void;
}

export function AutomationRuleList({ onCreateRule, onEditRule }: AutomationRuleListProps) {
  const { toast } = useToast();
  
  const { data: rules, isLoading } = useQuery<AutomationRule[]>({
    queryKey: ["/api/pipeline/automation-rules"],
  });

  const handleToggleActive = async (rule: AutomationRule) => {
    try {
      await apiRequest("PATCH", `/api/pipeline/automation-rules/${rule.id}`, {
        isActive: rule.isActive ? 0 : 1,
      });
      
      queryClient.invalidateQueries({ queryKey: ["/api/pipeline/automation-rules"] });
      
      toast({
        title: rule.isActive ? "Rule deactivated" : "Rule activated",
        description: `Automation rule "${rule.name}" has been ${rule.isActive ? 'deactivated' : 'activated'}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update automation rule",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRule = async (id: number, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await apiRequest("DELETE", `/api/pipeline/automation-rules/${id}`);
      
      queryClient.invalidateQueries({ queryKey: ["/api/pipeline/automation-rules"] });
      
      toast({
        title: "Rule deleted",
        description: "The automation rule has been successfully deleted",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete automation rule",
        variant: "destructive",
      });
    }
  };

  const getTriggerLabel = (trigger: string) => {
    const labels: Record<string, string> = {
      'deal_created': 'When deal is created',
      'deal_stage_changed': 'When deal stage changes',
      'deal_value_changed': 'When deal value changes',
      'time_based': 'Time-based trigger',
      'activity_added': 'When activity is added',
    };
    return labels[trigger] || trigger;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading automation rules...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Automation Rules</h2>
          <p className="text-muted-foreground">
            Create automated workflows to streamline your pipeline
          </p>
        </div>
        <Button onClick={onCreateRule} data-testid="button-create-automation">
          <Plus className="h-4 w-4 mr-2" />
          New Rule
        </Button>
      </div>

      {!rules || rules.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Zap className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No automation rules yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get started by creating your first automation rule
            </p>
            <Button onClick={onCreateRule} data-testid="button-create-first-automation">
              <Plus className="h-4 w-4 mr-2" />
              Create Rule
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {rules.map((rule) => (
            <Card key={rule.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{rule.name}</CardTitle>
                      {rule.isActive ? (
                        <Badge variant="default" className="gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1">
                          <XCircle className="h-3 w-3" />
                          Inactive
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {getTriggerLabel(rule.trigger)}
                    </p>
                  </div>
                  <Switch
                    checked={!!rule.isActive}
                    onCheckedChange={() => handleToggleActive(rule)}
                    data-testid={`switch-rule-${rule.id}`}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Actions</p>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(rule.actions) && rule.actions.map((action: any, idx: number) => (
                      <Badge key={idx} variant="outline">
                        {action.type === 'send_email' && '📧 Send Email'}
                        {action.type === 'move_deal' && '➡️ Move Deal'}
                        {action.type === 'assign_user' && '👤 Assign User'}
                        {action.type === 'create_activity' && '📝 Create Activity'}
                        {action.type === 'send_campaign' && '📬 Send Campaign'}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Created {format(new Date(rule.createdAt), "MMM d, yyyy")}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditRule(rule)}
                    data-testid={`button-edit-rule-${rule.id}`}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteRule(rule.id, rule.name)}
                    data-testid={`button-delete-rule-${rule.id}`}
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
