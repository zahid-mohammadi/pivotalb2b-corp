import { useQuery } from "@tanstack/react-query";
import { BlogPost } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Loader2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { PageBanner } from "@/components/ui/page-banner";
import { MetaTags } from "@/components/ui/meta-tags";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
    <>
      <MetaTags
        title="B2B Marketing Insights & Lead Generation Blog"
        description="Explore expert insights, strategies, and best practices for B2B marketing, lead generation, content marketing, and business growth from Pivotal B2B's thought leaders."
        keywords="B2B marketing blog, lead generation insights, content marketing strategy, B2B thought leadership, marketing automation, lead nurturing tips, business growth strategies"
      />
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
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "Draft"}
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
        
        {/* CTA Section */}
        <section className="bg-primary/5 py-20 mt-10">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for expert marketing support?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Transform insights into action. Let our team develop a strategic marketing plan aligned with your business objectives.
              </p>
              <Link href="/request-proposal">
                <Button size="lg" className="group">
                  Request a Proposal
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}