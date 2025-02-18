import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertBlogPostSchema, type InsertBlogPost } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, UserCircle2, BookText, FileText, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { BlogPost } from "@shared/schema";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const { toast } = useToast();

  const { data: posts, isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const blogForm = useForm<InsertBlogPost>({
    resolver: zodResolver(insertBlogPostSchema),
    defaultValues: {
      title: "",
      content: "",
      metaDescription: "",
      metaKeywords: "",
      slug: "",
      publishedAt: null,
    },
  });

  const createPost = useMutation({
    mutationFn: (data: InsertBlogPost) =>
      apiRequest("POST", "/api/blog-posts", data).then((res) => res.json()),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
      blogForm.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
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
          <TabsTrigger value="posts" className="flex items-center gap-2">
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
        <TabsContent value="posts">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Blog Posts</h2>
                <Button onClick={() => setActiveTab("create-post")}>Create New Post</Button>
              </div>
              {postsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts?.map((post) => (
                    <Card key={post.id}>
                      <CardContent className="pt-6">
                        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {post.content}
                        </p>
                        <div className="text-sm text-muted-foreground">
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString()
                            : "Draft"}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
                <Button>Create New eBook</Button>
              </div>
              <div className="text-center py-8 text-muted-foreground">
                eBook management coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Case Studies Tab */}
        <TabsContent value="case-studies">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Case Studies</h2>
                <Button>Create New Case Study</Button>
              </div>
              <div className="text-center py-8 text-muted-foreground">
                Case study management coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="create-post">
          <Card>
            <CardContent className="pt-6">
              <Form {...blogForm}>
                <form onSubmit={blogForm.handleSubmit(createPost.mutate)} className="space-y-6">
                  <FormField
                    control={blogForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={blogForm.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea rows={10} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={blogForm.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <AlertCircle className="h-4 w-4" />
                      SEO Settings
                    </div>

                    <FormField
                      control={blogForm.control}
                      name="metaDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={blogForm.control}
                      name="metaKeywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Keywords</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="keyword1, keyword2, keyword3" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={createPost.isPending}
                    className="w-full"
                  >
                    {createPost.isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Create Post
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}