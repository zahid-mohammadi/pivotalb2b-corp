import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Plus, Package, Pencil, DollarSign } from "lucide-react";
import type { Sku, TaxCode } from "@shared/schema";

export function SkuManagement() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSku, setEditingSku] = useState<Sku | null>(null);

  const { data: skus, isLoading } = useQuery<Sku[]>({
    queryKey: ["/api/skus"],
  });

  const { data: taxCodes } = useQuery<TaxCode[]>({
    queryKey: ["/api/tax-codes"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/skus", data);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create product");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/skus"] });
      setDialogOpen(false);
      setEditingSku(null);
      toast({ title: "Product created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await apiRequest("PATCH", `/api/skus/${id}`, data);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update product");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/skus"] });
      setDialogOpen(false);
      setEditingSku(null);
      toast({ title: "Product updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      code: formData.get("code") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string || undefined,
      unitPrice: Math.round(parseFloat(formData.get("unitPrice") as string) * 100),
      cost: formData.get("cost") ? Math.round(parseFloat(formData.get("cost") as string) * 100) : undefined,
      taxCodeId: formData.get("taxCodeId") ? parseInt(formData.get("taxCodeId") as string) : undefined,
      glCategory: formData.get("glCategory") as string || undefined,
      currency: formData.get("currency") as string || "USD",
      isActive: formData.get("isActive") === "true",
    };

    if (editingSku) {
      updateMutation.mutate({ id: editingSku.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Products & Services</h3>
          <p className="text-sm text-muted-foreground">Manage your product and service catalog</p>
        </div>
        <Button onClick={() => { setEditingSku(null); setDialogOpen(true); }} data-testid="add-product">
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Loading products...</p>
          </CardContent>
        </Card>
      ) : skus && skus.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skus.map((sku) => {
            const taxCode = taxCodes?.find(tc => tc.id === sku.taxCodeId);
            return (
              <Card key={sku.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-purple-500" />
                      <CardTitle className="text-base">{sku.name}</CardTitle>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditingSku(sku);
                        setDialogOpen(true);
                      }}
                      data-testid={`edit-sku-${sku.id}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-xs text-muted-foreground">
                    Code: {sku.code}
                  </div>
                  {sku.description && (
                    <p className="text-sm">{sku.description}</p>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-lg font-bold">
                        ${(sku.unitPrice / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {sku.currency}
                    </div>
                  </div>
                  {taxCode && (
                    <div className="text-xs text-muted-foreground">
                      Tax: {taxCode.name} ({parseFloat(taxCode.rate).toFixed(1)}%)
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Badge variant={sku.isActive ? "default" : "secondary"}>
                      {sku.isActive ? "Active" : "Inactive"}
                    </Badge>
                    {sku.glCategory && (
                      <Badge variant="outline">{sku.glCategory}</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No products yet</p>
              <p className="text-sm mt-1">Add your first product or service to get started</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSku ? "Edit Product/Service" : "Add New Product/Service"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="code">Product Code *</Label>
                <Input
                  id="code"
                  name="code"
                  defaultValue={editingSku?.code}
                  required
                  data-testid="sku-code"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={editingSku?.name}
                  required
                  data-testid="sku-name"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  defaultValue={editingSku?.description || ""}
                  data-testid="sku-description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitPrice">Unit Price *</Label>
                <Input
                  id="unitPrice"
                  name="unitPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={editingSku ? (editingSku.unitPrice / 100).toFixed(2) : ""}
                  required
                  data-testid="sku-price"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Cost (Optional)</Label>
                <Input
                  id="cost"
                  name="cost"
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={editingSku?.cost ? (editingSku.cost / 100).toFixed(2) : ""}
                  data-testid="sku-cost"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxCodeId">Tax Code</Label>
                <Select name="taxCodeId" defaultValue={editingSku?.taxCodeId?.toString() || ""}>
                  <SelectTrigger data-testid="sku-tax-code">
                    <SelectValue placeholder="Select tax code" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No Tax</SelectItem>
                    {taxCodes?.map(tc => (
                      <SelectItem key={tc.id} value={tc.id.toString()}>
                        {tc.name} ({parseFloat(tc.rate).toFixed(1)}%)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="glCategory">GL Category</Label>
                <Input
                  id="glCategory"
                  name="glCategory"
                  defaultValue={editingSku?.glCategory || ""}
                  placeholder="e.g., Revenue, Services"
                  data-testid="sku-gl-category"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  name="currency"
                  defaultValue={editingSku?.currency || "USD"}
                  maxLength={3}
                  data-testid="sku-currency"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="isActive">Status *</Label>
                <Select name="isActive" defaultValue={editingSku?.isActive !== false ? "true" : "false"}>
                  <SelectTrigger data-testid="sku-active">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} data-testid="save-sku">
                {createMutation.isPending || updateMutation.isPending ? "Saving..." : editingSku ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
