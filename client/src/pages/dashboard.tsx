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
import { Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { BlogPost } from "@shared/schema";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("posts");
  const { toast } = useToast();

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const form = useForm<InsertBlogPost>({
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
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: InsertBlogPost) {
    createPost.mutate(data);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Content Dashboard</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="posts">Blog Posts</TabsTrigger>
          <TabsTrigger value="create">Create Post</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts?.map((post) => (
                <Card key={post.id}>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
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
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                      control={form.control}
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
                      control={form.control}
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