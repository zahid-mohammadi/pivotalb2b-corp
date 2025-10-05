import { Card, CardContent } from "@/components/ui/card";
import { Receipt } from "lucide-react";

export function ExpenseManagement() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Expenses</h3>
          <p className="text-sm text-muted-foreground">Track business expenses</p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8 text-muted-foreground">
            <Receipt className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Expense tracking</p>
            <p className="text-sm mt-1">Record and categorize business expenses</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
