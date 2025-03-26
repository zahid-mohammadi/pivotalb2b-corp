import { Loader2 } from "lucide-react";
import { useRoute } from "wouter";
import { useEffect, useState } from "react";
import { BlogPost } from "@shared/schema";

export default function BlogDetailPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  // Create separate state for the content to manage rendering
  const [processedContent, setProcessedContent] = useState<string>("");
  const [isDirectLoading, setIsDirectLoading] = useState(true);
  const [directPost, setDirectPost] = useState<BlogPost | null>(null);
  const [directError, setDirectError] = useState<Error | null>(null);

  // Use direct fetch instead of useQuery
  useEffect(() => {
    if (!slug) return;
    
    setIsDirectLoading(true);
    fetch(`/api/blog-posts/${slug}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Direct fetch data:", data);
        setDirectPost(data);
        if (data.content) {
          console.log("Content length:", data.content.length);
          console.log("Content preview:", data.content.substring(0, 100));
          setProcessedContent(data.content);
        } else {
          console.log("No content in response");
        }
        setIsDirectLoading(false);
      })
      .catch(err => {
        console.error("Error fetching post:", err);
        setDirectError(err as Error);
        setIsDirectLoading(false);
      });
  }, [slug]);

  if (isDirectLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (directError) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">Error Loading Blog Post</h1>
        <p className="text-muted-foreground">
          {directError.message || "An error occurred while loading the blog post."}
        </p>
      </div>
    );
  }

  if (!directPost) {
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
      {directPost.bannerImage && (
        <img
          src={directPost.bannerImage}
          alt={directPost.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{directPost.title}</h1>
      {directPost.publishedAt && (
        <div className="text-sm text-muted-foreground mb-8">
          {new Date(directPost.publishedAt).toLocaleDateString()}
        </div>
      )}
      
      {/* Content display with debug information */}
      <div className="mb-4 text-foreground">
        <p>Content length: {processedContent.length} characters</p>
      </div>
      
      {/* Render content */}
      <div 
        className="prose prose-lg max-w-none text-foreground" 
        dangerouslySetInnerHTML={{ __html: processedContent }} 
      />
      
      {directPost.contentImages && directPost.contentImages.length > 0 && (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          {directPost.contentImages.map((image: string, index: number) => (
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