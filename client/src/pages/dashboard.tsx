import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, FileText, BookText, Users } from "lucide-react";
import { BlogEditor } from "@/components/blog/blog-editor";
import { EbookEditor } from "@/components/ebooks/ebook-editor";
import { CaseStudyEditor } from "@/components/case-studies/case-study-editor";
import type { BlogPost, Ebook, CaseStudy } from "@shared/schema";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [showEditor, setShowEditor] = useState<"blog" | "ebook" | "case-study" | null>(null);

  const { data: posts, isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const { data: ebooks, isLoading: ebooksLoading } = useQuery<Ebook[]>({
    queryKey: ["/api/ebooks"],
  });

  const { data: caseStudies, isLoading: caseStudiesLoading } = useQuery<CaseStudy[]>({
    queryKey: ["/api/case-studies"],
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
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
        </TabsList>

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
                        <UserCircle2 className="h-6 w-6 text-muted-foreground" />
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
                <Button onClick={() => setShowEditor("blog")}>Create New Post</Button>
              </div>
              {showEditor === "blog" ? (
                <div className="mb-8">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowEditor(null)}
                    className="mb-4"
                  >
                    Back to List
                  </Button>
                  <BlogEditor />
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
                          <h3 className="text-lg font-semibold">{post.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString()
                              : "Draft"}
                          </p>
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
                <Button onClick={() => setShowEditor("ebook")}>Create New eBook</Button>
              </div>
              {showEditor === "ebook" ? (
                <div className="mb-8">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowEditor(null)}
                    className="mb-4"
                  >
                    Back to List
                  </Button>
                  <EbookEditor />
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
                          <h3 className="text-lg font-semibold">{ebook.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {ebook.publishedAt
                              ? new Date(ebook.publishedAt).toLocaleDateString()
                              : "Draft"}
                          </p>
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
                <Button onClick={() => setShowEditor("case-study")}>Create New Case Study</Button>
              </div>
              {showEditor === "case-study" ? (
                <div className="mb-8">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowEditor(null)}
                    className="mb-4"
                  >
                    Back to List
                  </Button>
                  <CaseStudyEditor />
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
                          <h3 className="text-lg font-semibold">{study.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {study.publishedAt
                              ? new Date(study.publishedAt).toLocaleDateString()
                              : "Draft"}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}