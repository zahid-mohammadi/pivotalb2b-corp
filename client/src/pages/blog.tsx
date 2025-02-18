import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function BlogPage() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.map((post) => (
          <Card key={post.id} className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
            <p className="text-muted-foreground mb-4">{post.metaDescription}</p>
            <div className="text-sm text-muted-foreground">
              {new Date(post.publishedAt ?? '').toLocaleDateString()}
            </div>
          </Card>
        ))}
        {posts?.length === 0 && (
          <p className="text-muted-foreground col-span-3 text-center">
            No blog posts available yet.
          </p>
        )}
      </div>
    </div>
  );
}
