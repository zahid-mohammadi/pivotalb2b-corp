import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertBlogPost, insertBlogPostSchema, BlogPost } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/image-upload";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { generateSlug } from "@/lib/utils";
import { SEOAutomation } from "./seo-automation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from 'react';

interface BlogEditorProps {
  initialData?: BlogPost;
}

export function BlogEditor({ initialData }: BlogEditorProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("content");
  const [updatedPost, setUpdatedPost] = useState<BlogPost | null>(initialData || null);
  
  // Fetch all blog posts for internal linking and SEO recommendations
  const { data: allPosts } = useQuery({
    queryKey: ["/api/blog-posts"],
    enabled: !!initialData, // Only fetch when editing an existing post
  });
  
  // Define default values properly
  const getDefaultValues = (): InsertBlogPost => {
    if (initialData) {
      return {
        title: initialData.title,
        content: initialData.content,
        metaDescription: initialData.metaDescription ?? "",
        bannerImage: initialData.bannerImage ?? "",
        contentImages: initialData.contentImages ?? [],
        slug: initialData.slug,
        tags: initialData.tags ?? [],
        autoTags: initialData.autoTags ?? [],
        publishedAt: initialData.publishedAt ? 
          new Date(initialData.publishedAt).toISOString() : undefined
      };
    }
    
    return {
      title: "",
      content: "",
      metaDescription: "",
      bannerImage: "",
      contentImages: [],
      slug: "",
      tags: [],
      autoTags: []
    };
  };
  
  const form = useForm<InsertBlogPost>({
    resolver: zodResolver(insertBlogPostSchema),
    defaultValues: getDefaultValues(),
  });

  const title = form.watch("title");
  const content = form.watch("content");
  const metaDescription = form.watch("metaDescription");
  const bannerImage = form.watch("bannerImage");
  const tags = form.watch("tags");
  const autoTags = form.watch("autoTags");
  
  // Create a temporary post object for the SEO component to use
  React.useEffect(() => {
    // Only create a temporary post object if we're editing an existing post
    if (initialData && initialData.id) {
      const tempPost: BlogPost = {
        ...initialData,
        title: title || initialData.title,
        content: content || initialData.content,
        metaDescription: metaDescription || initialData.metaDescription,
        bannerImage: bannerImage || initialData.bannerImage,
        tags: tags || initialData.tags,
        autoTags: autoTags || initialData.autoTags,
      };
      setUpdatedPost(tempPost);
    }
  }, [initialData, title, content, metaDescription, bannerImage, tags, autoTags]);

  React.useEffect(() => {
    if (title && !initialData) {
      const slug = generateSlug(title);
      form.setValue("slug", slug);
    }
  }, [title, form, initialData]);

  const mutation = useMutation({
    mutationFn: async (data: InsertBlogPost) => {
      const res = await apiRequest(
        initialData ? "PATCH" : "POST",
        initialData ? `/api/blog-posts/${initialData.id}` : "/api/blog-posts",
        data
      );
      if (!res.ok) {
        throw new Error(`Failed to ${initialData ? 'update' : 'create'} blog post`);
      }
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      setUpdatedPost(data);
      toast({
        title: "Success",
        description: `Blog post ${initialData ? 'updated' : 'created'} successfully`,
      });
      if (!initialData) {
        form.reset();
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Handle SEO optimization completion
  const handleSEOComplete = (optimizedPost: BlogPost) => {
    // Update the form with the optimized values
    form.setValue("metaDescription", optimizedPost.metaDescription || "");
    form.setValue("content", optimizedPost.content);
    form.setValue("autoTags", optimizedPost.autoTags || []);
    // Update our local state
    setUpdatedPost(optimizedPost);
    
    toast({
      title: "SEO Optimization Complete",
      description: "Your blog post has been optimized with meta tags, keywords, and internal links.",
    });
  };

  return (
    <div className="space-y-6">
      {initialData && (
        <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Content Editor</TabsTrigger>
            <TabsTrigger value="seo" disabled={!initialData}>SEO & Social Optimization</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bannerImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Banner Image</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <ImageUpload
                            onImageUpload={(url) => field.onChange(url)}
                          />
                          {field.value && (
                            <img
                              src={field.value}
                              alt="Banner preview"
                              className="max-w-md rounded-md"
                            />
                          )}
                        </div>
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
                        <RichTextEditor
                          value={field.value || ""}
                          onChange={(content) => field.onChange(content)}
                          error={form.formState.errors.content?.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contentImages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content Images</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <ImageUpload
                            onImageUpload={(url) => field.onChange([...(field.value || []), url])}
                          />
                          <div className="grid grid-cols-3 gap-4">
                            {field.value?.map((url, index) => (
                              <img
                                key={index}
                                src={url}
                                alt={`Content image ${index + 1}`}
                                className="rounded-md"
                              />
                            ))}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="metaDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Description</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
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
                        <FormLabel>URL Slug</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (comma-separated)</FormLabel>
                        <FormControl>
                          <Input 
                            value={field.value?.join(", ") || ""} 
                            onChange={(e) => {
                              const tagsArray = e.target.value
                                .split(",")
                                .map(tag => tag.trim())
                                .filter(tag => tag.length > 0);
                              field.onChange(tagsArray);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full"
                >
                  {initialData ? 'Update' : 'Create'} Blog Post
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="seo" className="mt-6">
            {updatedPost && allPosts ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">SEO & Social Media Optimization</h3>
                    <p className="text-muted-foreground mb-6">
                      Automatically optimize your blog post for search engines and social media sharing with one click.
                      This will generate meta descriptions, extract keywords, and add internal links to related content.
                    </p>
                    
                    {updatedPost && (
                      <SEOAutomation 
                        post={updatedPost} 
                        allPosts={allPosts || []} 
                        onComplete={handleSEOComplete} 
                      />
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Social Media Preview</h3>
                    <p className="text-muted-foreground mb-6">
                      This is how your post will appear when shared on social media platforms.
                    </p>
                    
                    {updatedPost && (
                      <div className="social-preview-container">
                        {/* Import and use the component directly in this file */}
                        {React.createElement(
                          require("@/components/ui/social-share-preview").SocialSharePreview,
                          {
                            title: updatedPost.title,
                            description: updatedPost.metaDescription || 
                              (updatedPost.content.replace(/<[^>]*>/g, '').substring(0, 160) + "..."),
                            imageUrl: updatedPost.bannerImage || undefined,
                            url: `${window.location.origin}/blog/${updatedPost.slug}`
                          }
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end mt-8">
                  <Button
                    onClick={() => setActiveTab("content")}
                    className="mr-2"
                    variant="outline"
                  >
                    Back to Editor
                  </Button>
                  
                  <Button
                    onClick={() => form.handleSubmit((data) => mutation.mutate(data))()}
                    disabled={mutation.isPending}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p>Please save your blog post first before optimizing for SEO.</p>
                <Button
                  onClick={() => setActiveTab("content")}
                  className="mt-4"
                  variant="outline"
                >
                  Back to Editor
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
      
      {!initialData && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bannerImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banner Image</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <ImageUpload
                        onImageUpload={(url) => field.onChange(url)}
                      />
                      {field.value && (
                        <img
                          src={field.value}
                          alt="Banner preview"
                          className="max-w-md rounded-md"
                        />
                      )}
                    </div>
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
                    <RichTextEditor
                      value={field.value || ""}
                      onChange={(content) => field.onChange(content)}
                      error={form.formState.errors.content?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contentImages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Images</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <ImageUpload
                        onImageUpload={(url) => field.onChange([...(field.value || []), url])}
                      />
                      <div className="grid grid-cols-3 gap-4">
                        {field.value?.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Content image ${index + 1}`}
                            className="rounded-md"
                          />
                        ))}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
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
                    <FormLabel>URL Slug</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (comma-separated)</FormLabel>
                    <FormControl>
                      <Input 
                        value={field.value?.join(", ") || ""} 
                        onChange={(e) => {
                          const tagsArray = e.target.value
                            .split(",")
                            .map(tag => tag.trim())
                            .filter(tag => tag.length > 0);
                          field.onChange(tagsArray);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full"
            >
              {initialData ? 'Update' : 'Create'} Blog Post
            </Button>
            
            <p className="text-sm text-muted-foreground text-center mt-2">
              After creating your post, you'll be able to use our SEO automation tools to optimize it.
            </p>
          </form>
        </Form>
      )}
    </div>
  );
}