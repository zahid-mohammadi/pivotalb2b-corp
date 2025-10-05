import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Plus, FileText, Eye, Calendar, DollarSign, X, Pencil } from "lucide-react";
import { format } from "date-fns";
import type { Invoice, Account, Sku, TaxCode } from "@shared/schema";

interface InvoiceLineItem {
  skuId?: number;
  description: string;
  quantity: number;
  unitPrice: number;
  taxCodeId?: number;
  lineSubtotal: number;
  lineTax: number;
  lineTotal: number;
}

export function InvoiceManagement() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([
    { description: "", quantity: 1, unitPrice: 0, lineSubtotal: 0, lineTax: 0, lineTotal: 0 }
  ]);

  const { data: invoices, isLoading } = useQuery<Invoice[]>({
    queryKey: ["/api/invoices"],
  });

  const { data: customers } = useQuery<Account[]>({
    queryKey: ["/api/accounts"],
  });

  const { data: skus } = useQuery<Sku[]>({
    queryKey: ["/api/skus"],
  });

  const { data: taxCodes } = useQuery<TaxCode[]>({
    queryKey: ["/api/tax-codes"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/invoices", data);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create invoice");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/invoices"] });
      setDialogOpen(false);
      setLineItems([{ description: "", quantity: 1, unitPrice: 0, lineSubtotal: 0, lineTax: 0, lineTotal: 0 }]);
      toast({ title: "Invoice created successfully" });
    },
    onError: (error: Error) => {
      toast({ title: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const validLineItems = lineItems.filter(item => item.description && item.quantity > 0);
    if (validLineItems.length === 0) {
      toast({ title: "Add at least one line item", variant: "destructive" });
      return;
    }

    const subtotal = validLineItems.reduce((sum, item) => sum + item.lineSubtotal, 0);
    const taxTotal = validLineItems.reduce((sum, item) => sum + item.lineTax, 0);
    const total = validLineItems.reduce((sum, item) => sum + item.lineTotal, 0);

    const data = {
      accountId: parseInt(formData.get("accountId") as string),
      number: formData.get("invoiceNumber") as string,
      issueDate: formData.get("invoiceDate") as string,
      dueDate: formData.get("dueDate") as string,
      subtotal: Math.round(subtotal * 100),
      taxTotal: Math.round(taxTotal * 100),
      total: Math.round(total * 100),
      amountDue: Math.round(total * 100),
      status: "draft" as const,
      lines: validLineItems.map((item, index) => ({
        skuId: item.skuId,
        description: item.description,
        quantity: item.quantity.toString(),
        unitPrice: Math.round(item.unitPrice * 100),
        taxCodeId: item.taxCodeId,
        lineSubtotal: Math.round(item.lineSubtotal * 100),
        lineTax: Math.round(item.lineTax * 100),
        lineTotal: Math.round(item.lineTotal * 100),
        sortOrder: index,
      })),
      notes: formData.get("notes") as string || undefined,
    };

    createMutation.mutate(data);
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { description: "", quantity: 1, unitPrice: 0, lineSubtotal: 0, lineTax: 0, lineTotal: 0 }]);
  };

  const removeLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const updateLineItem = (index: number, field: keyof InvoiceLineItem, value: any) => {
    const updated = [...lineItems];
    updated[index] = { ...updated[index], [field]: value };
    
    if (field === "quantity" || field === "unitPrice") {
      updated[index].lineSubtotal = updated[index].quantity * updated[index].unitPrice;
      
      const taxCode = taxCodes?.find(tc => tc.id === updated[index].taxCodeId);
      if (taxCode) {
        updated[index].lineTax = updated[index].lineSubtotal * (parseFloat(taxCode.rate) / 100);
      } else {
        updated[index].lineTax = 0;
      }
      updated[index].lineTotal = updated[index].lineSubtotal + updated[index].lineTax;
    }
    
    if (field === "skuId" && value) {
      const sku = skus?.find(s => s.id === parseInt(value));
      if (sku) {
        updated[index].description = sku.name;
        updated[index].unitPrice = sku.unitPrice / 100;
        updated[index].lineSubtotal = updated[index].quantity * updated[index].unitPrice;
        
        const taxCode = taxCodes?.find(tc => tc.id === updated[index].taxCodeId);
        if (taxCode) {
          updated[index].lineTax = updated[index].lineSubtotal * (parseFloat(taxCode.rate) / 100);
        } else {
          updated[index].lineTax = 0;
        }
        updated[index].lineTotal = updated[index].lineSubtotal + updated[index].lineTax;
      }
    }
    
    setLineItems(updated);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-500";
      case "sent": return "bg-blue-500";
      case "overdue": return "bg-red-500";
      case "draft": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Invoices</h3>
          <p className="text-sm text-muted-foreground">Manage your invoices and estimates</p>
        </div>
        <Button onClick={() => setDialogOpen(true)} data-testid="create-invoice">
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Loading invoices...</p>
          </CardContent>
        </Card>
      ) : invoices && invoices.length > 0 ? (
        <div className="space-y-3">
          {invoices.map((invoice) => {
            const customer = customers?.find(c => c.id === invoice.accountId);
            return (
              <Card key={invoice.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{invoice.number}</h4>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{customer?.companyName}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(invoice.issueDate), "MMM d, yyyy")}
                          </span>
                          <span>Due: {format(new Date(invoice.dueDate), "MMM d, yyyy")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold">${(invoice.total / 100).toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground">
                          {invoice.currency || "USD"}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setViewDialogOpen(true);
                        }}
                        data-testid={`view-invoice-${invoice.id}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
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
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No invoices yet</p>
              <p className="text-sm mt-1">Create your first invoice to get started</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
            <DialogDescription>
              Create an invoice with line items and send it to your customer
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="accountId">Customer *</Label>
                <Select name="accountId" required>
                  <SelectTrigger data-testid="invoice-customer">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers?.map(customer => (
                      <SelectItem key={customer.id} value={customer.id.toString()}>
                        {customer.companyName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoiceNumber">Invoice Number *</Label>
                <Input
                  id="invoiceNumber"
                  name="invoiceNumber"
                  defaultValue={`INV-${Date.now()}`}
                  required
                  data-testid="invoice-number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoiceDate">Invoice Date *</Label>
                <Input
                  id="invoiceDate"
                  name="invoiceDate"
                  type="date"
                  defaultValue={format(new Date(), "yyyy-MM-dd")}
                  required
                  data-testid="invoice-date"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  defaultValue={format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd")}
                  required
                  data-testid="invoice-due-date"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Line Items *</Label>
                <Button type="button" size="sm" variant="outline" onClick={addLineItem} data-testid="add-line-item">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </Button>
              </div>
              
              {lineItems.map((item, index) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="grid gap-3 md:grid-cols-12">
                      <div className="md:col-span-4">
                        <Label className="text-xs">Product/Service</Label>
                        <Select
                          value={item.skuId?.toString() || ""}
                          onValueChange={(value) => updateLineItem(index, "skuId", value)}
                        >
                          <SelectTrigger className="h-9" data-testid={`line-item-sku-${index}`}>
                            <SelectValue placeholder="Select or enter custom" />
                          </SelectTrigger>
                          <SelectContent>
                            {skus?.map(sku => (
                              <SelectItem key={sku.id} value={sku.id.toString()}>
                                {sku.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-3">
                        <Label className="text-xs">Description</Label>
                        <Input
                          className="h-9"
                          value={item.description}
                          onChange={(e) => updateLineItem(index, "description", e.target.value)}
                          placeholder="Description"
                          data-testid={`line-item-description-${index}`}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-xs">Quantity</Label>
                        <Input
                          className="h-9"
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateLineItem(index, "quantity", parseFloat(e.target.value) || 0)}
                          data-testid={`line-item-quantity-${index}`}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-xs">Unit Price</Label>
                        <Input
                          className="h-9"
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.unitPrice}
                          onChange={(e) => updateLineItem(index, "unitPrice", parseFloat(e.target.value) || 0)}
                          data-testid={`line-item-price-${index}`}
                        />
                      </div>
                      <div className="md:col-span-1 flex items-end">
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="h-9"
                          onClick={() => removeLineItem(index)}
                          disabled={lineItems.length === 1}
                          data-testid={`remove-line-item-${index}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 text-right text-sm font-medium">
                      Total: ${item.lineTotal.toFixed(2)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                name="notes"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Additional notes or terms..."
                data-testid="invoice-notes"
              />
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${lineItems.reduce((sum, item) => sum + item.lineSubtotal, 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax:</span>
                    <span>
                      ${lineItems.reduce((sum, item) => sum + item.lineTax, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>
                      ${lineItems.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createMutation.isPending} data-testid="save-invoice">
                {createMutation.isPending ? "Creating..." : "Create Invoice"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogDescription>
              View complete invoice information and line items
            </DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Invoice Number</Label>
                  <p className="font-medium">{selectedInvoice.number}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <Badge className={getStatusColor(selectedInvoice.status)}>
                    {selectedInvoice.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Invoice Date</Label>
                  <p>{format(new Date(selectedInvoice.issueDate), "MMMM d, yyyy")}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Due Date</Label>
                  <p>{format(new Date(selectedInvoice.dueDate), "MMMM d, yyyy")}</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${(selectedInvoice.subtotal / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>${(selectedInvoice.taxTotal / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total:</span>
                      <span>${(selectedInvoice.total / 100).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
