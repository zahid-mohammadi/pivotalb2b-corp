import { useQuery, useMutation } from "@tanstack/react-query";
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
  User,
  Plus,
  Search,
  Mail,
  Phone,
  Building2,
  Briefcase,
  TrendingUp,
  Filter,
  X,
} from "lucide-react";
import type { Contact, Account } from "@shared/schema";
import { FilterBuilder } from "@/components/FilterBuilder";
import { apiRequest } from "@/lib/queryClient";

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filteredResults, setFilteredResults] = useState<Contact[] | null>(null);

  const { data: contacts, isLoading } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
  });

  const { data: accounts } = useQuery<Account[]>({
    queryKey: ["/api/accounts"],
  });

  // Filter preview mutation
  const filterMutation = useMutation({
    mutationFn: async (definition: any) => {
      const response = await apiRequest("POST", "/api/filter/preview", {
        entity: "contacts",
        definition,
        limit: 1000,
      });
      return response as unknown as { results: Contact[]; totalCount: number };
    },
    onSuccess: (data) => {
      setFilteredResults(data.results);
    },
  });

  const getAccountName = (accountId: number | null) => {
    if (!accountId || !accounts) return null;
    const account = accounts.find(a => a.id === accountId);
    return account?.companyName;
  };

  // Use filtered results from filter builder if available, otherwise use all contacts
  const baseContacts = filteredResults || contacts || [];

  // Then apply search query on top of filtered results
  const filteredContacts = baseContacts.filter((contact) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    const accountName = getAccountName(contact.accountId)?.toLowerCase() || "";
    return (
      fullName.includes(query) ||
      contact.email.toLowerCase().includes(query) ||
      contact.jobTitle?.toLowerCase().includes(query) ||
      accountName.includes(query)
    );
  });

  const handleApplyFilter = (definition: any) => {
    filterMutation.mutate(definition);
  };

  const handleClearFilter = () => {
    setFilteredResults(null);
    setShowFilter(false);
  };

  const getEngagementLevel = (score: number): { label: string; color: "default" | "destructive" | "outline" | "secondary" } => {
    if (score >= 150) return { label: "Very Hot", color: "destructive" };
    if (score >= 80) return { label: "Hot", color: "destructive" };
    if (score >= 30) return { label: "Warm", color: "outline" };
    return { label: "Cold", color: "secondary" };
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      active: "default",
      inactive: "secondary",
      unsubscribed: "destructive",
    };
    return (
      <Badge variant={statusColors[status.toLowerCase()] || "secondary"}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2" data-testid="heading-contacts">
              <User className="w-8 h-8 text-primary" />
              Contacts
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your B2B contacts and decision makers
            </p>
          </div>
          <Link href="/contacts/new">
            <Button className="gap-2" data-testid="button-new-contact">
              <Plus className="w-4 h-4" />
              New Contact
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
                  placeholder="Search contacts by name, email, title, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-contacts"
                />
              </div>
              <Button
                variant={showFilter ? "default" : "outline"}
                onClick={() => setShowFilter(!showFilter)}
                data-testid="button-toggle-filter"
              >
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filter
              </Button>
              {filteredResults && (
                <Button variant="ghost" onClick={handleClearFilter} data-testid="button-clear-filter">
                  <X className="w-4 h-4 mr-2" />
                  Clear Filter
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Advanced Filter Builder */}
        {showFilter && (
          <Card>
            <CardContent className="p-4">
              <FilterBuilder entity="contacts" onApply={handleApplyFilter} />
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
              <User className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-contacts">
                {contacts?.length || 0}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Hot Contacts</CardTitle>
              <TrendingUp className="w-4 h-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-hot-contacts">
                {contacts?.filter(c => c.engagementScore >= 80).length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <Badge variant="default">Active</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-active-contacts">
                {contacts?.filter(c => c.status === 'active').length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Linked to Accounts</CardTitle>
              <Building2 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-linked-contacts">
                {contacts?.filter(c => c.accountId).length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contacts Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : filteredContacts && filteredContacts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((contact) => {
                    const engagement = getEngagementLevel(contact.engagementScore);
                    const accountName = getAccountName(contact.accountId);
                    
                    return (
                      <TableRow key={contact.id} data-testid={`row-contact-${contact.id}`}>
                        <TableCell className="font-medium">
                          <Link href={`/contacts/${contact.id}`}>
                            <div className="flex items-center gap-2 cursor-pointer hover:text-primary">
                              <User className="w-4 h-4" />
                              <div data-testid={`text-name-${contact.id}`}>
                                {contact.firstName} {contact.lastName}
                              </div>
                            </div>
                          </Link>
                        </TableCell>
                        <TableCell>
                          {contact.jobTitle && (
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-3 h-3 text-muted-foreground" />
                              {contact.jobTitle}
                            </div>
                          )}
                          {!contact.jobTitle && "-"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-muted-foreground" />
                            <a 
                              href={`mailto:${contact.email}`}
                              className="hover:underline text-sm"
                              data-testid={`link-email-${contact.id}`}
                            >
                              {contact.email}
                            </a>
                          </div>
                        </TableCell>
                        <TableCell>
                          {contact.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-muted-foreground" />
                              <a 
                                href={`tel:${contact.phone}`}
                                className="hover:underline text-sm"
                              >
                                {contact.phone}
                              </a>
                            </div>
                          )}
                          {!contact.phone && "-"}
                        </TableCell>
                        <TableCell>
                          {accountName ? (
                            <Link href={`/accounts/${contact.accountId}`}>
                              <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
                                <Building2 className="w-3 h-3" />
                                {accountName}
                              </div>
                            </Link>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={engagement.color as any} data-testid={`badge-engagement-${contact.id}`}>
                            {engagement.label} ({contact.engagementScore})
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(contact.status)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-12">
                <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Contacts Found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? "Try adjusting your search criteria"
                    : "Get started by creating your first contact"}
                </p>
                {!searchQuery && (
                  <Link href="/contacts/new">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Contact
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
