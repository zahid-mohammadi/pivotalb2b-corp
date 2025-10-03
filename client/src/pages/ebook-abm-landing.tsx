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
import { CheckCircle, Download, Target, Users, TrendingUp, BookOpen, Loader2, Clock, Shield, Award, ArrowRight, Sparkles, Zap } from "lucide-react";
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
        navigate("/abm-guide");
      }, 1500);
    },
  });

  const onSubmit = (data: FormData) => {
    ebookMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div 
            className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle className="w-16 h-16 text-white" />
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-4">Success! 🎉</h2>
          <p className="text-xl text-blue-200">Redirecting you to your eBook...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 relative overflow-hidden">
      <MetaTags
        title="Download: The Executive Guide to ABM-Driven Growth | Pivotal B2B"
        description="Stop chasing contacts. Start engaging target accounts. Download our comprehensive guide to discover how to influence entire buying committees before they choose a vendor."
        keywords="ABM, account-based marketing, B2B marketing, lead generation, buying committees, ICP, ideal customer profile"
      />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-8 lg:pt-20 lg:pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
          
          {/* Left Column - Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white space-y-6 lg:space-y-8"
          >
            {/* Urgency Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 rounded-full px-4 py-2 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-orange-300" />
              <span className="text-sm font-semibold text-orange-200">Free Executive Guide • Limited Time</span>
            </motion.div>

            {/* Headline */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 lg:mb-6">
                Stop Chasing Contacts.<br />
                <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent">Start Engaging Target Accounts.</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-blue-100 leading-relaxed">
                Download <strong className="text-white">The Executive Guide to ABM-Driven Growth</strong> and discover how to influence entire buying committees before they choose a vendor.
              </p>
            </div>

            {/* Key Benefits with Icons */}
            <div className="space-y-3">
              {[
                { icon: Target, text: "Why lead lists don't equal pipeline", color: "text-cyan-400" },
                { icon: Users, text: "How to define and prioritize ICP accounts", color: "text-blue-400" },
                { icon: TrendingUp, text: "Secrets to engaging all decision-makers", color: "text-purple-400" },
                { icon: Zap, text: "Step-by-step framework to launch ABM", color: "text-indigo-400" }
              ].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                    <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                  </div>
                  <span className="text-base lg:text-lg font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Social Proof Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20"
            >
              <h3 className="text-lg font-semibold mb-6 text-center text-blue-200">Companies Using ABM See:</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-black bg-gradient-to-br from-green-300 to-emerald-400 bg-clip-text text-transparent mb-1">87%</div>
                  <div className="text-xs lg:text-sm text-blue-200">Higher ROI</div>
                </div>
                <div className="text-center border-x border-white/20">
                  <div className="text-3xl lg:text-4xl font-black bg-gradient-to-br from-blue-300 to-cyan-400 bg-clip-text text-transparent mb-1">3x</div>
                  <div className="text-xs lg:text-sm text-blue-200">Win Rates</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-black bg-gradient-to-br from-purple-300 to-pink-400 bg-clip-text text-transparent mb-1">60%</div>
                  <div className="text-xs lg:text-sm text-blue-200">Faster Close</div>
                </div>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-4 items-center justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                <Clock className="w-5 h-5 text-blue-300" />
                <span className="text-sm text-blue-100">Instant Access</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                <Shield className="w-5 h-5 text-green-300" />
                <span className="text-sm text-blue-100">No Credit Card</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                <Award className="w-5 h-5 text-purple-300" />
                <span className="text-sm text-blue-100">Expert Insights</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-30"></div>
            
            <div className="relative bg-white rounded-3xl p-6 lg:p-10 shadow-2xl">
              <div className="text-center mb-6 lg:mb-8">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl blur-md opacity-50"></div>
                  <div className="relative w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <Download className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl lg:text-3xl font-black text-gray-900 mb-2">
                  Get Your Free ABM Guide
                </h2>
                <p className="text-gray-600 text-sm lg:text-base">
                  Instant download. No commitments. No hassle.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-900 font-semibold text-sm">Full Name *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="John Smith"
                            className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
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
                        <FormLabel className="text-gray-900 font-semibold text-sm">Work Email *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="john@company.com"
                            className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
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
                        <FormLabel className="text-gray-900 font-semibold text-sm">Company Name *</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Acme Corporation"
                            className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
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
                        <FormLabel className="text-gray-900 font-semibold text-sm">Phone (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="+1 (555) 123-4567"
                            className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
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
                    className="w-full h-14 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold text-base lg:text-lg shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
                    data-testid="button-submit-ebook-landing"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    {ebookMutation.isPending ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Download className="w-5 h-5" />
                        Get My Free ABM Guide
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>

                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-700">
                        <strong>Instant Access:</strong> Your guide will be delivered immediately via email
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-700">
                        <strong>Privacy First:</strong> We'll never share your information
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-center text-gray-500 leading-relaxed">
                    By downloading, you agree to receive communications from Pivotal B2B. 
                    Unsubscribe anytime.
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
