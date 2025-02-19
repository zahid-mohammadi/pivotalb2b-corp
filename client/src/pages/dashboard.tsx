import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
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
  BarChart3 
} from "lucide-react";
import { BlogEditor } from "@/components/blog/blog-editor";
import { EbookEditor } from "@/components/ebooks/ebook-editor";
import { CaseStudyEditor } from "@/components/case-studies/case-study-editor";
import { OverviewMetrics } from "@/components/analytics/overview-metrics";
import { TrafficSources } from "@/components/analytics/traffic-sources";
import { UserBehavior } from "@/components/analytics/user-behavior";
import type { BlogPost, Ebook, CaseStudy, Lead } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { MetaTags } from "@/components/ui/meta-tags";

export default function Dashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("analytics");
  const [showEditor, setShowEditor] = useState<"blog" | "ebook" | "case-study" | null>(null);
  const [editingItem, setEditingItem] = useState<BlogPost | Ebook | CaseStudy | null>(null);

  // Queries
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

  // Delete mutations
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
      <MetaTags
        title="Admin Dashboard - Pivotal B2B"
        description="Administrative dashboard for managing content, leads, and marketing materials"
        noindex={true}
      />
      <div className="container mx-auto px-4 py-12">
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
                  <Button>Add New User</Button>
                </div>
                <div className="border rounded-lg">
                  <div className="p-4 border-b bg-muted">
                    <div className="grid grid-cols-4 gap-4 font-medium">
                      <div>Name</div>
                      <div>Email</div>
                      <div>Role</div>
                      <div>Actions</div>
                    </div>
                  </div>
                  <div className="divide-y">
                    {/* Sample user row - replace with actual user data */}
                    <div className="p-4">
                      <div className="grid grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                          <User className="h-6 w-6 text-muted-foreground" />
                          <span>John Doe</span>
                        </div>
                        <div>john@example.com</div>
                        <div>Admin</div>
                        <div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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