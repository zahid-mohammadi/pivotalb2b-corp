import { useState } from "react";
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

  const { data: ebook, isLoading, error } = useQuery<Ebook>({
    queryKey: ["/api/ebooks", slug],
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

  if (error) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8">Error loading eBook</h1>
        <p>{error.message}</p>
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
    <div>
      {/* Banner Section */}
      <div 
        className="relative h-[400px] bg-cover bg-center"
        style={{ 
          backgroundImage: ebook.bannerImage ? `url(${ebook.bannerImage})` : 'none',
          backgroundColor: !ebook.bannerImage ? 'rgb(var(--muted))' : undefined
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto h-full flex items-center relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-4">{ebook.title}</h1>
            {ebook.description && (
              <p className="text-lg text-white/80">{ebook.description.slice(0, 150)}...</p>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Content */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-semibold mb-6">About this eBook</h2>
            {ebook.description && (
              <div className="text-lg text-muted-foreground mb-8">
                {ebook.description}
              </div>
            )}
            {ebook.content && (
              <div className="text-lg text-muted-foreground">
                {ebook.content}
              </div>
            )}
            {ebook.contentImages && ebook.contentImages.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-4">
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
          </div>

          {/* Right Column - Download Form */}
          <div className="bg-muted p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-6">Download this eBook</h3>
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
  );
}