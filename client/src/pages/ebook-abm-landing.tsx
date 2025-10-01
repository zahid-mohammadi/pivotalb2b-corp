import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MetaTags } from "@/components/ui/meta-tags";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { CheckCircle, Download, Target, Users, TrendingUp, BookOpen, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Ebook } from "@shared/schema";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  phone: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function EbookABMLanding() {
  const [, navigate] = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: ebooks } = useQuery<Ebook[]>({
    queryKey: ["/api/ebooks"],
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      phone: "",
    },
  });

  const ebookMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const abmEbook = ebooks?.find(e => e.slug === 'abm-guide');
      
      if (!abmEbook) {
        throw new Error("eBook not found");
      }

      return await apiRequest("POST", "/api/leads", {
        ...data,
        contentType: "ebook",
        contentId: abmEbook.id,
        source: "ebook-landing"
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      setIsSubmitted(true);
      setTimeout(() => {
        navigate("/ebook/abm-guide");
      }, 1500);
    },
  });

  const onSubmit = (data: FormData) => {
    ebookMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Success!</h2>
          <p className="text-xl text-blue-200">Redirecting you to your eBook...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      <MetaTags
        title="Download: The Executive Guide to ABM-Driven Growth | Pivotal B2B"
        description="Stop chasing contacts. Start engaging target accounts. Download our comprehensive guide to discover how to influence entire buying committees before they choose a vendor."
        keywords="ABM, account-based marketing, B2B marketing, lead generation, buying committees, ICP, ideal customer profile"
      />

      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          
          {/* Left Column - Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white space-y-8"
          >
            {/* Headline */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                Stop Chasing Contacts.<br />
                <span className="text-blue-300">Start Engaging Target Accounts.</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                Download <strong>The Executive Guide to ABM-Driven Growth</strong> and discover how to influence entire buying committees before they choose a vendor.
              </p>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-300" />
                What You'll Learn
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Why lead lists don't equal pipeline</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">How to define and prioritize ICP accounts</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">The secrets to engaging all decision-makers with tailored content</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">A step-by-step framework to launch ABM successfully</span>
                </li>
              </ul>
            </div>

            {/* Social Proof Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-300">87%</div>
                <div className="text-sm text-blue-200">Higher ROI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-300">3x</div>
                <div className="text-sm text-blue-200">Win Rates</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-300">60%</div>
                <div className="text-sm text-blue-200">Faster Close</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Get Your Free ABM Guide
                </h2>
                <p className="text-gray-600">
                  Instant access. No credit card required.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 font-semibold">Full Name *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="John Smith"
                            className="h-12 text-lg"
                            data-testid="input-fullname-landing"
                          />
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
                        <FormLabel className="text-gray-900 font-semibold">Work Email *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="john@company.com"
                            className="h-12 text-lg"
                            data-testid="input-email-landing"
                          />
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
                        <FormLabel className="text-gray-900 font-semibold">Company Name *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Acme Corporation"
                            className="h-12 text-lg"
                            data-testid="input-company-landing"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 font-semibold">Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="+1 (555) 123-4567"
                            className="h-12 text-lg"
                            data-testid="input-phone-landing"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={ebookMutation.isPending}
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                    data-testid="button-submit-ebook-landing"
                  >
                    {ebookMutation.isPending ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Download className="w-5 h-5" />
                        Get My Free ABM Guide
                      </div>
                    )}
                  </Button>

                  <p className="text-xs text-center text-gray-500 mt-4">
                    By downloading, you agree to receive communications from Pivotal B2B. 
                    We respect your privacy and will never share your information.
                  </p>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
