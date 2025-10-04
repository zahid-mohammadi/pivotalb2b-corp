import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
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
  MessageSquare,
  Workflow,
  Receipt
} from "lucide-react";
import { BlogEditor } from "@/components/blog/blog-editor";
import { EbookEditor } from "@/components/ebooks/ebook-editor";
import { CaseStudyEditor } from "@/components/case-studies/case-study-editor";
import { OverviewMetrics } from "@/components/analytics/overview-metrics";
import { TrafficSources } from "@/components/analytics/traffic-sources";
import { UserBehavior } from "@/components/analytics/user-behavior";
import { PipelineView } from "@/components/pipeline/pipeline-view";
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

  // Blog posts query
  const { data: posts, isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  // Ebooks query
  const { data: ebooks, isLoading: ebooksLoading } = useQuery<Ebook[]>({
    queryKey: ["/api/ebooks"],
  });

  // Case studies query
  const { data: caseStudies, isLoading: caseStudiesLoading } = useQuery<CaseStudy[]>({
    queryKey: ["/api/case-studies"],
  });

  // Leads query
  const { data: leads, isLoading: leadsLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
  });

  // Proposal requests query
  const { data: proposalRequests, isLoading: proposalRequestsLoading } = useQuery<ProposalRequest[]>({
    queryKey: ["/api/proposal-requests"],
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ id, type }: { id: number; type: "blog" | "ebook" | "case-study" }) => {
      const endpoint = type === "blog" ? "/api/blog-posts" : type === "ebook" ? "/api/ebooks" : "/api/case-studies";
      const res = await apiRequest("DELETE", `${endpoint}/${id}`);
      if (!res.ok) throw new Error(`Failed to delete ${type}`);
    },
    onSuccess: (_, variables) => {
      const queryKey = variables.type === "blog" ? ["/api/blog-posts"] : variables.type === "ebook" ? ["/api/ebooks"] : ["/api/case-studies"];
      queryClient.invalidateQueries({ queryKey });
      toast({ title: "Deleted successfully" });
    },
  });

  const handleEdit = (item: BlogPost | Ebook | CaseStudy, type: "blog" | "ebook" | "case-study") => {
    setEditingItem(item);
    setShowEditor(type);
  };

  const handleDelete = (id: number, type: "blog" | "ebook" | "case-study") => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteMutation.mutate({ id, type });
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
      <div className="fixed inset-0 flex bg-gradient-to-br from-slate-50 via-white to-blue-50/30 z-[100]">
        {/* Left Sidebar Navigation */}
        <div className="w-64 bg-white border-r border-slate-200 shadow-sm flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-200">
            <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Pivotal B2B
            </h1>
            <p className="text-xs text-slate-600 mt-1">Admin Dashboard</p>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-1">
            <button
              onClick={() => setActiveTab("analytics")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === "analytics"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === "users"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Users className="h-5 w-5" />
              <span>User Management</span>
            </button>

            <button
              onClick={() => setActiveTab("blog")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === "blog"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <FileText className="h-5 w-5" />
              <span>Blog Posts</span>
            </button>

            <button
              onClick={() => setActiveTab("leads")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === "leads"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <User className="h-5 w-5" />
              <span>Leads</span>
            </button>

            <button
              onClick={() => setActiveTab("ebooks")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === "ebooks"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <BookText className="h-5 w-5" />
              <span>eBooks</span>
            </button>

            <button
              onClick={() => setActiveTab("case-studies")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === "case-studies"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <FileText className="h-5 w-5" />
              <span>Case Studies</span>
            </button>

            <button
              onClick={() => setActiveTab("pipeline")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === "pipeline"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
              data-testid="pipeline-tab"
            >
              <Workflow className="h-5 w-5" />
              <span>Pipeline</span>
            </button>

            <Link href="/accounts">
              <button
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-all"
                data-testid="accounts-nav"
              >
                <Building className="h-5 w-5" />
                <span>Accounts</span>
              </button>
            </Link>

            <Link href="/contacts">
              <button
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-all"
                data-testid="contacts-nav"
              >
                <Users className="h-5 w-5" />
                <span>Contacts</span>
              </button>
            </Link>

            <button
              onClick={() => setActiveTab("proposals")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === "proposals"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Proposals</span>
            </button>

            <button
              onClick={() => setActiveTab("billing")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                activeTab === "billing"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
              data-testid="billing-tab"
            >
              <Receipt className="h-5 w-5" />
              <span>Billing & Accounting</span>
            </button>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 py-8 max-w-7xl">
            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div className="space-y-8">
                <OverviewMetrics />
                <div className="grid gap-4 md:grid-cols-2">
                  <TrafficSources />
                  <UserBehavior />
                </div>
              </div>
            )}

            {/* User Management Tab */}
            {activeTab === "users" && (
              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
                      <p className="text-sm text-slate-600 mt-1">Manage team members and their permissions</p>
                    </div>
                    <Button 
                      onClick={() => setAddUserDialogOpen(true)}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                    >
                      Add New User
                    </Button>
                  </div>
                  <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                    <div className="p-5 border-b border-slate-200 bg-slate-50/50">
                      <div className="grid grid-cols-4 gap-4 font-semibold text-sm text-slate-700">
                        <div>Username</div>
                        <div>Email</div>
                        <div>Role</div>
                        <div>Actions</div>
                      </div>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {users?.map((user) => (
                        <div key={user.id} className="p-5 hover:bg-slate-50/50 transition-colors">
                          <div className="grid grid-cols-4 gap-4 items-center">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                                {user.username.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-medium text-slate-900">{user.username}</span>
                            </div>
                            <div className="text-slate-600">{user.email}</div>
                            <div>
                              <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                {user.role}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setEditUserDialogOpen(true);
                                }}
                                className="rounded-lg"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteUser(user.id)}
                                className="rounded-lg"
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

                {/* Add User Dialog */}
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
                      <DialogFooter className="mt-6">
                        <Button type="submit" disabled={addUserMutation.isPending}>
                          {addUserMutation.isPending ? "Adding..." : "Add User"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                {/* Edit User Dialog */}
                <Dialog open={editUserDialogOpen} onOpenChange={setEditUserDialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit User</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleEditUser}>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="edit-username">Username</Label>
                          <Input id="edit-username" name="username" defaultValue={selectedUser?.username} required />
                        </div>
                        <div>
                          <Label htmlFor="edit-email">Email</Label>
                          <Input id="edit-email" name="email" type="email" defaultValue={selectedUser?.email} required />
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
                      <DialogFooter className="mt-6">
                        <Button type="submit" disabled={editUserMutation.isPending}>
                          {editUserMutation.isPending ? "Updating..." : "Update User"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </Card>
            )}

            {/* Blog Posts Tab */}
            {activeTab === "blog" && (
              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Blog Posts</h2>
                      <p className="text-sm text-slate-600 mt-1">Create and manage your blog content</p>
                    </div>
                    <Button 
                      onClick={() => { setEditingItem(null); setShowEditor("blog"); }}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                    >
                      Create New Post
                    </Button>
                  </div>
                  {showEditor === "blog" ? (
                    <div className="mb-8">
                      <Button
                        variant="outline"
                        onClick={() => { setShowEditor(null); setEditingItem(null); }}
                        className="mb-6 rounded-lg"
                      >
                        Back to List
                      </Button>
                      <BlogEditor initialData={editingItem as BlogPost} />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {postsLoading ? (
                        <div className="flex justify-center py-12">
                          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        </div>
                      ) : (
                        <div className="grid gap-4">
                          {posts?.map((post) => (
                            <div key={post.id} className="p-5 border border-slate-200 rounded-2xl hover:shadow-md transition-all bg-white">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{post.title}</h3>
                                  <p className="text-sm text-slate-500">
                                    {post.publishedAt
                                      ? new Date(post.publishedAt).toLocaleDateString()
                                      : <span className="inline-flex px-2 py-0.5 rounded-full text-xs bg-amber-50 text-amber-700 border border-amber-200">Draft</span>}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleEdit(post, "blog")}
                                    className="rounded-lg"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => handleDelete(post.id, "blog")}
                                    className="rounded-lg"
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
            )}

            {/* eBooks Tab */}
            {activeTab === "ebooks" && (
              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">eBooks Library</h2>
                      <p className="text-sm text-slate-600 mt-1">Manage your downloadable resources</p>
                    </div>
                    <Button 
                      onClick={() => { setEditingItem(null); setShowEditor("ebook"); }}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                    >
                      Create New eBook
                    </Button>
                  </div>
                  {showEditor === "ebook" ? (
                    <div className="mb-8">
                      <Button
                        variant="outline"
                        onClick={() => { setShowEditor(null); setEditingItem(null); }}
                        className="mb-6 rounded-lg"
                      >
                        Back to List
                      </Button>
                      <EbookEditor initialData={editingItem as Ebook} />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {ebooksLoading ? (
                        <div className="flex justify-center py-12">
                          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        </div>
                      ) : (
                        <div className="grid gap-4">
                          {ebooks?.map((ebook) => (
                            <div key={ebook.id} className="p-5 border border-slate-200 rounded-2xl hover:shadow-md transition-all bg-white">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{ebook.title}</h3>
                                  <p className="text-sm text-slate-500">
                                    {ebook.publishedAt
                                      ? new Date(ebook.publishedAt).toLocaleDateString()
                                      : <span className="inline-flex px-2 py-0.5 rounded-full text-xs bg-amber-50 text-amber-700 border border-amber-200">Draft</span>}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleEdit(ebook, "ebook")}
                                    className="rounded-lg"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => handleDelete(ebook.id, "ebook")}
                                    className="rounded-lg"
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
            )}

            {/* Case Studies Tab */}
            {activeTab === "case-studies" && (
              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Case Studies</h2>
                      <p className="text-sm text-slate-600 mt-1">Showcase your success stories</p>
                    </div>
                    <Button 
                      onClick={() => { setEditingItem(null); setShowEditor("case-study"); }}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
                    >
                      Create New Case Study
                    </Button>
                  </div>
                  {showEditor === "case-study" ? (
                    <div className="mb-8">
                      <Button
                        variant="outline"
                        onClick={() => { setShowEditor(null); setEditingItem(null); }}
                        className="mb-6 rounded-lg"
                      >
                        Back to List
                      </Button>
                      <CaseStudyEditor initialData={editingItem as CaseStudy} />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {caseStudiesLoading ? (
                        <div className="flex justify-center py-12">
                          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        </div>
                      ) : (
                        <div className="grid gap-4">
                          {caseStudies?.map((study) => (
                            <div key={study.id} className="p-5 border border-slate-200 rounded-2xl hover:shadow-md transition-all bg-white">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{study.title}</h3>
                                  <p className="text-sm text-slate-500">
                                    {study.publishedAt
                                      ? new Date(study.publishedAt).toLocaleDateString()
                                      : <span className="inline-flex px-2 py-0.5 rounded-full text-xs bg-amber-50 text-amber-700 border border-amber-200">Draft</span>}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleEdit(study, "case-study")}
                                    className="rounded-lg"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => handleDelete(study.id, "case-study")}
                                    className="rounded-lg"
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
            )}

            {/* Leads Tab */}
            {activeTab === "leads" && (
              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Download Leads</h2>
                      <p className="text-sm text-slate-600 mt-1">Track content downloads and lead generation</p>
                    </div>
                  </div>
                  {leadsLoading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Desktop Table View */}
                      <div className="hidden lg:block border border-slate-200 rounded-2xl overflow-hidden bg-white">
                        <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50/30">
                          <div className="grid grid-cols-7 gap-4 font-semibold text-sm text-slate-700">
                            <div>Full Name</div>
                            <div>Email</div>
                            <div>Company</div>
                            <div>Content Type</div>
                            <div>Content Title</div>
                            <div>Downloaded At</div>
                            <div>Actions</div>
                          </div>
                        </div>
                        <div className="divide-y divide-slate-200">
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
                                className="p-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                                onClick={() => navigate(`/lead/${lead.id}`)}
                                data-testid={`lead-row-${lead.id}`}
                              >
                                <div className="grid grid-cols-7 gap-4 items-center text-sm">
                                  <div className="font-semibold text-slate-900" data-testid={`lead-name-${lead.id}`}>{lead.fullName}</div>
                                  <div className="truncate text-slate-600" data-testid={`lead-email-${lead.id}`}>{lead.email}</div>
                                  <div className="text-slate-600" data-testid={`lead-company-${lead.id}`}>{lead.company}</div>
                                  <div className="capitalize" data-testid={`lead-type-${lead.id}`}>
                                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700 border border-blue-200">
                                      {lead.contentType}
                                    </span>
                                  </div>
                                  <div className="truncate text-slate-600" data-testid={`lead-content-${lead.id}`}>{contentTitle}</div>
                                  <div className="text-slate-500 text-xs" data-testid={`lead-date-${lead.id}`}>{new Date(lead.downloadedAt).toLocaleDateString()}</div>
                                  <div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/lead/${lead.id}`);
                                      }}
                                      className="rounded-lg"
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
                              className="cursor-pointer hover:shadow-lg transition-all border-slate-200 bg-white rounded-2xl"
                              onClick={() => navigate(`/lead/${lead.id}`)}
                              data-testid={`lead-card-${lead.id}`}
                            >
                              <CardContent className="p-5">
                                <div className="space-y-3">
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

                                  <div className="space-y-2">
                                    <p className="text-sm flex items-center gap-2">
                                      <Mail className="w-3 h-3 text-muted-foreground" />
                                      <span className="truncate" data-testid={`lead-email-mobile-${lead.id}`}>{lead.email}</span>
                                    </p>
                                    <p className="text-sm flex items-center gap-2">
                                      <FileText className="w-3 h-3 text-muted-foreground" />
                                      <span className="truncate" data-testid={`lead-content-mobile-${lead.id}`}>
                                        {contentTitle} <span className="text-muted-foreground">({lead.contentType})</span>
                                      </span>
                                    </p>
                                    <p className="text-sm flex items-center gap-2">
                                      <Calendar className="w-3 h-3 text-muted-foreground" />
                                      <span data-testid={`lead-date-mobile-${lead.id}`}>{new Date(lead.downloadedAt).toLocaleDateString()}</span>
                                    </p>
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
            )}

            {/* Pipeline Tab */}
            {activeTab === "pipeline" && <PipelineView />}

            {/* Proposal Requests Tab */}
            {activeTab === "proposals" && (
              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Proposal Requests</h2>
                      <p className="text-sm text-slate-600 mt-1">Manage incoming business proposals and requests</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {proposalRequestsLoading ? (
                      <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                      </div>
                    ) : (
                      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                        <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50/30">
                          <div className="grid grid-cols-6 gap-4 font-semibold text-sm text-slate-700">
                            <div>Company</div>
                            <div>Contact</div>
                            <div>Services</div>
                            <div>Submitted</div>
                            <div>Status</div>
                            <div>Actions</div>
                          </div>
                        </div>
                        <div className="divide-y divide-slate-200">
                          {proposalRequests?.map((proposal) => (
                            <div key={proposal.id} className="p-4 hover:bg-slate-50/50 transition-colors">
                              <div className="grid grid-cols-6 gap-4 items-start">
                                <div>
                                  <span className="font-semibold text-slate-900">{proposal.companyName}</span>
                                  <p className="text-xs text-slate-500 mt-0.5">{proposal.companyIndustries}</p>
                                </div>
                                <div>
                                  <span className="text-slate-900">{proposal.fullName}</span>
                                  <p className="text-xs text-slate-500 mt-0.5">{proposal.email}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-slate-600">{proposal.interestedServices?.join(", ")}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-slate-500">
                                    {proposal.createdAt ? new Date(proposal.createdAt).toLocaleDateString() : "-"}
                                  </p>
                                </div>
                                <div>
                                  <Select
                                    defaultValue={proposal.status || "new"}
                                    onValueChange={(value) => handleProposalStatusChange(proposal.id, value)}
                                  >
                                    <SelectTrigger className="w-32 rounded-lg">
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
                                      className="rounded-lg"
                                    >
                                      View Details
                                    </Button>
                                  </Link>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDeleteProposal(proposal.id)}
                                    className="rounded-lg"
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>

                              <div className="mt-4 p-4 bg-slate-50/50 rounded-xl border border-slate-200">
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
            )}

            {/* Billing & Accounting Tab */}
            {activeTab === "billing" && (
              <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Billing & Accounting</h2>
                      <p className="text-sm text-slate-600 mt-1">Manage invoices, payments, expenses, and financial reports</p>
                    </div>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">$0</div>
                        <p className="text-xs text-muted-foreground">Total Revenue</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">$0</div>
                        <p className="text-xs text-muted-foreground">Outstanding</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">Active Invoices</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold">$0</div>
                        <p className="text-xs text-muted-foreground">Total Expenses</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-center py-12 text-muted-foreground">
                    <Receipt className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg font-semibold mb-2">Billing Module Coming Soon</p>
                    <p className="text-sm">Full invoicing, payments, and expense tracking features will be available soon.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
