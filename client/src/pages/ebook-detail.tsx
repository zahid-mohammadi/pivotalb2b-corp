import { useQuery, useMutation } from "@tanstack/react-query";
import { Ebook, InsertLead } from "@shared/schema";
import { Loader2, Download, ArrowRight } from "lucide-react";
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
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ContentRecommendations } from "@/components/ui/content-recommendations";

const downloadFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company name is required"),
});

type DownloadFormValues = z.infer<typeof downloadFormSchema>;

export default function EbookDetailPage() {
  const [, params] = useRoute("/ebooks/:slug");
  const slug = params?.slug;
  const { toast } = useToast();

  const { data: ebook, isLoading } = useQuery<Ebook>({
    queryKey: ["/api/ebooks", slug],
    queryFn: async () => {
      const res = await apiRequest("GET", `/api/ebooks/${slug}`);
      if (!res.ok) {
        throw new Error("Failed to fetch ebook");
      }
      return res.json();
    },
    enabled: !!slug,
  });

  const form = useForm<DownloadFormValues>({
    resolver: zodResolver(downloadFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
    },
  });

  const leadMutation = useMutation({
    mutationFn: async (data: DownloadFormValues) => {
      if (!ebook) {
        throw new Error("Ebook not found");
      }
      const res = await apiRequest("POST", "/api/leads", {
        fullName: data.fullName,
        email: data.email,
        company: data.company,
        contentType: 'ebook',
        contentId: ebook.id
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to record lead");
      }
      return res.json();
    },
    onSuccess: () => {
      if (ebook?.pdfUrl) {
        window.open(ebook.pdfUrl, '_blank');
      }
      toast({
        title: "Success",
        description: "Thank you for your interest. Your download should begin shortly.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: DownloadFormValues) => {
    leadMutation.mutate(data);
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
    <div className="min-h-screen bg-slate-50">
      {/* Banner Section */}
      <div className="relative h-[500px] bg-primary overflow-hidden">
        {ebook.bannerImage && (
          <img 
            src={ebook.bannerImage}
            alt={ebook.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
        <div className="container mx-auto h-full flex flex-col justify-center relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              {ebook.title}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              {ebook.description}
            </p>
            {ebook.tags && ebook.tags.length > 0 && (
              <div className="flex gap-2 mt-6">
                {ebook.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-white/10 text-white rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Content (70%) */}
          <div className="flex-[2.33] space-y-12">
            {/* Content Section */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-3xl font-semibold mb-6 text-foreground">What You'll Learn</h2>
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <div className="text-foreground">
                  {ebook.content && (
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {ebook.content}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Preview Images */}
            {ebook.contentImages && ebook.contentImages.length > 0 && (
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h2 className="text-3xl font-semibold mb-6 text-foreground">Preview Pages</h2>
                <div className="grid grid-cols-2 gap-6">
                  {ebook.contentImages.map((image, index) => (
                    <div key={index} className="group relative aspect-[3/4] overflow-hidden rounded-lg">
                      <img
                        src={image}
                        alt={`Preview page ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Download Form (30%) */}
          <div className="flex-[1.285]">
            <div className="space-y-8 sticky top-8">
              <div className="bg-white p-8 rounded-xl border shadow-sm">
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
                            <Input {...field} className="bg-slate-50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" className="bg-slate-50" />
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
                            <Input {...field} className="bg-slate-50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={leadMutation.isPending}
                      size="lg"
                    >
                      {leadMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Download eBook
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>

              {ebook && (
                <div className="bg-white p-8 rounded-xl border shadow-sm">
                  <h3 className="text-2xl font-semibold mb-4">Related Content</h3>
                  <ContentRecommendations
                    contentType="ebook"
                    contentId={ebook.id}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}