import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Plus, Percent, Pencil } from "lucide-react";
import type { TaxCode } from "@shared/schema";

export function TaxCodeManagement() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<TaxCode | null>(null);

  const { data: taxCodes, isLoading } = useQuery<TaxCode[]>({
    queryKey: ["/api/tax-codes"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/tax-codes", data);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create tax code");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tax-codes"] });
      setDialogOpen(false);
      setEditingCode(null);
      toast({ title: "Tax code created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await apiRequest("PATCH", `/api/tax-codes/${id}`, data);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update tax code");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tax-codes"] });
      setDialogOpen(false);
      setEditingCode(null);
      toast({ title: "Tax code updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      name: formData.get("name") as string,
      rate: formData.get("rate") as string,
      jurisdiction: formData.get("jurisdiction") as string || undefined,
      isCompounding: formData.get("isCompounding") === "true",
      isInclusive: formData.get("isInclusive") === "true",
    };

    if (editingCode) {
      updateMutation.mutate({ id: editingCode.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Tax Codes</h3>
          <p className="text-sm text-muted-foreground">Configure tax rates and codes</p>
        </div>
        <Button onClick={() => { setEditingCode(null); setDialogOpen(true); }} data-testid="add-tax-code">
          <Plus className="h-4 w-4 mr-2" />
          Add Tax Code
        </Button>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Loading tax codes...</p>
          </CardContent>
        </Card>
      ) : taxCodes && taxCodes.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {taxCodes.map((code) => (
            <Card key={code.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Percent className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-base">{code.name}</CardTitle>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingCode(code);
                      setDialogOpen(true);
                    }}
                    data-testid={`edit-tax-code-${code.id}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-2xl font-bold">
                    {parseFloat(code.rate).toFixed(1)}%
                  </span>
                  <div className="flex flex-col items-end gap-1">
                    {code.jurisdiction && (
                      <Badge variant="outline">{code.jurisdiction}</Badge>
                    )}
                    {code.isCompounding && (
                      <Badge variant="secondary">Compounding</Badge>
                    )}
                    {code.isInclusive && (
                      <Badge variant="secondary">Inclusive</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8 text-muted-foreground">
              <Percent className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No tax codes yet</p>
              <p className="text-sm mt-1">Add your first tax code to get started</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingCode ? "Edit Tax Code" : "Add New Tax Code"}
            </DialogTitle>
            <DialogDescription>
              {editingCode ? "Update tax code configuration" : "Configure a new tax rate for invoicing"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingCode?.name}
                  placeholder="e.g., Standard VAT, Sales Tax"
                  required
                  data-testid="tax-code-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate">Rate (%) *</Label>
                <Input
                  id="rate"
                  name="rate"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  defaultValue={editingCode?.rate}
                  required
                  data-testid="tax-code-rate"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="jurisdiction">Jurisdiction</Label>
                <Input
                  id="jurisdiction"
                  name="jurisdiction"
                  defaultValue={editingCode?.jurisdiction || ""}
                  placeholder="e.g., Federal, State, Local"
                  data-testid="tax-code-jurisdiction"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isCompounding"
                  name="isCompounding"
                  value="true"
                  defaultChecked={editingCode?.isCompounding}
                  className="rounded border-gray-300"
                  data-testid="tax-code-compounding"
                />
                <Label htmlFor="isCompounding" className="cursor-pointer">
                  Compounding Tax (applied on subtotal + other taxes)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isInclusive"
                  name="isInclusive"
                  value="true"
                  defaultChecked={editingCode?.isInclusive}
                  className="rounded border-gray-300"
                  data-testid="tax-code-inclusive"
                />
                <Label htmlFor="isInclusive" className="cursor-pointer">
                  Inclusive Tax (included in price)
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} data-testid="save-tax-code">
                {createMutation.isPending || updateMutation.isPending ? "Saving..." : editingCode ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
