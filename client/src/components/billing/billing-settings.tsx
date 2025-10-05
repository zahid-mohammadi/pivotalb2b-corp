import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Save, Building2, CreditCard, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BillingSettings {
  id: number;
  companyName: string | null;
  legalName: string | null;
  address: string | null;
  taxRegistration: string | null;
  bankDetails: string | null;
  invoiceFooter: string | null;
  invoicePrefix: string;
  defaultCurrency: string;
  defaultTerms: string;
}

export function BillingSettings() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<BillingSettings>>({});

  const { data: settings, isLoading } = useQuery<BillingSettings[]>({
    queryKey: ["/api/billing-settings"],
  });

  const currentSettings = settings?.[0];

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<BillingSettings>) => {
      const response = await apiRequest("/api/billing-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/billing-settings"] });
      toast({
        title: "Settings Saved",
        description: "Your billing settings have been updated successfully.",
      });
      setFormData({});
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleChange = (field: keyof BillingSettings, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getValue = (field: keyof BillingSettings) => {
    return formData[field] ?? currentSettings?.[field] ?? "";
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Loading settings...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Billing Settings</h2>
          <p className="text-muted-foreground">Configure your company information and invoice defaults</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="company">
              <Building2 className="h-4 w-4 mr-2" />
              Company Info
            </TabsTrigger>
            <TabsTrigger value="banking">
              <CreditCard className="h-4 w-4 mr-2" />
              Banking
            </TabsTrigger>
            <TabsTrigger value="invoice">
              <FileText className="h-4 w-4 mr-2" />
              Invoice Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  This information will appear on your invoices and official documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      placeholder="Pivotal B2B"
                      value={getValue("companyName")}
                      onChange={(e) => handleChange("companyName", e.target.value)}
                      data-testid="input-company-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="legalName">Legal Name</Label>
                    <Input
                      id="legalName"
                      placeholder="Pivotal B2B LLC"
                      value={getValue("legalName")}
                      onChange={(e) => handleChange("legalName", e.target.value)}
                      data-testid="input-legal-name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Textarea
                    id="address"
                    placeholder="16192 Coastal Highway&#10;Lewes, Delaware 19958&#10;USA"
                    value={getValue("address")}
                    onChange={(e) => handleChange("address", e.target.value)}
                    rows={4}
                    data-testid="input-address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxRegistration">Tax Registration / VAT Number</Label>
                  <Input
                    id="taxRegistration"
                    placeholder="US-123456789"
                    value={getValue("taxRegistration")}
                    onChange={(e) => handleChange("taxRegistration", e.target.value)}
                    data-testid="input-tax-registration"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="banking" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bank Account Information</CardTitle>
                <CardDescription>
                  This information will be displayed on invoices for payment purposes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bankDetails">Bank Account Details</Label>
                  <Textarea
                    id="bankDetails"
                    placeholder="Bank Name: First National Bank&#10;Account Name: Pivotal B2B&#10;Account Number: 1234567890&#10;Routing Number: 987654321&#10;SWIFT/BIC: ABCDUS33XXX"
                    value={getValue("bankDetails")}
                    onChange={(e) => handleChange("bankDetails", e.target.value)}
                    rows={6}
                    data-testid="input-bank-details"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter your bank account details as they should appear on invoices. Each line will be displayed separately.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoice" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Settings</CardTitle>
                <CardDescription>
                  Customize your invoice format and payment terms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
                    <Input
                      id="invoicePrefix"
                      placeholder="INV"
                      value={getValue("invoicePrefix")}
                      onChange={(e) => handleChange("invoicePrefix", e.target.value)}
                      data-testid="input-invoice-prefix"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultCurrency">Default Currency</Label>
                    <Input
                      id="defaultCurrency"
                      placeholder="USD"
                      value={getValue("defaultCurrency")}
                      onChange={(e) => handleChange("defaultCurrency", e.target.value)}
                      data-testid="input-default-currency"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultTerms">Default Payment Terms</Label>
                    <Input
                      id="defaultTerms"
                      placeholder="Net 30"
                      value={getValue("defaultTerms")}
                      onChange={(e) => handleChange("defaultTerms", e.target.value)}
                      data-testid="input-default-terms"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="invoiceFooter">Invoice Footer Text</Label>
                  <Textarea
                    id="invoiceFooter"
                    placeholder="Thank you for your business! Payment is due within 30 days."
                    value={getValue("invoiceFooter")}
                    onChange={(e) => handleChange("invoiceFooter", e.target.value)}
                    rows={3}
                    data-testid="input-invoice-footer"
                  />
                  <p className="text-xs text-muted-foreground">
                    This text will appear at the bottom of all your invoices.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button 
            type="submit" 
            disabled={updateMutation.isPending || Object.keys(formData).length === 0}
            data-testid="button-save-settings"
          >
            <Save className="h-4 w-4 mr-2" />
            {updateMutation.isPending ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}
