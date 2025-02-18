import { Card } from "@/components/ui/card";

export default function EbooksPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Ebooks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-muted-foreground">
            Our collection of ebooks is currently being prepared. Check back soon for valuable B2B marketing resources.
          </p>
        </Card>
      </div>
    </div>
  );
}
