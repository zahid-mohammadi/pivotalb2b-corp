import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Ebook } from "@shared/schema";
import { Loader2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { PageBanner } from "@/components/ui/page-banner";
import { MetaTags } from "@/components/ui/meta-tags";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function EbooksPage() {
  const { data: ebooks, isLoading } = useQuery<Ebook[]>({
    queryKey: ["/api/ebooks"],
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
      <MetaTags
        title="B2B Marketing eBooks & Resources | Free Industry Insights | Pivotal B2B"
        description="Download our comprehensive collection of B2B marketing eBooks and resources. Expert insights on lead generation, content strategy, and marketing best practices for enterprise success."
        keywords="B2B marketing ebooks, lead generation guides, content marketing resources, B2B strategy guides, marketing best practices, digital marketing resources, business growth ebooks, enterprise marketing guides"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "B2B Marketing eBooks & Resources",
          "description": "Access our comprehensive collection of B2B marketing eBooks and resources.",
          "publisher": {
            "@type": "Organization",
            "name": "Pivotal B2B",
            "url": "https://pivotal-b2b.com"
          },
          "numberOfItems": ebooks?.length || 0
        }}
      />
      <PageBanner
        title="Resource Library"
        description="Access our comprehensive collection of eBooks designed to enhance your B2B marketing knowledge and strategy."
        pattern="grid"
      />

      <main className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ebooks?.map((ebook) => {
            const ebookUrl = ebook.slug === 'abm-guide' 
              ? '/ebook-abm-guide' 
              : `/ebooks/${ebook.slug}`;
            
            return (
              <Link key={ebook.id} href={ebookUrl}>
                <Card className="group overflow-hidden hover-lift">
                  {ebook.coverImage && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={ebook.coverImage}
                        alt={ebook.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">{ebook.title}</h2>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{ebook.description}</p>
                  </div>
                </Card>
              </Link>
            );
          })}
          {!ebooks?.length && (
            <p className="text-muted-foreground col-span-3 text-center">
              Our collection of ebooks is currently being prepared. Check back soon for valuable B2B marketing resources.
            </p>
          )}
        </div>
      </main>
      
      {/* CTA Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a customized B2B marketing solution?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our team can create a tailored marketing strategy that meets your specific business requirements and goals.
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
  );
}