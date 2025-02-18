import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CaseStudy } from "@shared/schema";
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

export default function CaseStudyDetailPage() {
  const [, params] = useRoute("/case-studies/:slug");
  const slug = params?.slug;

  const { data: caseStudy, isLoading, error } = useQuery<CaseStudy>({
    queryKey: ["/api/case-studies", slug],
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
    // Here you could track the download or add analytics before showing content
    const element = document.getElementById('case-study-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        <p>{error.message}</p>
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
    <div>
      {/* Banner Section */}
      <div 
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: caseStudy.bannerImage ? `url(${caseStudy.bannerImage})` : undefined }}
      >
        <div className="absolute inset-0 bg-black/50" /> {/* Overlay for better text visibility */}
        <div className="container mx-auto h-full flex flex-col justify-center relative z-10">
          <h1 className="text-5xl font-bold text-white mb-4">{caseStudy.title}</h1>
          <div className="flex gap-4 text-white/80">
            <span>Client: {caseStudy.clientName}</span>
            <span>•</span>
            <span>Industry: {caseStudy.industry}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Description */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-semibold mb-6">About this Case Study</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Challenge</h3>
                <div className="text-lg text-muted-foreground">
                  {caseStudy.challenge}
                </div>
              </div>
              {caseStudy.contentImages?.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-4">
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
          </div>

          {/* Right Column - Download Form */}
          <div className="bg-muted p-8 rounded-lg">
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

                <Button type="submit" className="w-full">
                  Access Case Study
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Full content section - shown after form submission */}
        <div id="case-study-content" className="mt-12 space-y-8">
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
    </div>
  );
}