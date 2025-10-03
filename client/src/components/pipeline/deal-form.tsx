import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPipelineDealSchema } from "@shared/schema";
import type { InsertPipelineDeal, PipelineDeal, PipelineStage } from "@shared/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { X } from "lucide-react";

const dealFormSchema = insertPipelineDealSchema.extend({
  dealValue: z.number().optional(),
  probability: z.number().min(0).max(100).optional(),
});

type DealFormData = z.infer<typeof dealFormSchema>;

interface DealFormProps {
  deal?: PipelineDeal;
  defaultStageId?: number;
  onClose: () => void;
}

export function DealForm({ deal, defaultStageId, onClose }: DealFormProps) {
  const { toast } = useToast();
  
  const { data: stages = [] } = useQuery<PipelineStage[]>({
    queryKey: ["/api/pipeline/stages"],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DealFormData>({
    resolver: zodResolver(dealFormSchema),
    defaultValues: deal ? {
      fullName: deal.fullName,
      email: deal.email,
      company: deal.company,
      phone: deal.phone || "",
      jobTitle: deal.jobTitle || "",
      stageId: deal.stageId,
      dealValue: deal.dealValue || undefined,
      probability: deal.probability || undefined,
      source: deal.source,
      notes: deal.notes || "",
    } : {
      fullName: "",
      email: "",
      company: "",
      phone: "",
      jobTitle: "",
      stageId: defaultStageId || stages[0]?.id || 1,
      source: "manual",
    },
  });

  const createDealMutation = useMutation({
    mutationFn: async (data: DealFormData) => {
      const res = await apiRequest("POST", "/api/pipeline/deals", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pipeline/deals"] });
      toast({ title: "Deal created successfully" });
      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating deal",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateDealMutation = useMutation({
    mutationFn: async (data: Partial<InsertPipelineDeal>) => {
      await apiRequest("PATCH", `/api/pipeline/deals/${deal?.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pipeline/deals"] });
      toast({ title: "Deal updated successfully" });
      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating deal",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: DealFormData) => {
    if (deal) {
      updateDealMutation.mutate(data);
    } else {
      createDealMutation.mutate(data);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {deal ? "Edit Deal" : "Create New Deal"}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} data-testid="close-deal-form">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                {...register("fullName")}
                placeholder="John Doe"
                data-testid="input-fullName"
              />
              {errors.fullName && (
                <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="john@company.com"
                data-testid="input-email"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                {...register("company")}
                placeholder="Acme Inc."
                data-testid="input-company"
              />
              {errors.company && (
                <p className="text-sm text-destructive mt-1">{errors.company.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="+1 234 567 8900"
                data-testid="input-phone"
              />
            </div>

            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                {...register("jobTitle")}
                placeholder="Marketing Director"
                data-testid="input-jobTitle"
              />
            </div>

            <div>
              <Label htmlFor="stageId">Pipeline Stage *</Label>
              <Select
                value={watch("stageId")?.toString()}
                onValueChange={(value) => setValue("stageId", parseInt(value))}
              >
                <SelectTrigger data-testid="select-stage">
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((stage) => (
                    <SelectItem key={stage.id} value={stage.id.toString()}>
                      {stage.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dealValue">Deal Value ($)</Label>
              <Input
                id="dealValue"
                type="number"
                {...register("dealValue", { valueAsNumber: true })}
                placeholder="50000"
                data-testid="input-dealValue"
              />
            </div>

            <div>
              <Label htmlFor="probability">Win Probability (%)</Label>
              <Input
                id="probability"
                type="number"
                min="0"
                max="100"
                {...register("probability", { valueAsNumber: true })}
                placeholder="50"
                data-testid="input-probability"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Add any additional notes about this deal..."
              className="min-h-[100px]"
              data-testid="textarea-notes"
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createDealMutation.isPending || updateDealMutation.isPending}
              data-testid="button-submit"
            >
              {deal ? "Update Deal" : "Create Deal"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
