import { useQuery } from "@tanstack/react-query";
import { CaseStudy } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { useRoute } from "wouter";

export default function CaseStudyDetailPage() {
  const [, params] = useRoute("/case-studies/:slug");
  const slug = params?.slug;

  const { data: caseStudy, isLoading, error } = useQuery<CaseStudy>({
    queryKey: ["/api/case-studies", slug],
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
        <h1 className="text-4xl font-bold mb-8">Error loading Case Study</h1>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">Case Study Not Found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      {caseStudy.bannerImage && (
        <img
          src={caseStudy.bannerImage}
          alt={caseStudy.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{caseStudy.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Client</h2>
          <p className="text-lg text-muted-foreground">{caseStudy.clientName}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Industry</h2>
          <p className="text-lg text-muted-foreground">{caseStudy.industry}</p>
        </div>
      </div>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Challenge</h2>
          <div className="prose prose-lg max-w-none">
            {caseStudy.challenge}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Solution</h2>
          <div className="prose prose-lg max-w-none">
            {caseStudy.solution}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Results</h2>
          <div className="prose prose-lg max-w-none">
            {caseStudy.results}
          </div>
        </div>
      </div>
      {caseStudy.contentImages?.length > 0 && (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          {caseStudy.contentImages.map((image, index) => (
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