import { useState } from "react";
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
import { Loader2, Download } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";

const mediaKitFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  phone: z.string().optional(),
});

type MediaKitFormData = z.infer<typeof mediaKitFormSchema>;

interface MediaKitFormProps {
  onSuccess: () => void;
}

export function MediaKitForm({ onSuccess }: MediaKitFormProps) {
  const form = useForm<MediaKitFormData>({
    resolver: zodResolver(mediaKitFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      phone: "",
    },
  });

  const submitLeadMutation = useMutation({
    mutationFn: async (data: MediaKitFormData) => {
      return await apiRequest("POST", "/api/leads", {
        ...data,
        contentType: "media-kit",
        contentId: 1,
        source: "media-kit"
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      onSuccess();
    },
  });

  const onSubmit = (data: MediaKitFormData) => {
    submitLeadMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-950 to-fuchsia-950 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Download className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Access Our Media Kit
            </h2>
            <p className="text-lg text-violet-200">
              Get instant access to our comprehensive brand assets and company information
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-semibold">Full Name *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Doe"
                        className="bg-white/10 border-white/20 text-white placeholder:text-violet-200/50 focus:border-violet-400 focus:ring-violet-400"
                        data-testid="input-fullname"
                      />
                    </FormControl>
                    <FormMessage className="text-pink-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-semibold">Email Address *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="john@company.com"
                        className="bg-white/10 border-white/20 text-white placeholder:text-violet-200/50 focus:border-violet-400 focus:ring-violet-400"
                        data-testid="input-email"
                      />
                    </FormControl>
                    <FormMessage className="text-pink-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-semibold">Company Name *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Acme Corporation"
                        className="bg-white/10 border-white/20 text-white placeholder:text-violet-200/50 focus:border-violet-400 focus:ring-violet-400"
                        data-testid="input-company"
                      />
                    </FormControl>
                    <FormMessage className="text-pink-300" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-semibold">Phone Number (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="+1 (555) 123-4567"
                        className="bg-white/10 border-white/20 text-white placeholder:text-violet-200/50 focus:border-violet-400 focus:ring-violet-400"
                        data-testid="input-phone"
                      />
                    </FormControl>
                    <FormMessage className="text-pink-300" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={submitLeadMutation.isPending}
                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                data-testid="button-submit-media-kit-form"
              >
                {submitLeadMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Get Media Kit
                  </div>
                )}
              </Button>

              <p className="text-xs text-center text-violet-200/70 mt-4">
                By submitting this form, you agree to receive communications from Pivotal B2B. 
                We respect your privacy and will never share your information.
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
