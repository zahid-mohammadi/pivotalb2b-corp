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
import { Plus, CreditCard, Calendar, DollarSign } from "lucide-react";
import { format } from "date-fns";
import type { Payment, Invoice, Account } from "@shared/schema";

export function PaymentTracking() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: payments, isLoading } = useQuery<Payment[]>({
    queryKey: ["/api/payments"],
  });

  const { data: invoices } = useQuery<Invoice[]>({
    queryKey: ["/api/invoices"],
  });

  const { data: customers } = useQuery<Account[]>({
    queryKey: ["/api/accounts"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/payments", data);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to record payment");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/payments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/invoices"] });
      setDialogOpen(false);
      toast({ title: "Payment recorded successfully" });
    },
    onError: (error: Error) => {
      toast({ title: error.message, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const amount = Math.round(parseFloat(formData.get("amount") as string) * 100);
    const data = {
      invoiceId: parseInt(formData.get("invoiceId") as string),
      amount,
      netAmount: amount,
      method: formData.get("paymentMethod") as string,
      receivedAt: formData.get("paymentDate") as string,
      reference: formData.get("referenceNumber") as string || undefined,
      notes: formData.get("notes") as string || undefined,
    };

    createMutation.mutate(data);
  };

  const getMethodColor = (method: string) => {
    switch (method.toLowerCase()) {
      case "bank_transfer": return "bg-blue-500";
      case "credit_card": return "bg-purple-500";
      case "check": return "bg-green-500";
      case "cash": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Payments</h3>
          <p className="text-sm text-muted-foreground">Track and record customer payments</p>
        </div>
        <Button onClick={() => setDialogOpen(true)} data-testid="record-payment">
          <Plus className="h-4 w-4 mr-2" />
          Record Payment
        </Button>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Loading payments...</p>
          </CardContent>
        </Card>
      ) : payments && payments.length > 0 ? (
        <div className="space-y-3">
          {payments.map((payment) => {
            const invoice = invoices?.find(inv => inv.id === payment.invoiceId);
            const customer = customers?.find(c => c.id === invoice?.accountId);
            
            return (
              <Card key={payment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CreditCard className="h-8 w-8 text-green-500" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{customer?.companyName}</h4>
                          <Badge className={getMethodColor(payment.method)}>
                            {payment.method.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Invoice: {invoice?.number}
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(new Date(payment.receivedAt), "MMM d, yyyy")}
                          </span>
                          {payment.reference && (
                            <span>Ref: {payment.reference}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        ${(payment.amount / 100).toFixed(2)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {payment.currency || "USD"}
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
              <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No payments recorded yet</p>
              <p className="text-sm mt-1">Record your first payment to get started</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>
              Record a payment received against an invoice
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="invoiceId">Invoice *</Label>
                <Select name="invoiceId" required>
                  <SelectTrigger data-testid="payment-invoice">
                    <SelectValue placeholder="Select invoice" />
                  </SelectTrigger>
                  <SelectContent>
                    {invoices?.filter(inv => inv.status !== 'paid' && inv.status !== 'void').map(invoice => {
                      const customer = customers?.find(c => c.id === invoice.accountId);
                      return (
                        <SelectItem key={invoice.id} value={invoice.id.toString()}>
                          {invoice.number} - {customer?.companyName} (${(invoice.amountDue / 100).toFixed(2)})
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  data-testid="payment-amount"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method *</Label>
                <Select name="paymentMethod" required>
                  <SelectTrigger data-testid="payment-method">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="debit_card">Debit Card</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentDate">Payment Date *</Label>
                <Input
                  id="paymentDate"
                  name="paymentDate"
                  type="date"
                  defaultValue={format(new Date(), "yyyy-MM-dd")}
                  required
                  data-testid="payment-date"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="referenceNumber">Reference Number</Label>
                <Input
                  id="referenceNumber"
                  name="referenceNumber"
                  placeholder="Transaction ID, check number, etc."
                  data-testid="payment-reference"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                name="notes"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Additional payment notes..."
                data-testid="payment-notes"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={createMutation.isPending} data-testid="save-payment">
                {createMutation.isPending ? "Recording..." : "Record Payment"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
