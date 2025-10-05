import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Plus, Pencil, Building, Mail, MapPin, DollarSign } from "lucide-react";
import type { Account } from "@shared/schema";

export function CustomerManagement() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Account | null>(null);

  const { data: customers, isLoading } = useQuery<Account[]>({
    queryKey: ["/api/accounts"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: Partial<Account>) => {
      const res = await apiRequest("POST", "/api/accounts", data);
      if (!res.ok) throw new Error("Failed to create customer");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/accounts"] });
      setDialogOpen(false);
      toast({ title: "Customer created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create customer", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Account> }) => {
      const res = await apiRequest("PATCH", `/api/accounts/${id}`, data);
      if (!res.ok) throw new Error("Failed to update customer");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/accounts"] });
      setDialogOpen(false);
      setEditingCustomer(null);
      toast({ title: "Customer updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update customer", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      companyName: formData.get("companyName") as string,
      contactName: formData.get("contactName") as string || undefined,
      billingEmail: formData.get("billingEmail") as string || undefined,
      billingAddress: formData.get("billingAddress") as string || undefined,
      billingCity: formData.get("billingCity") as string || undefined,
      billingState: formData.get("billingState") as string || undefined,
      billingZip: formData.get("billingZip") as string || undefined,
      taxId: formData.get("taxId") as string || undefined,
      paymentTerms: formData.get("paymentTerms") as string || undefined,
      currency: formData.get("currency") as string || undefined,
      website: formData.get("website") as string || undefined,
      country: formData.get("country") as string || undefined,
    };

    if (editingCustomer) {
      updateMutation.mutate({ id: editingCustomer.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Customers</h3>
          <p className="text-sm text-muted-foreground">Manage your billing customers</p>
        </div>
        <Button onClick={() => { setEditingCustomer(null); setDialogOpen(true); }} data-testid="add-customer">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Loading customers...</p>
          </CardContent>
        </Card>
      ) : customers && customers.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {customers.map((customer) => (
            <Card key={customer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-base">{customer.companyName}</CardTitle>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingCustomer(customer);
                      setDialogOpen(true);
                    }}
                    data-testid={`edit-customer-${customer.id}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {customer.billingEmail && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{customer.billingEmail}</span>
                  </div>
                )}
                {customer.country && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{customer.country}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.currency || "USD"} • {customer.paymentTerms || "Net 30"}</span>
                </div>
                {customer.taxId && (
                  <div className="text-xs text-muted-foreground">
                    Tax ID: {customer.taxId}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8 text-muted-foreground">
              <Building className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No customers yet</p>
              <p className="text-sm mt-1">Add your first customer to get started</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCustomer ? "Edit Customer" : "Add New Customer"}
            </DialogTitle>
            <DialogDescription>
              {editingCustomer ? "Update billing information for this customer" : "Add a new customer for billing"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  name="companyName"
                  defaultValue={editingCustomer?.companyName}
                  required
                  data-testid="customer-company-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name</Label>
                <Input
                  id="contactName"
                  name="contactName"
                  defaultValue={editingCustomer?.contactName || ""}
                  placeholder="Primary contact person"
                  data-testid="customer-contact-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billingEmail">Billing Email</Label>
                <Input
                  id="billingEmail"
                  name="billingEmail"
                  type="email"
                  defaultValue={editingCustomer?.billingEmail || ""}
                  data-testid="customer-billing-email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  defaultValue={editingCustomer?.website || ""}
                  data-testid="customer-website"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  defaultValue={editingCustomer?.country || ""}
                  data-testid="customer-country"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID / VAT Number</Label>
                <Input
                  id="taxId"
                  name="taxId"
                  defaultValue={editingCustomer?.taxId || ""}
                  data-testid="customer-tax-id"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentTerms">Payment Terms</Label>
                <Input
                  id="paymentTerms"
                  name="paymentTerms"
                  defaultValue={editingCustomer?.paymentTerms || "Net 30"}
                  data-testid="customer-payment-terms"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  name="currency"
                  defaultValue={editingCustomer?.currency || "USD"}
                  maxLength={3}
                  data-testid="customer-currency"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="billingAddress">Billing Address</Label>
              <textarea
                id="billingAddress"
                name="billingAddress"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue={editingCustomer?.billingAddress || ""}
                placeholder="Street address"
                data-testid="customer-billing-address"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="billingCity">City</Label>
                <Input
                  id="billingCity"
                  name="billingCity"
                  defaultValue={editingCustomer?.billingCity || ""}
                  data-testid="customer-billing-city"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billingState">State / Province</Label>
                <Input
                  id="billingState"
                  name="billingState"
                  defaultValue={editingCustomer?.billingState || ""}
                  data-testid="customer-billing-state"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billingZip">ZIP / Postal Code</Label>
                <Input
                  id="billingZip"
                  name="billingZip"
                  defaultValue={editingCustomer?.billingZip || ""}
                  data-testid="customer-billing-zip"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} data-testid="save-customer">
                {createMutation.isPending || updateMutation.isPending ? "Saving..." : editingCustomer ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
