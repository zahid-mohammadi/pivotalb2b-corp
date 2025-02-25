import { lazy, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "wouter";
import { loginSchema, type LoginData } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
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
import { Loader2, Lock } from "lucide-react";
import { MetaTags } from "@/components/ui/meta-tags";

// Lazy load the marketing section for better initial load performance
const MarketingSection = lazy(() => import("@/components/marketing/login-marketing"));

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { loginMutation, user } = useAuth();
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Redirect if already logged in
  if (user) {
    setLocation("/dashboard");
    return null;
  }

  return (
    <>
      <MetaTags
        title="Login - Pivotal B2B Marketing Platform"
        description="Secure access to your Pivotal B2B marketing dashboard. Manage your content, leads, and marketing campaigns through our comprehensive platform."
        noindex={true}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Form Section - Optimized for mobile */}
              <div className="p-6 md:p-8">
                <div className="space-y-2 text-center mb-6 md:mb-8">
                  <Lock className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 text-primary" />
                  <h1 className="text-xl md:text-2xl font-bold tracking-tight">Welcome Back</h1>
                  <p className="text-sm text-muted-foreground">
                    Sign in to access your dashboard
                  </p>
                </div>

                <Form {...form}>
                  <form 
                    onSubmit={form.handleSubmit((data) => loginMutation.mutate(data))} 
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" className="bg-slate-50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input {...field} type="password" className="bg-slate-50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loginMutation.isPending}
                      size="lg"
                    >
                      {loginMutation.isPending && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Sign In
                    </Button>
                  </form>
                </Form>
              </div>

              {/* Marketing Section - Lazy loaded */}
              <div className="hidden md:block">
                <Suspense fallback={<div className="h-full bg-primary animate-pulse" />}>
                  <MarketingSection />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}