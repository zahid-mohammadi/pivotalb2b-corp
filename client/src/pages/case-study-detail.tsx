import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { CaseStudy, InsertLead } from "@shared/schema";
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
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const downloadFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company name is required"),
});

type DownloadFormValues = z.infer<typeof downloadFormSchema>;

export default function CaseStudyDetailPage() {
  const [, params] = useRoute("/case-studies/:slug");
  const slug = params?.slug;
  const { toast } = useToast();

  const { data: caseStudy, isLoading } = useQuery<CaseStudy>({
    queryKey: ["/api/case-studies", slug],
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
      if (!caseStudy) {
        throw new Error("Case study not found");
      }
      const res = await apiRequest("POST", "/api/leads", {
        fullName: data.fullName,
        email: data.email,
        company: data.company,
        contentType: 'case-study',
        contentId: caseStudy.id
      });
      if (!res.ok) {
        throw new Error("Failed to record lead");
      }
      return res.json();
    },
    onSuccess: () => {
      if (caseStudy?.pdfUrl) {
        window.open(caseStudy.pdfUrl, '_blank');
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

  if (!caseStudy) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">Case Study Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <div className="relative h-[400px] bg-primary">
        {caseStudy.bannerImage && (
          <img
            src={caseStudy.bannerImage}
            alt={caseStudy.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto h-full flex flex-col justify-center relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">
            {caseStudy.title}
          </h1>
          <div className="flex gap-4 text-white/80">
            <span>Client: {caseStudy.clientName}</span>
            <span>•</span>
            <span>Industry: {caseStudy.industry}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Content (70%) */}
          <div className="flex-[2.33]">
            {/* Overview Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-6">Overview</h2>
              <div className="grid gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Challenge</h3>
                  <div className="text-lg text-muted-foreground">
                    {caseStudy.challenge}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">Solution</h3>
                  <div className="text-lg text-muted-foreground">
                    {caseStudy.solution}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-4">Results</h3>
                  <div className="text-lg text-muted-foreground">
                    {caseStudy.results}
                  </div>
                </div>
              </div>
            </div>

            {/* Supporting Images */}
            {caseStudy.contentImages && caseStudy.contentImages.length > 0 && (
              <div className="mt-8">
                <h2 className="text-3xl font-semibold mb-6">Supporting Images</h2>
                <div className="grid grid-cols-2 gap-4">
                  {caseStudy.contentImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Case study image ${index + 1}`}
                      className="rounded-lg shadow-md"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Access Form (30%) */}
          <div className="flex-[1.285]">
            <div className="bg-muted p-8 rounded-lg shadow-lg sticky top-8">
              <h3 className="text-2xl font-semibold mb-6">Access Full Case Study</h3>
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
                    name="email"
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
                    disabled={leadMutation.isPending}
                  >
                    Access Case Study
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