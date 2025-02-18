import { useQuery, useMutation } from "@tanstack/react-query";
import { CaseStudy } from "@shared/schema";
import { Loader2, Download, Building2, Briefcase, Target, LineChart } from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { MetaTags } from "@/components/ui/meta-tags";

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
        const error = await res.json();
        throw new Error(error.error || "Failed to record lead");
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
    <>
      <MetaTags
        title={`${caseStudy.title} - B2B Marketing Case Study`}
        description={`Discover how ${caseStudy.clientName} achieved remarkable results through Pivotal B2B's ${caseStudy.industry} marketing solutions. Learn about their challenges, our approach, and the measurable outcomes.`}
        keywords={`${caseStudy.industry} case study, B2B marketing success, ${caseStudy.clientName} success story, lead generation case study, ${caseStudy.tags?.join(', ')}`}
      />
      <div className="min-h-screen bg-slate-50">
        {/* Banner Section */}
        <div className="relative h-[500px] bg-primary overflow-hidden">
          {caseStudy.bannerImage && (
            <img
              src={caseStudy.bannerImage}
              alt={caseStudy.title}
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
          <div className="container mx-auto h-full flex flex-col justify-center relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-white">
                    <Building2 className="h-4 w-4" />
                    <span>{caseStudy.clientName}</span>
                  </div>
                </div>
                <div className="px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-white">
                    <Briefcase className="h-4 w-4" />
                    <span>{caseStudy.industry}</span>
                  </div>
                </div>
              </div>
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                {caseStudy.title}
              </h1>
              {caseStudy.tags && caseStudy.tags.length > 0 && (
                <div className="flex gap-2 mt-6">
                  {caseStudy.tags.map((tag, index) => (
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
              {/* Overview Cards */}
              <div className="grid gap-8">
                <Card className="overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-4">Challenge</h3>
                        <div className="text-lg text-muted-foreground leading-relaxed">
                          {caseStudy.challenge}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-4">Solution</h3>
                        <div className="text-lg text-muted-foreground leading-relaxed">
                          {caseStudy.solution}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <LineChart className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-4">Results</h3>
                        <div className="text-lg text-muted-foreground leading-relaxed">
                          {caseStudy.results}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Supporting Images */}
              {caseStudy.contentImages && caseStudy.contentImages.length > 0 && (
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <h2 className="text-3xl font-semibold mb-6">Supporting Evidence</h2>
                  <div className="grid grid-cols-2 gap-6">
                    {caseStudy.contentImages.map((image, index) => (
                      <div key={index} className="group relative aspect-video overflow-hidden rounded-lg">
                        <img
                          src={image}
                          alt={`Case study image ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Access Form (30%) */}
            <div className="flex-[1.285]">
              <div className="sticky top-8 space-y-8">
                <div className="bg-white p-8 rounded-xl border shadow-sm">
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
                            Access Case Study
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}