import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  FileText,
  BookText,
  Users,
  User,
  Pencil,
  Trash2,
  BarChart3
} from "lucide-react";
import { BlogEditor } from "@/components/blog/blog-editor";
import { EbookEditor } from "@/components/ebooks/ebook-editor";
import { CaseStudyEditor } from "@/components/case-studies/case-study-editor";
import { OverviewMetrics } from "@/components/analytics/overview-metrics";
import { TrafficSources } from "@/components/analytics/traffic-sources";
import { UserBehavior } from "@/components/analytics/user-behavior";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { MetaTags } from "@/components/ui/meta-tags";
import type { BlogPost, Ebook, CaseStudy, Lead } from "@shared/schema";

export default function Dashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("analytics");
  const [showEditor, setShowEditor] = useState<"blog" | "ebook" | "case-study" | null>(null);
  const [editingItem, setEditingItem] = useState<BlogPost | Ebook | CaseStudy | null>(null);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Queries
  const { data: posts, isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("/api/users").then(res => res.json())
  });

  const addUserMutation = useMutation({
    mutationFn: (userData) =>
      fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      setAddUserDialogOpen(false);
      toast({ title: "User added successfully" });
    }
  });

  const editUserMutation = useMutation({
    mutationFn: ({ id, data }) =>
      fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      setEditUserDialogOpen(false);
      toast({ title: "User updated successfully" });
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id) =>
      fetch(`/api/users/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast({ title: "User deleted successfully" });
    }
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    addUserMutation.mutate(Object.fromEntries(formData));
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    editUserMutation.mutate({
      id: selectedUser.id,
      data: Object.fromEntries(formData)
    });
  };

  const handleDeleteUser = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(id);
    }
  };

  const { data: ebooks, isLoading: ebooksLoading } = useQuery<Ebook[]>({
    queryKey: ["/api/ebooks"],
  });

  const { data: caseStudies, isLoading: caseStudiesLoading } = useQuery<CaseStudy[]>({
    queryKey: ["/api/case-studies"],
  });

  const { data: leads, isLoading: leadsLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
  });


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
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
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
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
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
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
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

  return (
    <>
      <MetaTags title="Dashboard" />
      <div className="container p-4 mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Blog Posts
            </TabsTrigger>
            <TabsTrigger value="ebooks" className="flex items-center gap-2">
              <BookText className="h-4 w-4" />
              eBooks
            </TabsTrigger>
            <TabsTrigger value="case-studies" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Case Studies
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Leads
            </TabsTrigger>
          </TabsList>

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
                  <div className="border rounded-lg">
                    <div className="p-4 border-b bg-muted">
                      <div className="grid grid-cols-6 gap-4 font-medium">
                        <div>Full Name</div>
                        <div>Email</div>
                        <div>Company</div>
                        <div>Content Type</div>
                        <div>Content Title</div>
                        <div>Downloaded At</div>
                      </div>
                    </div>
                    <div className="divide-y">
                      {leads?.map((lead) => {
                        const content = lead.contentType === 'ebook'
                          ? ebooks?.find(e => e.id === lead.contentId)
                          : caseStudies?.find(c => c.id === lead.contentId);

                        return (
                          <div key={lead.id} className="p-4">
                            <div className="grid grid-cols-6 gap-4">
                              <div>{lead.fullName}</div>
                              <div>{lead.email}</div>
                              <div>{lead.company}</div>
                              <div className="capitalize">{lead.contentType}</div>
                              <div>{content?.title || 'Unknown'}</div>
                              <div>{new Date(lead.downloadedAt).toLocaleDateString()}</div>
                            </div>
                          </div>
                        );
                      })}
                      {!leads?.length && (
                        <div className="p-4 text-center text-muted-foreground">
                          No leads found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}