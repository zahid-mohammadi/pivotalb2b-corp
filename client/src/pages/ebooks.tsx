import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Ebook } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { EbookEditor } from "@/components/ebooks/ebook-editor";

export default function EbooksPage() {
  const { user } = useAuth();
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
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Ebooks</h1>

      {/* Show ebook editor for admin users */}
      {user?.role === "admin" && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Create New Ebook</h2>
          <EbookEditor />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ebooks?.map((ebook) => (
          <Card key={ebook.id} className="p-6">
            {ebook.bannerImage && (
              <img
                src={ebook.bannerImage}
                alt={ebook.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <h2 className="text-2xl font-semibold mb-4">{ebook.title}</h2>
            <p className="text-muted-foreground mb-4">{ebook.description}</p>
          </Card>
        ))}
        {!ebooks?.length && (
          <p className="text-muted-foreground col-span-3 text-center">
            Our collection of ebooks is currently being prepared. Check back soon for valuable B2B marketing resources.
          </p>
        )}
      </div>
    </div>
  );
}