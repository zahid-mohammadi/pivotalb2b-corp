import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  FileText, 
  CreditCard, 
  Receipt as ReceiptIcon,
  TrendingUp,
  Users,
  Package,
  Settings
} from "lucide-react";
import { CustomerManagement } from "./customer-management";
import { InvoiceManagement } from "./invoice-management";
import { PaymentTracking } from "./payment-tracking";
import { SkuManagement } from "./sku-management";
import { TaxCodeManagement } from "./tax-code-management";
import { ExpenseManagement } from "./expense-management";
import { FinancialReports } from "./financial-reports";
import type { Account, Invoice } from "@shared/schema";

interface BillingModuleProps {
  initialTab?: "overview" | "customers" | "invoices" | "payments" | "expenses" | "products" | "reports" | "settings";
}

export function BillingModule({ initialTab = "overview" }: BillingModuleProps = {}) {
  const [activeSubTab, setActiveSubTab] = useState<string>(initialTab);

  useEffect(() => {
    setActiveSubTab(initialTab);
  }, [initialTab]);

  // Fetch accounts (customers) for billing
  const { data: customers } = useQuery<Account[]>({
    queryKey: ["/api/accounts"],
  });

  // Fetch invoices
  const { data: invoices } = useQuery<Invoice[]>({
    queryKey: ["/api/billing/invoices"],
  });

  // Calculate metrics
  const totalRevenue = invoices?.reduce((sum, inv) => sum + (inv.amountPaid || 0), 0) || 0;
  const totalOutstanding = invoices?.reduce((sum, inv) => sum + (inv.amountDue || 0), 0) || 0;
  const activeInvoices = invoices?.filter(inv => inv.status !== 'paid' && inv.status !== 'void').length || 0;

  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${(totalRevenue / 100).toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Outstanding</p>
                <p className="text-2xl font-bold">${(totalOutstanding / 100).toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Invoices</p>
                <p className="text-2xl font-bold">{activeInvoices}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customers</p>
                <p className="text-2xl font-bold">{customers?.length || 0}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Billing Tabs */}
      <Tabs value={activeSubTab} onValueChange={setActiveSubTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="customers" className="text-xs sm:text-sm">
            <Users className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Customers</span>
          </TabsTrigger>
          <TabsTrigger value="invoices" className="text-xs sm:text-sm">
            <FileText className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Invoices</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="text-xs sm:text-sm">
            <CreditCard className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Payments</span>
          </TabsTrigger>
          <TabsTrigger value="expenses" className="text-xs sm:text-sm">
            <ReceiptIcon className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Expenses</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="text-xs sm:text-sm">
            <Package className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Products</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="text-xs sm:text-sm">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Reports</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-xs sm:text-sm">
            <Settings className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  <p>Welcome to the Billing & Accounting module.</p>
                  <p className="mt-2">Use the tabs above to:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Manage customers and their billing information</li>
                    <li>Create and track invoices and estimates</li>
                    <li>Record payments and monitor outstanding balances</li>
                    <li>Track business expenses</li>
                    <li>Manage your product and service catalog</li>
                    <li>View financial reports and insights</li>
                    <li>Configure billing settings and tax codes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="mt-6">
          <CustomerManagement />
        </TabsContent>

        <TabsContent value="invoices" className="mt-6">
          <InvoiceManagement />
        </TabsContent>

        <TabsContent value="payments" className="mt-6">
          <PaymentTracking />
        </TabsContent>

        <TabsContent value="expenses" className="mt-6">
          <ExpenseManagement />
        </TabsContent>

        <TabsContent value="products" className="mt-6">
          <SkuManagement />
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <FinancialReports />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <TaxCodeManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
