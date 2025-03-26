import React, { useState } from 'react';
import { BlogPost } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Check, Wand2, Link, Tag, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { optimizeBlogPost, extractKeywords, generateDescription } from '@/lib/seo-utils';
import { Progress } from '@/components/ui/progress';
import { apiRequest } from '@/lib/queryClient';

interface SEOAutomationProps {
  post: BlogPost;
  allPosts: BlogPost[];
  onComplete: (updatedPost: BlogPost) => void;
}

export function SEOAutomation({ post, allPosts, onComplete }: SEOAutomationProps) {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const { toast } = useToast();
  const [seoPreview, setSeoPreview] = useState<{
    metaDescription: string | null;
    autoTags: string[] | null;
    hasInternalLinks: boolean;
  }>({
    metaDescription: post.metaDescription,
    autoTags: post.autoTags,
    hasInternalLinks: false, // We'll calculate this later
  });

  // Check if content contains internal links
  const hasInternalLinks = post.content.includes('<a href="/blog/');

  // Calculate SEO score (0-100)
  const calculateSEOScore = () => {
    let score = 0;
    
    // Meta description adds 30 points
    if (post.metaDescription) score += 30;
    
    // Keywords/tags add 30 points
    if ((post.tags && post.tags.length > 0) || (post.autoTags && post.autoTags.length > 0)) {
      score += 30;
    }
    
    // Internal links add 30 points
    if (hasInternalLinks) score += 30;
    
    // Banner image adds 10 points
    if (post.bannerImage) score += 10;
    
    return score;
  };

  const seoScore = calculateSEOScore();

  const runSEOOptimization = async () => {
    setIsOptimizing(true);
    setProgress(10);
    setCurrentStep('Analyzing content...');

    try {
      // Step 1: Generate preview
      const metaDescription = post.metaDescription || generateDescription(post.content);
      const autoTags = post.autoTags || post.tags || extractKeywords(post.content);
      
      setSeoPreview({
        metaDescription,
        autoTags,
        hasInternalLinks: false
      });
      
      setProgress(30);
      setCurrentStep('Generating meta description and keywords...');
      
      // Short delay to show progress
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProgress(60);
      setCurrentStep('Finding related content for internal linking...');
      
      // Short delay to show progress
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Step 2: Run full optimization
      setProgress(80);
      setCurrentStep('Applying optimizations...');
      
      const optimizedPost = await optimizeBlogPost(post, allPosts);
      
      // Step 3: Complete
      setProgress(100);
      setCurrentStep('Optimization complete!');
      
      // Update preview with final results
      setSeoPreview({
        metaDescription: optimizedPost.metaDescription,
        autoTags: optimizedPost.autoTags,
        hasInternalLinks: optimizedPost.content.includes('<a href="/blog/')
      });
      
      // Notify parent component
      onComplete(optimizedPost);
      
      toast({
        title: "SEO Optimization Complete",
        description: "Your blog post has been optimized for search engines and social sharing.",
      });
      
      // Short delay before resetting state
      setTimeout(() => {
        setIsOptimizing(false);
        setProgress(0);
        setCurrentStep('');
      }, 2000);
      
    } catch (error) {
      console.error('SEO optimization failed:', error);
      toast({
        title: "Optimization Failed",
        description: "There was an error optimizing your blog post. Please try again.",
        variant: "destructive"
      });
      setIsOptimizing(false);
      setProgress(0);
      setCurrentStep('');
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>SEO & Social Sharing</span>
          <Badge variant={seoScore >= 80 ? "default" : seoScore >= 50 ? "outline" : "destructive"} 
                 className={seoScore >= 80 ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : 
                            seoScore >= 50 ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100" : ""}>
            {seoScore}/100
          </Badge>
        </CardTitle>
        <CardDescription>
          Optimize your blog post for search engines and social media sharing
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isOptimizing ? (
          <div className="space-y-4">
            <Progress value={progress} />
            <p className="text-sm text-muted-foreground flex items-center">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {currentStep}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className={`mt-0.5 ${post.metaDescription ? 'text-green-500' : 'text-amber-500'}`}>
                  {post.metaDescription ? <Check className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="text-sm font-medium">Meta Description</h3>
                  <p className="text-sm text-muted-foreground">
                    {post.metaDescription 
                      ? "Optimized for search engines" 
                      : "No meta description. We'll generate one automatically."}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className={`mt-0.5 ${(post.tags && post.tags.length > 0) || (post.autoTags && post.autoTags.length > 0) ? 'text-green-500' : 'text-amber-500'}`}>
                  {(post.tags && post.tags.length > 0) || (post.autoTags && post.autoTags.length > 0) 
                    ? <Check className="h-5 w-5" /> 
                    : <Tag className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="text-sm font-medium">Keywords & Tags</h3>
                  <p className="text-sm text-muted-foreground">
                    {(post.tags && post.tags.length > 0) || (post.autoTags && post.autoTags.length > 0)
                      ? `${((post.tags || []).length) + ((post.autoTags || []).length)} keywords set`
                      : "No keywords. We'll extract them from your content."}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className={`mt-0.5 ${hasInternalLinks ? 'text-green-500' : 'text-amber-500'}`}>
                  {hasInternalLinks 
                    ? <Check className="h-5 w-5" /> 
                    : <Link className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="text-sm font-medium">Internal Linking</h3>
                  <p className="text-sm text-muted-foreground">
                    {hasInternalLinks
                      ? "Content has internal links to related posts"
                      : "No internal links. We'll add them automatically."}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <div className={`mt-0.5 ${post.bannerImage ? 'text-green-500' : 'text-amber-500'}`}>
                  {post.bannerImage 
                    ? <Check className="h-5 w-5" /> 
                    : <FileText className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="text-sm font-medium">Social Share Image</h3>
                  <p className="text-sm text-muted-foreground">
                    {post.bannerImage
                      ? "Banner image will be used for social sharing"
                      : "No banner image. Add one for better social sharing."}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={runSEOOptimization}
          disabled={isOptimizing || seoScore === 100}
        >
          {isOptimizing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Optimizing...
            </>
          ) : seoScore === 100 ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Fully Optimized
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Auto-Optimize
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}