import { useQuery } from "@tanstack/react-query";
import { Ebook } from "@shared/schema";
import { Loader2 } from "lucide-react";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const downloadFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  businessEmail: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company name is required"),
});

type DownloadFormValues = z.infer<typeof downloadFormSchema>;

export default function EbookDetailPage() {
  const [, params] = useRoute("/ebooks/:slug");
  const slug = params?.slug;

  const { data: ebook, isLoading } = useQuery<Ebook>({
    queryKey: ["/api/ebooks", slug],
    queryFn: async () => {
      const response = await fetch(`/api/ebooks/${slug}`);
      if (!response.ok) {
        throw new Error("Failed to fetch ebook");
      }
      return response.json();
    },
    enabled: !!slug,
  });

  const form = useForm<DownloadFormValues>({
    resolver: zodResolver(downloadFormSchema),
    defaultValues: {
      fullName: "",
      businessEmail: "",
      company: "",
    },
  });

  const onSubmit = (data: DownloadFormValues) => {
    if (ebook?.downloadUrl) {
      window.open(ebook.downloadUrl, '_blank');
    }
  };

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
    <div className="min-h-screen">
      {/* Banner Section */}
      <div className="relative h-[400px] bg-primary">
        {ebook.bannerImage && (
          <img 
            src={ebook.bannerImage}
            alt={ebook.title}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto h-full flex flex-col justify-center relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">
            {ebook.title}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            {ebook.description}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Content (70%) */}
          <div className="flex-[2.33]">
            {/* Content Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-6 text-foreground">Content</h2>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div className="text-foreground">
                  {ebook.content && (
                    <div className="whitespace-pre-wrap mt-6">
                      {ebook.content}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Preview Images */}
            {ebook.contentImages && ebook.contentImages.length > 0 && (
              <div className="mt-8">
                <h2 className="text-3xl font-semibold mb-6 text-foreground">Preview Images</h2>
                <div className="grid grid-cols-2 gap-4">
                  {ebook.contentImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Content preview ${index + 1}`}
                      className="rounded-lg shadow-md"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Download Form (30%) */}
          <div className="flex-[1.285]">
            <div className="p-8 rounded-lg border bg-card shadow-sm sticky top-8">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Download this eBook</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="businessEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={!ebook.downloadUrl}
                  >
                    Download eBook
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}