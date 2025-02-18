import { useQuery } from "@tanstack/react-query";
import { Ebook } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";

export default function EbookDetailPage() {
  const [, params] = useRoute("/ebooks/:id");
  const id = params?.id ? parseInt(params.id) : undefined;

  const { data: ebook, isLoading } = useQuery<Ebook>({
    queryKey: ["/api/ebooks", id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!ebook) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">eBook Not Found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      {ebook.bannerImage && (
        <img
          src={ebook.bannerImage}
          alt={ebook.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{ebook.title}</h1>
      <div className="prose prose-lg max-w-none mb-8">
        <p>{ebook.description}</p>
      </div>
      <div className="prose prose-lg max-w-none">
        {ebook.content}
      </div>
      {ebook.contentImages?.length > 0 && (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          {ebook.contentImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Content image ${index + 1}`}
              className="rounded-lg"
            />
          ))}
        </div>
      )}
      {ebook.downloadUrl && (
        <div className="mt-8">
          <Button asChild>
            <a href={ebook.downloadUrl} target="_blank" rel="noopener noreferrer">
              Download eBook
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
