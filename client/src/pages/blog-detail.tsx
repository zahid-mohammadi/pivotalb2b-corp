import { Loader2, Calendar, Clock, TagIcon, Share2, ArrowLeft } from "lucide-react";
import { useRoute, Link } from "wouter";
import { useEffect, useState } from "react";
import { BlogPost } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";

export default function BlogDetailPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const [processedContent, setProcessedContent] = useState<string>("");
  const [isDirectLoading, setIsDirectLoading] = useState(true);
  const [directPost, setDirectPost] = useState<BlogPost | null>(null);
  const [directError, setDirectError] = useState<Error | null>(null);
  const [readingTime, setReadingTime] = useState<string>("5 min read");

  // Calculate reading time based on content length
  useEffect(() => {
    if (processedContent) {
      const wordCount = processedContent.replace(/<[^>]*>/g, '').split(/\s+/).length;
      const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
      setReadingTime(`${readingTimeMinutes} min read`);
    }
  }, [processedContent]);

  // Fetch blog post data
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
    <div className="min-h-screen bg-background pb-16">
      {/* Back navigation */}
      <div className="container mx-auto pt-8">
        <Link href="/blog">
          <Button variant="ghost" className="flex items-center gap-2 mb-6 text-primary hover:text-primary/80">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blog</span>
          </Button>
        </Link>
      </div>
      
      {/* Hero banner section */}
      <div className="w-full bg-gradient-to-r from-primary/10 to-primary/5 mb-12">
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-3xl mx-auto">
            {directPost.tags && directPost.tags.length > 0 && (
              <div className="flex gap-2 mb-4">
                {directPost.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-foreground">
              {directPost.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              {directPost.publishedAt && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{new Date(directPost.publishedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', month: 'long', day: 'numeric' 
                  })}</span>
                </div>
              )}
              
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{readingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content section */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Article content */}
          <div className="lg:w-3/4">
            {/* Feature image */}
            {directPost.bannerImage && (
              <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={directPost.bannerImage}
                  alt={directPost.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            
            {/* Article body */}
            <article className="prose prose-lg max-w-none lg:prose-xl text-foreground prose-headings:text-foreground prose-headings:font-bold prose-p:text-foreground/90 prose-strong:text-primary prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:border-l-primary/50 prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-md"
              dangerouslySetInnerHTML={{ __html: processedContent }} 
            />
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-20">
              <div className="bg-muted/30 p-6 rounded-xl border border-muted">
                <h3 className="text-lg font-semibold mb-4">Share this article</h3>
                <div className="flex gap-3">
                  <Button variant="outline" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <Separator className="my-6" />
                
                <h3 className="text-lg font-semibold mb-4">Author</h3>
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <img src="/Zahid Mohammadi.jpeg" alt="Author" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Zahid Mohammadi</h4>
                    <p className="text-sm text-muted-foreground">Marketing Specialist</p>
                  </div>
                </div>
                
                {directPost.tags && directPost.tags.length > 0 && (
                  <>
                    <Separator className="my-6" />
                    <div className="flex items-start gap-2">
                      <TagIcon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {directPost.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Related content or images section */}
        {directPost.contentImages && directPost.contentImages.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6">Related Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {directPost.contentImages.map((image: string, index: number) => (
                <div key={index} className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={image}
                    alt={`Content image ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}