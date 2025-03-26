import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { useRoute } from "wouter";

export default function BlogDetailPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog-posts", slug],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">Error Loading Blog Post</h1>
        <p className="text-muted-foreground">
          {error instanceof Error ? error.message : "An error occurred while loading the blog post."}
        </p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">Blog Post Not Found</h1>
        <p className="text-muted-foreground">
          The blog post you're looking for could not be found.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      {post.bannerImage && (
        <img
          src={post.bannerImage}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      {post.publishedAt && (
        <div className="text-sm text-muted-foreground mb-8">
          {new Date(post.publishedAt).toLocaleDateString()}
        </div>
      )}
      <div 
        className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
      {post.contentImages && post.contentImages.length > 0 && (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          {post.contentImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Content image ${index + 1}`}
              className="rounded-lg"
            />
          ))}
        </div>
      )}
    </div>
  );
}