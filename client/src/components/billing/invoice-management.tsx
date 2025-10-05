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
import { Plus, FileText, Eye, Calendar, DollarSign, X, Pencil, Send, Printer, Download, Bell, Mail, MailOpen, Trash2 } from "lucide-react";
import { format } from "date-fns";
import type { Invoice, Account, Sku, TaxCode, Contact } from "@shared/schema";
import { EmailComposeDialog } from "./email-compose-dialog";
import { InvoiceActivityTracker } from "./invoice-activity-tracker";

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
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [reminderDialogOpen, setReminderDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(null);
  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([
    { description: "", quantity: 1, unitPrice: 0, lineSubtotal: 0, lineTax: 0, lineTotal: 0 }
  ]);

  const { data: invoices, isLoading } = useQuery<Invoice[]>({
    queryKey: ["/api/invoices"],
  });

  const { data: customers } = useQuery<Account[]>({
    queryKey: ["/api/accounts"],
  });

  const { data: contacts } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
  });

  const { data: skus } = useQuery<Sku[]>({
    queryKey: ["/api/skus"],
  });

  const { data: taxCodes } = useQuery<TaxCode[]>({
    queryKey: ["/api/tax-codes"],
  });

  const selectedAccount = customers?.find(c => c.id === selectedAccountId);
  const accountContacts = contacts?.filter((c) => c.accountId === selectedAccountId) || [];

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

  const sendMutation = useMutation({
    mutationFn: async ({ invoiceId, customMessage }: { invoiceId: number; customMessage?: string }) => {
      const res = await apiRequest("POST", `/api/invoices/${invoiceId}/send`, {
        customMessage: customMessage || undefined,
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to send invoice");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/invoices"] });
      setEmailDialogOpen(false);
      toast({ 
        title: "Invoice sent successfully!", 
        description: "Email tracking is active. You'll see when the customer opens it."
      });
    },
    onError: (error: Error) => {
      toast({ title: error.message, variant: "destructive" });
    },
  });

  const reminderMutation = useMutation({
    mutationFn: async ({ invoiceId, customMessage }: { invoiceId: number; customMessage?: string }) => {
      const res = await apiRequest("POST", `/api/invoices/${invoiceId}/reminder`, {
        customMessage: customMessage || undefined,
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to send reminder");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/invoices"] });
      setReminderDialogOpen(false);
      toast({ 
        title: "Reminder sent successfully!", 
        description: "The payment reminder has been sent to the customer."
      });
    },
    onError: (error: Error) => {
      toast({ title: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await apiRequest("PATCH", `/api/invoices/${id}`, data);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update invoice");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/invoices"] });
      setDialogOpen(false);
      setEditingInvoice(null);
      setLineItems([{ description: "", quantity: 1, unitPrice: 0, lineSubtotal: 0, lineTax: 0, lineTotal: 0 }]);
      toast({ title: "Invoice updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/invoices/${id}`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to delete invoice");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/invoices"] });
      toast({ title: "Invoice deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: error.message, variant: "destructive" });
    },
  });

  const handleSendInvoice = (invoice: Invoice) => {
    const account = customers?.find(c => c.id === invoice.accountId);
    if (!account?.billingEmail) {
      toast({ 
        title: "Cannot send invoice", 
        description: "Customer account has no billing email address",
        variant: "destructive" 
      });
      return;
    }
    setSelectedInvoice(invoice);
    setEmailDialogOpen(true);
  };

  const handleSendInvoiceEmail = (customMessage: string) => {
    if (!selectedInvoice) return;
    sendMutation.mutate({
      invoiceId: selectedInvoice.id,
      customMessage: customMessage || undefined,
    });
  };

  const handleSendReminder = (invoice: Invoice) => {
    const account = customers?.find(c => c.id === invoice.accountId);
    if (!account?.billingEmail) {
      toast({ 
        title: "Cannot send reminder", 
        description: "Customer account has no billing email address",
        variant: "destructive" 
      });
      return;
    }
    setSelectedInvoice(invoice);
    setReminderDialogOpen(true);
  };

  const handleSendReminderEmail = (customMessage: string) => {
    if (!selectedInvoice) return;
    reminderMutation.mutate({
      invoiceId: selectedInvoice.id,
      customMessage: customMessage || undefined,
    });
  };

  const handlePrintInvoice = (invoice: Invoice) => {
    const printWindow = window.open(`/api/invoices/${invoice.id}/pdf`, '_blank');
    if (printWindow) {
      printWindow.addEventListener('load', () => {
        printWindow.print();
      });
    }
  };

  const handleDownloadPDF = async (invoice: Invoice) => {
    try {
      window.open(`/api/invoices/${invoice.id}/pdf`, '_blank');
    } catch (error: any) {
      toast({ title: "Failed to download PDF", variant: "destructive" });
    }
  };

  const handleEditInvoice = async (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setSelectedAccountId(invoice.accountId);
    
    const res = await fetch(`/api/invoices/${invoice.id}/lines`);
    if (res.ok) {
      const lines = await res.json();
      const formattedLines = lines.map((line: any) => ({
        skuId: line.skuId,
        description: line.description,
        quantity: parseFloat(line.quantity),
        unitPrice: line.unitPrice / 100,
        taxCodeId: line.taxCodeId,
        lineSubtotal: line.lineSubtotal / 100,
        lineTax: line.lineTax / 100,
        lineTotal: line.lineTotal / 100,
      }));
      setLineItems(formattedLines);
    }
    
    setDialogOpen(true);
  };

  const handleDeleteInvoice = (invoice: Invoice) => {
    if (confirm(`Are you sure you want to delete invoice ${invoice.number}?`)) {
      deleteMutation.mutate(invoice.id);
    }
  };

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

    const contactIdValue = formData.get("contactId") as string;
    const data = {
      accountId: parseInt(formData.get("accountId") as string),
      contactId: contactIdValue ? parseInt(contactIdValue) : undefined,
      number: formData.get("invoiceNumber") as string,
      poNumber: formData.get("poNumber") as string || undefined,
      issueDate: formData.get("invoiceDate") as string,
      dueDate: formData.get("dueDate") as string,
      subtotal: Math.round(subtotal * 100),
      taxTotal: Math.round(taxTotal * 100),
      total: Math.round(total * 100),
      amountDue: Math.round(total * 100),
      status: editingInvoice ? editingInvoice.status : "draft" as const,
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

    if (editingInvoice) {
      updateMutation.mutate({ id: editingInvoice.id, data });
    } else {
      createMutation.mutate(data);
    }
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
        <Button onClick={() => {
          setEditingInvoice(null);
          setSelectedAccountId(null);
          setLineItems([{ description: "", quantity: 1, unitPrice: 0, lineSubtotal: 0, lineTax: 0, lineTotal: 0 }]);
          setDialogOpen(true);
        }} data-testid="create-invoice">
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
                          {invoice.emailOpenedAt && (
                            <span className="flex items-center gap-1 text-green-600">
                              <MailOpen className="h-3 w-3" />
                              Opened {invoice.emailOpenCount}x
                            </span>
                          )}
                          {invoice.sentAt && !invoice.emailOpenedAt && (
                            <span className="flex items-center gap-1 text-blue-600">
                              <Mail className="h-3 w-3" />
                              Sent {format(new Date(invoice.sentAt), "MMM d")}
                            </span>
                          )}
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
                      <div className="flex items-center gap-2">
                        {invoice.status === 'draft' && (
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleSendInvoice(invoice)}
                            disabled={!customer?.billingEmail}
                            data-testid={`send-invoice-${invoice.id}`}
                            title={customer?.billingEmail ? "Send via Email" : "No billing email configured"}
                          >
                            <Send className="h-4 w-4 mr-1" />
                            Send
                          </Button>
                        )}
                        {invoice.status === 'sent' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSendReminder(invoice)}
                            disabled={!customer?.billingEmail}
                            data-testid={`reminder-invoice-${invoice.id}`}
                            title={customer?.billingEmail ? "Send Payment Reminder" : "No billing email configured"}
                          >
                            <Bell className="h-4 w-4 mr-1" />
                            Remind {invoice.reminderCount ? `(${invoice.reminderCount})` : ''}
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handlePrintInvoice(invoice)}
                          data-testid={`print-invoice-${invoice.id}`}
                          title="Print Invoice"
                        >
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownloadPDF(invoice)}
                          data-testid={`download-invoice-${invoice.id}`}
                          title="Download PDF"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        {invoice.status === 'draft' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditInvoice(invoice)}
                              data-testid={`edit-invoice-${invoice.id}`}
                              title="Edit Invoice"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteInvoice(invoice)}
                              data-testid={`delete-invoice-${invoice.id}`}
                              title="Delete Invoice"
                              className="hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedInvoice(invoice);
                            setViewDialogOpen(true);
                          }}
                          data-testid={`view-invoice-${invoice.id}`}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
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

      <Dialog open={dialogOpen} onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) {
          setEditingInvoice(null);
          setSelectedAccountId(null);
          setLineItems([{ description: "", quantity: 1, unitPrice: 0, lineSubtotal: 0, lineTax: 0, lineTotal: 0 }]);
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}</DialogTitle>
            <DialogDescription>
              {editingInvoice ? 'Update invoice details and line items' : 'Create an invoice with line items and send it to your customer'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="accountId">Customer * </Label>
                <Select 
                  name="accountId" 
                  required
                  value={selectedAccountId?.toString() || ""}
                  onValueChange={(value) => setSelectedAccountId(parseInt(value))}
                >
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
                {selectedAccount && (
                  <div className="text-xs text-muted-foreground mt-1 space-y-1">
                    <div className="font-medium">{selectedAccount.companyName}</div>
                    {selectedAccount.billingAddress && <div>{selectedAccount.billingAddress}</div>}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactId">Contact (Optional)</Label>
                <Select name="contactId">
                  <SelectTrigger data-testid="invoice-contact">
                    <SelectValue placeholder="Select contact" />
                  </SelectTrigger>
                  <SelectContent>
                    {accountContacts.length > 0 ? (
                      accountContacts.map((contact: any) => (
                        <SelectItem key={contact.id} value={contact.id.toString()}>
                          {contact.firstName} {contact.lastName}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>No contacts available</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoiceNumber">Invoice Number *</Label>
                <Input
                  id="invoiceNumber"
                  name="invoiceNumber"
                  defaultValue={editingInvoice?.number || `INV-${Date.now()}`}
                  required
                  data-testid="invoice-number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="poNumber">PO Number / Reference</Label>
                <Input
                  id="poNumber"
                  name="poNumber"
                  placeholder="Purchase order number"
                  defaultValue={editingInvoice?.poNumber || ""}
                  data-testid="invoice-po-number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoiceDate">Invoice Date *</Label>
                <Input
                  id="invoiceDate"
                  name="invoiceDate"
                  type="date"
                  defaultValue={editingInvoice ? format(new Date(editingInvoice.issueDate), "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd")}
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
                  defaultValue={editingInvoice ? format(new Date(editingInvoice.dueDate), "yyyy-MM-dd") : format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd")}
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
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} data-testid="save-invoice">
                {editingInvoice 
                  ? (updateMutation.isPending ? "Updating..." : "Update Invoice")
                  : (createMutation.isPending ? "Creating..." : "Create Invoice")
                }
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Invoice Details & Activity</DialogTitle>
            <DialogDescription>
              View invoice information, tracking data, and customer engagement
            </DialogDescription>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-6">
              {/* Invoice Summary */}
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Invoice Number</Label>
                  <p className="font-medium">{selectedInvoice.number}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Customer</Label>
                  <p className="font-medium">{customers?.find(c => c.id === selectedInvoice.accountId)?.companyName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Invoice Date</Label>
                  <p>{format(new Date(selectedInvoice.issueDate), "MMM d, yyyy")}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Due Date</Label>
                  <p>{format(new Date(selectedInvoice.dueDate), "MMM d, yyyy")}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>${(selectedInvoice.subtotal / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax:</span>
                      <span>${(selectedInvoice.taxTotal / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total:</span>
                      <span className="text-2xl">${(selectedInvoice.total / 100).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Tracker */}
              <div className="border-t pt-4">
                <InvoiceActivityTracker invoice={selectedInvoice} />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Email Compose Dialog for sending invoices */}
      {selectedInvoice && (
        <EmailComposeDialog
          key={`send-${selectedInvoice.id}`}
          open={emailDialogOpen}
          onOpenChange={setEmailDialogOpen}
          onSend={handleSendInvoiceEmail}
          invoiceNumber={selectedInvoice.number}
          customerName={customers?.find(c => c.id === selectedInvoice.accountId)?.companyName || 'Customer'}
          isReminder={false}
          isPending={sendMutation.isPending}
        />
      )}

      {/* Email Compose Dialog for sending reminders */}
      {selectedInvoice && (
        <EmailComposeDialog
          key={`reminder-${selectedInvoice.id}`}
          open={reminderDialogOpen}
          onOpenChange={setReminderDialogOpen}
          onSend={handleSendReminderEmail}
          invoiceNumber={selectedInvoice.number}
          customerName={customers?.find(c => c.id === selectedInvoice.accountId)?.companyName || 'Customer'}
          isReminder={true}
          isPending={reminderMutation.isPending}
        />
      )}
    </div>
  );
}
