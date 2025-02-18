import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/queryClient";

interface ContentRecommendation {
  id: number;
  title: string;
  type: 'blog-post' | 'case-study' | 'ebook';
  slug: string;
}

interface ContentRecommendationsProps {
  contentType: string;
  contentId: number;
}

export function ContentRecommendations({ contentType, contentId }: ContentRecommendationsProps) {
  const { data: recommendations, isLoading } = useQuery<ContentRecommendation[]>({
    queryKey: ["/api/recommendations", contentType, contentId],
    queryFn: async () => {
      const res = await apiRequest(
        "GET",
        `/api/recommendations/${contentType}/${contentId}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch recommendations");
      }
      return res.json();
    },
    enabled: !!contentId,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-4">You might also like</h3>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!recommendations?.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">You might also like</h3>
      <div className="grid gap-4">
        {recommendations.map((item) => (
          <Link key={item.id} href={`/${item.type}s/${item.slug}`}>
            <Card className="p-4 hover:bg-muted cursor-pointer transition-colors">
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-sm text-muted-foreground mt-1 capitalize">
                {item.type.replace('-', ' ')}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
