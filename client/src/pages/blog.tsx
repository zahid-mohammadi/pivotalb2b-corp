import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Link } from "wouter";
import { PageBanner } from "@/components/ui/page-banner";

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
    <div>
      <PageBanner
        title="Blog & Insights"
        description="Stay ahead of the curve with our latest insights, trends, and expert perspectives on B2B marketing strategies."
        pattern="dots"
      />

      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <Card className="group overflow-hidden hover-lift">
                {post.bannerImage && (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.bannerImage} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{post.metaDescription}</p>
                  <div className="text-sm text-muted-foreground">
                    {new Date(post.publishedAt ?? '').toLocaleDateString()}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
          {posts?.length === 0 && (
            <p className="text-muted-foreground col-span-3 text-center">
              No blog posts available yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}