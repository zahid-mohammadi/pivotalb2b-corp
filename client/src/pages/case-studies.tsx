import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { CaseStudy } from "@shared/schema";
import { Loader2, Building2, Briefcase } from "lucide-react";
import { Link } from "wouter";
import { PageBanner } from "@/components/ui/page-banner";

export default function CaseStudiesPage() {
  const { data: caseStudies, isLoading } = useQuery<CaseStudy[]>({
    queryKey: ["/api/case-studies"],
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
        title="Case Studies"
        description="Discover how we've helped businesses transform their B2B marketing strategies and achieve exceptional results."
        pattern="dots"
      />

      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies?.map((caseStudy) => (
            <Link key={caseStudy.id} href={`/case-studies/${caseStudy.slug}`}>
              <Card className="group overflow-hidden hover-lift">
                {caseStudy.bannerImage && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={caseStudy.bannerImage}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span>{caseStudy.clientName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      <span>{caseStudy.industry}</span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold mb-4">{caseStudy.title}</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Challenge</h3>
                      <p className="text-muted-foreground line-clamp-2">{caseStudy.challenge}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
          {!caseStudies?.length && (
            <p className="text-muted-foreground col-span-2 text-center">
              Our collection of case studies is being prepared. These will showcase successful B2B marketing campaigns and their results.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}