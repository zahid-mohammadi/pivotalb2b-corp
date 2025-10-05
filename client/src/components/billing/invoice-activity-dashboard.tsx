import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MailOpen, Eye, TrendingUp, Clock, AlertCircle, CheckCircle } from "lucide-react";
import type { Invoice } from "@shared/schema";

export function InvoiceActivityDashboard() {
  const { data: invoices } = useQuery<Invoice[]>({
    queryKey: ["/api/invoices"],
  });

  if (!invoices) {
    return null;
  }

  // Calculate engagement metrics
  const totalInvoices = invoices.length;
  const sentInvoices = invoices.filter(inv => inv.sentAt).length;
  const openedInvoices = invoices.filter(inv => inv.emailOpenedAt).length;
  const totalEmailOpens = invoices.reduce((sum, inv) => sum + (inv.emailOpenCount || 0), 0);
  const avgOpenRate = sentInvoices > 0 ? (openedInvoices / sentInvoices) * 100 : 0;
  const avgOpensPerInvoice = sentInvoices > 0 ? totalEmailOpens / sentInvoices : 0;
  
  // Status breakdown
  const draftCount = invoices.filter(inv => inv.status === 'draft').length;
  const sentCount = invoices.filter(inv => inv.status === 'sent').length;
  const paidCount = invoices.filter(inv => inv.status === 'paid').length;
  const overdueCount = invoices.filter(inv => inv.status === 'overdue').length;

  // Engagement levels
  const highEngagement = invoices.filter(inv => (inv.emailOpenCount || 0) >= 3).length;
  const mediumEngagement = invoices.filter(inv => (inv.emailOpenCount || 0) >= 1 && (inv.emailOpenCount || 0) < 3).length;
  const lowEngagement = sentInvoices - highEngagement - mediumEngagement;

  // Recent activity (last 7 days)
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentlyOpened = invoices.filter(inv => 
    inv.emailOpenedAt && new Date(inv.emailOpenedAt) > sevenDaysAgo
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Activity Overview</h3>
        <p className="text-sm text-muted-foreground">Track engagement across all invoices</p>
      </div>

      {/* Main Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open Rate</p>
                <p className="text-3xl font-bold">{avgOpenRate.toFixed(0)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500 opacity-75" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {openedInvoices} of {sentInvoices} sent invoices opened
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Opens</p>
                <p className="text-3xl font-bold">{totalEmailOpens}</p>
              </div>
              <MailOpen className="h-8 w-8 text-blue-500 opacity-75" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Avg {avgOpensPerInvoice.toFixed(1)} per invoice
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recent Activity</p>
                <p className="text-3xl font-bold">{recentlyOpened}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500 opacity-75" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Opened in last 7 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Invoices</p>
                <p className="text-3xl font-bold">{totalInvoices}</p>
              </div>
              <Eye className="h-8 w-8 text-orange-500 opacity-75" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {sentInvoices} sent, {draftCount} draft
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Status Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-3 h-3 rounded-full bg-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Draft</p>
                <p className="text-2xl font-bold">{draftCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-3 h-3 rounded-full bg-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Sent</p>
                <p className="text-2xl font-bold">{sentCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-3 h-3 rounded-full bg-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Paid</p>
                <p className="text-2xl font-bold">{paidCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-3 h-3 rounded-full bg-red-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Overdue</p>
                <p className="text-2xl font-bold">{overdueCount}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Levels */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">High Engagement</span>
                  <Badge variant="secondary">{highEngagement}</Badge>
                </div>
                <span className="text-sm text-muted-foreground">3+ opens</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: sentInvoices > 0 ? `${(highEngagement / sentInvoices) * 100}%` : '0%' }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Medium Engagement</span>
                  <Badge variant="secondary">{mediumEngagement}</Badge>
                </div>
                <span className="text-sm text-muted-foreground">1-2 opens</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: sentInvoices > 0 ? `${(mediumEngagement / sentInvoices) * 100}%` : '0%' }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Low Engagement</span>
                  <Badge variant="secondary">{lowEngagement}</Badge>
                </div>
                <span className="text-sm text-muted-foreground">Not opened</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all"
                  style={{ width: sentInvoices > 0 ? `${(lowEngagement / sentInvoices) * 100}%` : '0%' }}
                />
              </div>
            </div>
          </div>

          {lowEngagement > 0 && (
            <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
              <p className="text-sm text-orange-800 dark:text-orange-200">
                <strong>{lowEngagement} invoice{lowEngagement !== 1 ? 's' : ''}</strong> sent but not opened. 
                Consider sending a reminder to improve engagement.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
