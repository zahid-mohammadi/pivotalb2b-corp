import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Building2,
  Plus,
  Search,
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import type { Account } from "@shared/schema";

export default function AccountsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: accounts, isLoading } = useQuery<Account[]>({
    queryKey: ["/api/accounts"],
  });

  const filteredAccounts = accounts?.filter((account) => {
    const query = searchQuery.toLowerCase();
    return (
      account.companyName.toLowerCase().includes(query) ||
      account.industry?.toLowerCase().includes(query) ||
      account.domain?.toLowerCase().includes(query)
    );
  });

  const getEngagementLevel = (score: number) => {
    if (score >= 150) return { label: "Very Hot", color: "destructive" };
    if (score >= 80) return { label: "Hot", color: "orange" };
    if (score >= 30) return { label: "Warm", color: "yellow" };
    return { label: "Cold", color: "secondary" };
  };

  const getTierBadge = (tier: string | null) => {
    if (!tier) return null;
    const tierColors: Record<string, string> = {
      gold: "yellow",
      silver: "default",
      bronze: "orange",
    };
    return (
      <Badge variant={tierColors[tier.toLowerCase()] as any || "secondary"}>
        {tier}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2" data-testid="heading-accounts">
              <Building2 className="w-8 h-8 text-primary" />
              Accounts
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your B2B accounts and organizations
            </p>
          </div>
          <Link href="/accounts/new">
            <Button className="gap-2" data-testid="button-new-account">
              <Plus className="w-4 h-4" />
              New Account
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search accounts by name, industry, or domain..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-accounts"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
              <Building2 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-accounts">
                {accounts?.length || 0}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Hot Accounts</CardTitle>
              <TrendingUp className="w-4 h-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-hot-accounts">
                {accounts?.filter(a => a.engagementScore >= 80).length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Gold Tier</CardTitle>
              <Badge variant="yellow">Gold</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-gold-accounts">
                {accounts?.filter(a => a.accountTier?.toLowerCase() === 'gold').length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Industries</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-unique-industries">
                {new Set(accounts?.map(a => a.industry).filter(Boolean)).size || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Accounts Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : filteredAccounts && filteredAccounts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Owner</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccounts.map((account) => {
                    const engagement = getEngagementLevel(account.engagementScore);
                    return (
                      <TableRow key={account.id} data-testid={`row-account-${account.id}`}>
                        <TableCell className="font-medium">
                          <Link href={`/accounts/${account.id}`}>
                            <div className="flex items-center gap-2 cursor-pointer hover:text-primary">
                              <Building2 className="w-4 h-4" />
                              <div>
                                <div data-testid={`text-company-${account.id}`}>{account.companyName}</div>
                                {account.domain && (
                                  <div className="text-xs text-muted-foreground">
                                    {account.domain}
                                  </div>
                                )}
                              </div>
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell>{account.industry || "-"}</TableCell>
                        <TableCell>{account.companySize || "-"}</TableCell>
                        <TableCell>
                          {account.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-muted-foreground" />
                              {account.location}
                            </div>
                          )}
                          {!account.location && "-"}
                        </TableCell>
                        <TableCell>
                          <Badge variant={engagement.color as any} data-testid={`badge-engagement-${account.id}`}>
                            {engagement.label} ({account.engagementScore})
                          </Badge>
                        </TableCell>
                        <TableCell>{getTierBadge(account.accountTier)}</TableCell>
                        <TableCell>
                          {account.assignedTo ? `User #${account.assignedTo}` : "-"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Accounts Found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? "Try adjusting your search criteria"
                    : "Get started by creating your first account"}
                </p>
                {!searchQuery && (
                  <Link href="/accounts/new">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Account
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
