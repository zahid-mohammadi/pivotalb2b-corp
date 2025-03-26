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
      <div className="w-full bg-gradient-to-br from-primary/15 via-primary/5 to-background relative overflow-hidden mb-12">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/5 blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-primary/5 blur-xl"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-primary/5 blur-xl"></div>
        </div>
        
        <div className="container mx-auto py-16 px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            {directPost.tags && directPost.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {directPost.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium shadow-sm backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-tight text-foreground tracking-tight">
              {directPost.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              {directPost.publishedAt && (
                <div className="flex items-center gap-2 bg-background/60 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{new Date(directPost.publishedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', month: 'long', day: 'numeric' 
                  })}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2 bg-background/60 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{readingTime}</span>
              </div>
              
              <div className="flex items-center gap-2 bg-background/60 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm">
                <Avatar className="h-6 w-6">
                  <img src="/Zahid Mohammadi.jpeg" alt="Author" />
                </Avatar>
                <span className="text-sm font-medium">Zahid Mohammadi</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative bottom border */}
        <div className="h-2 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      </div>
      
      {/* Main content section */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Article content */}
          <div className="lg:w-3/4">
            {/* Banner image removed from detail page as requested */}
            
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
                  <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-500/10 hover:text-blue-500 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="h-4 w-4">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                    </svg>
                  </Button>
                  
                  <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-600/10 hover:text-blue-600 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="h-4 w-4">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>
                  </Button>
                  
                  <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-700/10 hover:text-blue-700 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="h-4 w-4">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                  </Button>
                  
                  <Button variant="outline" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-all">
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
          <div className="mt-24 mb-16">
            <div className="flex items-center mb-8">
              <div className="h-0.5 w-8 bg-primary/70 mr-4"></div>
              <h3 className="text-2xl font-bold">Related Images</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {directPost.contentImages.map((image: string, index: number) => (
                <div key={index} className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 group">
                  <div className="relative">
                    <img
                      src={image}
                      alt={`Content image ${index + 1}`}
                      className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Image {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}