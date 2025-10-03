import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Send, Save, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { EmailCampaign, PipelineDeal } from "@shared/schema";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const campaignSchema = z.object({
  name: z.string().min(1, "Campaign name is required"),
  subject: z.string().min(1, "Subject line is required"),
  content: z.string().min(1, "Email content is required"),
  status: z.enum(["draft", "scheduled", "sent", "sending", "failed"]),
  scheduledAt: z.date().optional(),
  segmentFilters: z.object({
    stageIds: z.array(z.number()).optional(),
    dealValues: z.object({
      min: z.number().optional(),
      max: z.number().optional(),
    }).optional(),
  }).optional(),
});

type CampaignFormData = z.infer<typeof campaignSchema>;

interface CampaignFormProps {
  campaign?: EmailCampaign;
  open: boolean;
  onClose: () => void;
}

export function CampaignForm({ campaign, open, onClose }: CampaignFormProps) {
  const { toast } = useToast();
  const [emailContent, setEmailContent] = useState(campaign?.content || "");
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(
    campaign?.scheduledAt ? new Date(campaign.scheduledAt) : undefined
  );

  const { data: deals } = useQuery<PipelineDeal[]>({
    queryKey: ["/api/pipeline/deals"],
  });

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: campaign?.name || "",
      subject: campaign?.subject || "",
      content: campaign?.content || "",
      status: campaign?.status as any || "draft",
      scheduledAt: campaign?.scheduledAt ? new Date(campaign.scheduledAt) : undefined,
      segmentFilters: (campaign?.segmentFilters as any) || {},
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: CampaignFormData) => {
      return apiRequest("POST", "/api/campaigns", {
        ...data,
        scheduledAt: scheduledDate || null,
        content: emailContent,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/campaigns"] });
      toast({
        title: "Campaign created",
        description: "Your campaign has been created successfully",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create campaign",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: CampaignFormData) => {
      return apiRequest("PATCH", `/api/campaigns/${campaign?.id}`, {
        ...data,
        scheduledAt: scheduledDate || null,
        content: emailContent,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/campaigns"] });
      toast({
        title: "Campaign updated",
        description: "Your campaign has been updated successfully",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update campaign",
        variant: "destructive",
      });
    },
  });

  const sendMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", `/api/campaigns/${campaign?.id}/send`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/campaigns"] });
      toast({
        title: "Campaign sent",
        description: "Your campaign is being sent to recipients",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send campaign",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: CampaignFormData) => {
    if (campaign) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleSend = () => {
    if (campaign) {
      sendMutation.mutate();
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link"],
      ["clean"],
    ],
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{campaign ? "Edit Campaign" : "Create Campaign"}</SheetTitle>
          <SheetDescription>
            {campaign ? "Update your email campaign" : "Create a new email campaign to send to your pipeline"}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="name">Campaign Name</Label>
            <Input
              id="name"
              {...form.register("name")}
              placeholder="Q4 Product Launch Campaign"
              data-testid="input-campaign-name"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject Line</Label>
            <Input
              id="subject"
              {...form.register("subject")}
              placeholder="Exciting New Product Launch!"
              data-testid="input-campaign-subject"
            />
            {form.formState.errors.subject && (
              <p className="text-sm text-destructive">{form.formState.errors.subject.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Email Content</Label>
            <div className="border rounded-md" data-testid="editor-campaign-content">
              <ReactQuill
                theme="snow"
                value={emailContent}
                onChange={setEmailContent}
                modules={modules}
                placeholder="Write your email content here..."
              />
            </div>
            {form.formState.errors.content && (
              <p className="text-sm text-destructive">{form.formState.errors.content.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              defaultValue={form.getValues("status")}
              onValueChange={(value) => form.setValue("status", value as any)}
            >
              <SelectTrigger data-testid="select-campaign-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Schedule Send (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !scheduledDate && "text-muted-foreground"
                  )}
                  data-testid="button-schedule-date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {scheduledDate ? format(scheduledDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={scheduledDate}
                  onSelect={setScheduledDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="flex-1"
              data-testid="button-save-campaign"
            >
              <Save className="h-4 w-4 mr-2" />
              {campaign ? "Update" : "Create"} Campaign
            </Button>
            
            {campaign && campaign.status === "draft" && (
              <Button
                type="button"
                variant="default"
                onClick={handleSend}
                disabled={sendMutation.isPending}
                data-testid="button-send-campaign"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Now
              </Button>
            )}
            
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-testid="button-cancel-campaign"
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
