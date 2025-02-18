import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { CaseStudy } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { CaseStudyEditor } from "@/components/case-studies/case-study-editor";

export default function CaseStudiesPage() {
  const { user } = useAuth();
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
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Case Studies</h1>

      {/* Show case study editor for admin users */}
      {user?.role === "admin" && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Create New Case Study</h2>
          <CaseStudyEditor />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {caseStudies?.map((caseStudy) => (
          <Card key={caseStudy.id} className="p-6">
            {caseStudy.bannerImage && (
              <img
                src={caseStudy.bannerImage}
                alt={caseStudy.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h2 className="text-2xl font-semibold mb-4">{caseStudy.title}</h2>
            <p className="font-medium text-muted-foreground mb-2">
              Client: {caseStudy.clientName}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Industry: {caseStudy.industry}
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Challenge</h3>
                <p className="text-muted-foreground">{caseStudy.challenge}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Solution</h3>
                <p className="text-muted-foreground">{caseStudy.solution}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Results</h3>
                <p className="text-muted-foreground">{caseStudy.results}</p>
              </div>
            </div>
          </Card>
        ))}
        {!caseStudies?.length && (
          <p className="text-muted-foreground col-span-2 text-center">
            Our collection of case studies is being prepared. These will showcase successful B2B marketing campaigns and their results.
          </p>
        )}
      </div>
    </div>
  );
}