import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, Save, Trash2 } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { AutomationRule, PipelineStage, EmailCampaign } from "@shared/schema";

const automationSchema = z.object({
  name: z.string().min(1, "Rule name is required"),
  trigger: z.enum(["deal_created", "deal_stage_changed", "deal_value_changed", "time_based", "activity_added"]),
  isActive: z.number(),
});

type AutomationFormData = z.infer<typeof automationSchema>;

interface Action {
  type: string;
  config: Record<string, any>;
}

interface AutomationRuleFormProps {
  rule?: AutomationRule;
  open: boolean;
  onClose: () => void;
}

export function AutomationRuleForm({ rule, open, onClose }: AutomationRuleFormProps) {
  const { toast } = useToast();
  const [actions, setActions] = useState<Action[]>(
    (rule?.actions as Action[]) || []
  );

  const { data: stages } = useQuery<PipelineStage[]>({
    queryKey: ["/api/pipeline/stages"],
  });

  const { data: campaigns } = useQuery<EmailCampaign[]>({
    queryKey: ["/api/campaigns"],
  });

  const form = useForm<AutomationFormData>({
    resolver: zodResolver(automationSchema),
    defaultValues: {
      name: rule?.name || "",
      trigger: (rule?.trigger as any) || "deal_created",
      isActive: rule?.isActive || 1,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: AutomationFormData & { actions: Action[] }) => {
      return apiRequest("POST", "/api/pipeline/automation-rules", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pipeline/automation-rules"] });
      toast({
        title: "Rule created",
        description: "Automation rule has been created successfully",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create automation rule",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: AutomationFormData & { actions: Action[] }) => {
      return apiRequest("PATCH", `/api/pipeline/automation-rules/${rule?.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pipeline/automation-rules"] });
      toast({
        title: "Rule updated",
        description: "Automation rule has been updated successfully",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update automation rule",
        variant: "destructive",
      });
    },
  });

  const addAction = (type: string) => {
    const newAction: Action = {
      type,
      config: {},
    };
    setActions([...actions, newAction]);
  };

  const removeAction = (index: number) => {
    setActions(actions.filter((_, i) => i !== index));
  };

  const updateActionConfig = (index: number, key: string, value: any) => {
    const newActions = [...actions];
    newActions[index].config[key] = value;
    setActions(newActions);
  };

  const onSubmit = (data: AutomationFormData) => {
    if (actions.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one action",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      ...data,
      actions,
    };

    if (rule) {
      updateMutation.mutate(payload);
    } else {
      createMutation.mutate(payload);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{rule ? "Edit Automation Rule" : "Create Automation Rule"}</SheetTitle>
          <SheetDescription>
            {rule ? "Update your automation rule" : "Create a new automation rule to streamline your workflow"}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="name">Rule Name</Label>
            <Input
              id="name"
              {...form.register("name")}
              placeholder="Auto-assign high-value deals"
              data-testid="input-rule-name"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="trigger">Trigger Event</Label>
            <Select
              defaultValue={form.getValues("trigger")}
              onValueChange={(value) => form.setValue("trigger", value as any)}
            >
              <SelectTrigger data-testid="select-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deal_created">When deal is created</SelectItem>
                <SelectItem value="deal_stage_changed">When deal stage changes</SelectItem>
                <SelectItem value="deal_value_changed">When deal value changes</SelectItem>
                <SelectItem value="activity_added">When activity is added</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Actions</Label>
              <Select onValueChange={addAction}>
                <SelectTrigger className="w-48" data-testid="select-add-action">
                  <SelectValue placeholder="Add action..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="move_deal">Move Deal to Stage</SelectItem>
                  <SelectItem value="send_email">Send Email</SelectItem>
                  <SelectItem value="send_campaign">Send Campaign</SelectItem>
                  <SelectItem value="create_activity">Create Activity Note</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {actions.length === 0 && (
              <p className="text-sm text-muted-foreground">No actions added yet. Add at least one action.</p>
            )}

            {actions.map((action, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">
                      {action.type === 'move_deal' && 'Move Deal to Stage'}
                      {action.type === 'send_email' && 'Send Email'}
                      {action.type === 'send_campaign' && 'Send Campaign'}
                      {action.type === 'create_activity' && 'Create Activity Note'}
                    </CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAction(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {action.type === 'move_deal' && (
                    <div className="space-y-2">
                      <Label>Target Stage</Label>
                      <Select
                        value={action.config.stageId?.toString()}
                        onValueChange={(value) => updateActionConfig(index, 'stageId', parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage..." />
                        </SelectTrigger>
                        <SelectContent>
                          {stages?.map((stage) => (
                            <SelectItem key={stage.id} value={stage.id.toString()}>
                              {stage.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {action.type === 'send_email' && (
                    <>
                      <div className="space-y-2">
                        <Label>Email Subject</Label>
                        <Input
                          value={action.config.subject || ''}
                          onChange={(e) => updateActionConfig(index, 'subject', e.target.value)}
                          placeholder="Follow-up on your deal"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email Body</Label>
                        <Input
                          value={action.config.body || ''}
                          onChange={(e) => updateActionConfig(index, 'body', e.target.value)}
                          placeholder="Hi {{contact_name}}, ..."
                        />
                      </div>
                    </>
                  )}

                  {action.type === 'send_campaign' && (
                    <div className="space-y-2">
                      <Label>Campaign</Label>
                      <Select
                        value={action.config.campaignId?.toString()}
                        onValueChange={(value) => updateActionConfig(index, 'campaignId', parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select campaign..." />
                        </SelectTrigger>
                        <SelectContent>
                          {campaigns?.map((campaign) => (
                            <SelectItem key={campaign.id} value={campaign.id.toString()}>
                              {campaign.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {action.type === 'create_activity' && (
                    <div className="space-y-2">
                      <Label>Activity Note</Label>
                      <Input
                        value={action.config.note || ''}
                        onChange={(e) => updateActionConfig(index, 'note', e.target.value)}
                        placeholder="Automated follow-up scheduled"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="flex-1"
              data-testid="button-save-rule"
            >
              <Save className="h-4 w-4 mr-2" />
              {rule ? "Update" : "Create"} Rule
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-testid="button-cancel-rule"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
