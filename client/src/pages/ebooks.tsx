import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Ebook } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { Link } from "wouter";
import { PageBanner } from "@/components/ui/page-banner";

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
      <PageBanner
        title="Resource Library"
        description="Access our comprehensive collection of eBooks designed to enhance your B2B marketing knowledge and strategy."
        pattern="grid"
      />

      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ebooks?.map((ebook) => (
            <Link key={ebook.id} href={`/ebooks/${ebook.slug}`}>
              <Card className="group overflow-hidden hover-lift">
                {ebook.bannerImage && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={ebook.bannerImage}
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
          ))}
          {!ebooks?.length && (
            <p className="text-muted-foreground col-span-3 text-center">
              Our collection of ebooks is currently being prepared. Check back soon for valuable B2B marketing resources.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}