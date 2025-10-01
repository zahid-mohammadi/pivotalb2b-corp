import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  FileText, 
  BookText, 
  Users, 
  User, 
  Pencil, 
  Trash2,
  BarChart3,
  Eye,
  Calendar,
  Mail,
  Building,
  Download,
  MessageSquare
} from "lucide-react";
import { BlogEditor } from "@/components/blog/blog-editor";
import { EbookEditor } from "@/components/ebooks/ebook-editor";
import { CaseStudyEditor } from "@/components/case-studies/case-study-editor";
import { OverviewMetrics } from "@/components/analytics/overview-metrics";
import { TrafficSources } from "@/components/analytics/traffic-sources";
import { UserBehavior } from "@/components/analytics/user-behavior";
import type { BlogPost, Ebook, CaseStudy, Lead, ProposalRequest } from "@shared/schema";
import { MetaTags } from "@/components/ui/meta-tags";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function Dashboard() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("analytics");
  const [showEditor, setShowEditor] = useState<"blog" | "ebook" | "case-study" | null>(null);
  const [editingItem, setEditingItem] = useState<BlogPost | Ebook | CaseStudy | null>(null);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  // User management queries
  const { data: users } = useQuery<UserData[]>({
    queryKey: ["/api/users"],
  });

  const addUserMutation = useMutation({
    mutationFn: async (userData: Partial<UserData>) => {
      const res = await apiRequest("POST", "/api/users", userData);
      if (!res.ok) throw new Error("Failed to add user");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      setAddUserDialogOpen(false);
      toast({ title: "User added successfully" });
    }
  });

  const editUserMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<UserData> }) => {
      const res = await apiRequest("PATCH", `/api/users/${id}`, data);
      if (!res.ok) throw new Error("Failed to update user");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      setEditUserDialogOpen(false);
      toast({ title: "User updated successfully" });
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/users/${id}`);
      if (!res.ok) throw new Error("Failed to delete user");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({ title: "User deleted successfully" });
    }
  });
  
  const updateProposalStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await apiRequest("PATCH", `/api/proposal-requests/${id}/status`, { status });
      if (!res.ok) throw new Error("Failed to update proposal status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/proposal-requests"] });
      toast({
        title: "Success",
        description: "Proposal status updated successfully",
      });
    }
  });

  const deleteProposalMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/proposal-requests/${id}`);
      if (!res.ok) throw new Error("Failed to delete proposal request");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/proposal-requests"] });
      toast({
        title: "Success",
        description: "Proposal request deleted successfully",
      });
    },
  });

  // Content queries
  const { data: posts, isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const { data: ebooks, isLoading: ebooksLoading } = useQuery<Ebook[]>({
    queryKey: ["/api/ebooks"],
  });

  const { data: caseStudies, isLoading: caseStudiesLoading } = useQuery<CaseStudy[]>({
    queryKey: ["/api/case-studies"],
  });

  const { data: leads, isLoading: leadsLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
  });
  
  const { data: proposalRequests, isLoading: proposalRequestsLoading } = useQuery<ProposalRequest[]>({
    queryKey: ["/api/proposal-requests"],
  });

  // Content mutations
  const deleteBlogMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/blog-posts/${id}`);
      if (!res.ok) throw new Error("Failed to delete blog post");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    },
  });

  const deleteEbookMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/ebooks/${id}`);
      if (!res.ok) throw new Error("Failed to delete ebook");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ebooks"] });
      toast({
        title: "Success",
        description: "Ebook deleted successfully",
      });
    },
  });

  const deleteCaseStudyMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/case-studies/${id}`);
      if (!res.ok) throw new Error("Failed to delete case study");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/case-studies"] });
      toast({
        title: "Success",
        description: "Case study deleted successfully",
      });
    },
  });

  const handleEdit = (item: BlogPost | Ebook | CaseStudy, type: "blog" | "ebook" | "case-study") => {
    setEditingItem(item);
    setShowEditor(type);
  };

  const handleDelete = async (id: number, type: "blog" | "ebook" | "case-study") => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      switch (type) {
        case "blog":
          await deleteBlogMutation.mutateAsync(id);
          break;
        case "ebook":
          await deleteEbookMutation.mutateAsync(id);
          break;
        case "case-study":
          await deleteCaseStudyMutation.mutateAsync(id);
          break;
      }
    }
  };

  const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData);
    addUserMutation.mutate(userData);
  };

  const handleEditUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedUser) return;
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData);
    editUserMutation.mutate({ id: selectedUser.id, data: userData });
  };

  const handleDeleteUser = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(id);
    }
  };
  
  const handleProposalStatusChange = (id: number, status: string) => {
    updateProposalStatusMutation.mutate({ id, status });
  };
  
  const handleDeleteProposal = (id: number) => {
    if (window.confirm("Are you sure you want to delete this proposal request?")) {
      deleteProposalMutation.mutate(id);
    }
  };

  return (
    <>
      <MetaTags
        title="Admin Dashboard - Pivotal B2B"
        description="Administrative dashboard for managing content, leads, and marketing materials"
      />
      <div className="container mx-auto px-4 py-6 lg:py-12">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8">Admin Dashboard</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Mobile-friendly scrollable tabs */}
          <div className="w-full overflow-x-auto scrollbar-hide mb-8">
            <TabsList className="inline-flex h-10 w-max items-center justify-start rounded-md bg-muted p-1 text-muted-foreground min-w-full lg:w-fit">
              <TabsTrigger value="analytics" className="flex items-center gap-1 lg:gap-2 px-2 lg:px-3 text-xs lg:text-sm whitespace-nowrap">
                <BarChart3 className="h-3 w-3 lg:h-4 lg:w-4" />
                <span className="hidden sm:inline">Analytics</span>
                <span className="sm:hidden">Stats</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-1 lg:gap-2 px-2 lg:px-3 text-xs lg:text-sm whitespace-nowrap">
                <Users className="h-3 w-3 lg:h-4 lg:w-4" />
                <span className="hidden sm:inline">User Management</span>
                <span className="sm:hidden">Users</span>
              </TabsTrigger>
              <TabsTrigger value="blog" className="flex items-center gap-1 lg:gap-2 px-2 lg:px-3 text-xs lg:text-sm whitespace-nowrap">
                <FileText className="h-3 w-3 lg:h-4 lg:w-4" />
                <span className="hidden sm:inline">Blog Posts</span>
                <span className="sm:hidden">Blog</span>
              </TabsTrigger>
              <TabsTrigger value="leads" className="flex items-center gap-1 lg:gap-2 px-2 lg:px-3 text-xs lg:text-sm whitespace-nowrap">
                <Users className="h-3 w-3 lg:h-4 lg:w-4" />
                <span className="hidden sm:inline">Leads</span>
                <span className="sm:hidden">Leads</span>
              </TabsTrigger>
              <TabsTrigger value="proposals" className="flex items-center gap-1 lg:gap-2 px-2 lg:px-3 text-xs lg:text-sm whitespace-nowrap">
                <FileText className="h-3 w-3 lg:h-4 lg:w-4" />
                <span className="hidden sm:inline">Proposals</span>
                <span className="sm:hidden">Props</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="space-y-8">
              <OverviewMetrics />
              <div className="grid gap-4 md:grid-cols-2">
                <TrafficSources />
                <UserBehavior />
              </div>
            </div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">User Management</h2>
                  <Button onClick={() => setAddUserDialogOpen(true)}>Add New User</Button>
                </div>
                <div className="border rounded-lg">
                  <div className="p-4 border-b bg-muted">
                    <div className="grid grid-cols-4 gap-4 font-medium">
                      <div>Username</div>
                      <div>Email</div>
                      <div>Role</div>
                      <div>Actions</div>
                    </div>
                  </div>
                  <div className="divide-y">
                    {users?.map((user) => (
                      <div key={user.id} className="p-4">
                        <div className="grid grid-cols-4 gap-4">
                          <div className="flex items-center gap-2">
                            <User className="h-6 w-6 text-muted-foreground" />
                            <span>{user.username}</span>
                          </div>
                          <div>{user.email}</div>
                          <div>{user.role}</div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedUser(user);
                                setEditUserDialogOpen(true);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddUser}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" name="username" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" name="password" type="password" required />
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Select name="role" defaultValue="user">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter className="mt-4">
                    <Button type="submit">Add User</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={editUserDialogOpen} onOpenChange={setEditUserDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleEditUser}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-username">Username</Label>
                      <Input
                        id="edit-username"
                        name="username"
                        defaultValue={selectedUser?.username}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-email">Email</Label>
                      <Input
                        id="edit-email"
                        name="email"
                        type="email"
                        defaultValue={selectedUser?.email}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-role">Role</Label>
                      <Select name="role" defaultValue={selectedUser?.role}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter className="mt-4">
                    <Button type="submit">Save Changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Blog Posts Tab */}
          <TabsContent value="blog">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Blog Posts</h2>
                  <Button onClick={() => { setEditingItem(null); setShowEditor("blog"); }}>
                    Create New Post
                  </Button>
                </div>
                {showEditor === "blog" ? (
                  <div className="mb-8">
                    <Button
                      variant="outline"
                      onClick={() => { setShowEditor(null); setEditingItem(null); }}
                      className="mb-4"
                    >
                      Back to List
                    </Button>
                    <BlogEditor initialData={editingItem as BlogPost} />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {postsLoading ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin" />
                      </div>
                    ) : (
                      <div className="divide-y">
                        {posts?.map((post) => (
                          <div key={post.id} className="py-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-lg font-semibold">{post.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {post.publishedAt
                                    ? new Date(post.publishedAt).toLocaleDateString()
                                    : "Draft"}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleEdit(post, "blog")}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => handleDelete(post.id, "blog")}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* eBooks Tab */}
          <TabsContent value="ebooks">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">eBooks</h2>
                  <Button onClick={() => { setEditingItem(null); setShowEditor("ebook"); }}>
                    Create New eBook
                  </Button>
                </div>
                {showEditor === "ebook" ? (
                  <div className="mb-8">
                    <Button
                      variant="outline"
                      onClick={() => { setShowEditor(null); setEditingItem(null); }}
                      className="mb-4"
                    >
                      Back to List
                    </Button>
                    <EbookEditor initialData={editingItem as Ebook} />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {ebooksLoading ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin" />
                      </div>
                    ) : (
                      <div className="divide-y">
                        {ebooks?.map((ebook) => (
                          <div key={ebook.id} className="py-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-lg font-semibold">{ebook.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {ebook.publishedAt
                                    ? new Date(ebook.publishedAt).toLocaleDateString()
                                    : "Draft"}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleEdit(ebook, "ebook")}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => handleDelete(ebook.id, "ebook")}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Case Studies Tab */}
          <TabsContent value="case-studies">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Case Studies</h2>
                  <Button onClick={() => { setEditingItem(null); setShowEditor("case-study"); }}>
                    Create New Case Study
                  </Button>
                </div>
                {showEditor === "case-study" ? (
                  <div className="mb-8">
                    <Button
                      variant="outline"
                      onClick={() => { setShowEditor(null); setEditingItem(null); }}
                      className="mb-4"
                    >
                      Back to List
                    </Button>
                    <CaseStudyEditor initialData={editingItem as CaseStudy} />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {caseStudiesLoading ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin" />
                      </div>
                    ) : (
                      <div className="divide-y">
                        {caseStudies?.map((study) => (
                          <div key={study.id} className="py-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-lg font-semibold">{study.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {study.publishedAt
                                    ? new Date(study.publishedAt).toLocaleDateString()
                                    : "Draft"}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleEdit(study, "case-study")}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => handleDelete(study.id, "case-study")}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Download Leads</h2>
                </div>
                {leadsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Desktop Table View */}
                    <div className="hidden lg:block border rounded-lg">
                      <div className="p-4 border-b bg-muted">
                        <div className="grid grid-cols-7 gap-4 font-medium text-sm">
                          <div>Full Name</div>
                          <div>Email</div>
                          <div>Company</div>
                          <div>Content Type</div>
                          <div>Content Title</div>
                          <div>Downloaded At</div>
                          <div>Actions</div>
                        </div>
                      </div>
                      <div className="divide-y">
                        {leads?.map((lead) => {
                          let contentTitle = 'Unknown';
                          if (lead.contentType === 'media-kit') {
                            contentTitle = 'Media Kit';
                          } else {
                            const content = lead.contentType === 'ebook'
                              ? ebooks?.find(e => e.id === lead.contentId)
                              : caseStudies?.find(c => c.id === lead.contentId);
                            contentTitle = content?.title || 'Unknown';
                          }

                          return (
                            <div 
                              key={lead.id} 
                              className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                              onClick={() => navigate(`/lead/${lead.id}`)}
                              data-testid={`lead-row-${lead.id}`}
                            >
                              <div className="grid grid-cols-7 gap-4 items-center text-sm">
                                <div className="font-medium" data-testid={`lead-name-${lead.id}`}>{lead.fullName}</div>
                                <div className="truncate" data-testid={`lead-email-${lead.id}`}>{lead.email}</div>
                                <div data-testid={`lead-company-${lead.id}`}>{lead.company}</div>
                                <div className="capitalize" data-testid={`lead-type-${lead.id}`}>{lead.contentType}</div>
                                <div className="truncate" data-testid={`lead-content-${lead.id}`}>{contentTitle}</div>
                                <div data-testid={`lead-date-${lead.id}`}>{new Date(lead.downloadedAt).toLocaleDateString()}</div>
                                <div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate(`/lead/${lead.id}`);
                                    }}
                                    data-testid={`button-view-lead-${lead.id}`}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        {!leads?.length && (
                          <div className="p-8 text-center text-muted-foreground">
                            No leads found
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Mobile Card View */}
                    <div className="lg:hidden space-y-4">
                      {leads?.map((lead) => {
                        let contentTitle = 'Unknown';
                        if (lead.contentType === 'media-kit') {
                          contentTitle = 'Media Kit';
                        } else {
                          const content = lead.contentType === 'ebook'
                            ? ebooks?.find(e => e.id === lead.contentId)
                            : caseStudies?.find(c => c.id === lead.contentId);
                          contentTitle = content?.title || 'Unknown';
                        }

                        return (
                          <Card 
                            key={lead.id} 
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => navigate(`/lead/${lead.id}`)}
                            data-testid={`lead-card-${lead.id}`}
                          >
                            <CardContent className="p-4">
                              <div className="space-y-3">
                                {/* Header */}
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="font-medium text-lg" data-testid={`lead-name-mobile-${lead.id}`}>{lead.fullName}</h3>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                                      <Building className="w-3 h-3" />
                                      <span data-testid={`lead-company-mobile-${lead.id}`}>{lead.company}</span>
                                    </p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate(`/lead/${lead.id}`);
                                    }}
                                    data-testid={`button-view-lead-mobile-${lead.id}`}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-2">
                                  <p className="text-sm flex items-center gap-2">
                                    <Mail className="w-3 h-3 text-muted-foreground" />
                                    <span className="truncate" data-testid={`lead-email-mobile-${lead.id}`}>{lead.email}</span>
                                  </p>
                                  
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm flex items-center gap-2">
                                      <Download className="w-3 h-3 text-muted-foreground" />
                                      <span className="capitalize" data-testid={`lead-type-mobile-${lead.id}`}>{lead.contentType}</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      <span data-testid={`lead-date-mobile-${lead.id}`}>{new Date(lead.downloadedAt).toLocaleDateString()}</span>
                                    </p>
                                  </div>
                                </div>

                                {/* Content Info */}
                                <div className="bg-muted/50 rounded-lg p-3">
                                  <p className="text-sm font-medium" data-testid={`lead-content-mobile-${lead.id}`}>{contentTitle}</p>
                                  {lead.message && (
                                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                      <MessageSquare className="w-3 h-3" />
                                      Has message
                                    </p>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                      
                      {!leads?.length && (
                        <Card>
                          <CardContent className="p-8 text-center text-muted-foreground">
                            <Download className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No leads found</p>
                            <p className="text-sm mt-1">Leads will appear here when users download content</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Proposal Requests Tab */}
          <TabsContent value="proposals">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Proposal Requests</h2>
                </div>
                <div className="space-y-4">
                  {proposalRequestsLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    <div className="border rounded-lg">
                      <div className="p-4 border-b bg-muted">
                        <div className="grid grid-cols-6 gap-4 font-medium">
                          <div>Company</div>
                          <div>Contact</div>
                          <div>Services</div>
                          <div>Submitted</div>
                          <div>Status</div>
                          <div>Actions</div>
                        </div>
                      </div>
                      <div className="divide-y">
                        {proposalRequests?.map((proposal) => (
                          <div key={proposal.id} className="p-4">
                            <div className="grid grid-cols-6 gap-4">
                              <div>
                                <span className="font-medium">{proposal.companyName}</span>
                                <p className="text-sm text-muted-foreground">{proposal.companyIndustries}</p>
                              </div>
                              <div>
                                <span>{proposal.fullName}</span>
                                <p className="text-sm text-muted-foreground">{proposal.email}</p>
                              </div>
                              <div>
                                <p className="text-sm">{proposal.interestedServices?.join(", ")}</p>
                              </div>
                              <div>
                                <p className="text-sm">
                                  {proposal.createdAt ? new Date(proposal.createdAt).toLocaleDateString() : "-"}
                                </p>
                              </div>
                              <div>
                                <Select
                                  defaultValue={proposal.status || "new"}
                                  onValueChange={(value) => handleProposalStatusChange(proposal.id, value)}
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="new">New</SelectItem>
                                    <SelectItem value="contacted">Contacted</SelectItem>
                                    <SelectItem value="meeting">Meeting</SelectItem>
                                    <SelectItem value="proposal">Proposal</SelectItem>
                                    <SelectItem value="closed">Closed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="flex gap-2">
                                <Link href={`/proposal/${proposal.id}`}>
                                  <Button 
                                    variant="outline"
                                    size="sm"
                                  >
                                    View Details
                                  </Button>
                                </Link>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleDeleteProposal(proposal.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>

                            {/* Additional proposal details */}
                            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium">Primary Goals</h4>
                                  <p className="text-sm mt-1">{proposal.primaryGoals?.join(", ")}</p>
                                  {proposal.otherGoal && (
                                    <p className="text-sm mt-1">Other: {proposal.otherGoal}</p>
                                  )}
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Target Geography</h4>
                                  <p className="text-sm mt-1">{proposal.targetGeography?.join(", ")}</p>
                                  {proposal.otherGeography && (
                                    <p className="text-sm mt-1">Other: {proposal.otherGeography}</p>
                                  )}
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Timeline</h4>
                                  <p className="text-sm mt-1">{proposal.timeline}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Company Size</h4>
                                  <p className="text-sm mt-1">{proposal.companySize}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Target Job Function</h4>
                                  <p className="text-sm mt-1">{proposal.jobFunction?.join(", ")}</p>
                                  {proposal.otherJobFunction && (
                                    <p className="text-sm mt-1">Other: {proposal.otherJobFunction}</p>
                                  )}
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Target Job Level</h4>
                                  <p className="text-sm mt-1">{proposal.jobLevel?.join(", ")}</p>
                                  {proposal.otherJobLevel && (
                                    <p className="text-sm mt-1">Other: {proposal.otherJobLevel}</p>
                                  )}
                                </div>
                                {proposal.currentChallenges && (
                                  <div>
                                    <h4 className="text-sm font-medium">Current Challenges</h4>
                                    <p className="text-sm mt-1">{proposal.currentChallenges}</p>
                                  </div>
                                )}
                                {proposal.additionalNeeds && (
                                  <div>
                                    <h4 className="text-sm font-medium">Additional Needs</h4>
                                    <p className="text-sm mt-1">{proposal.additionalNeeds}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        {proposalRequests?.length === 0 && (
                          <div className="p-8 text-center text-muted-foreground">
                            No proposal requests yet.
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}