import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export function FinancialReports() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Financial Reports</h3>
          <p className="text-sm text-muted-foreground">View financial insights and analytics</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reports Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Financial reporting</p>
            <p className="text-sm mt-1">View revenue, expenses, and profit analytics</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
