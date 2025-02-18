import { Card } from "@/components/ui/card";

export default function CaseStudiesPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Case Studies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-muted-foreground">
            Our collection of case studies is being prepared. These will showcase successful B2B marketing campaigns and their results.
          </p>
        </Card>
      </div>
    </div>
  );
}
