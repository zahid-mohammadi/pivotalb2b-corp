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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Form Section */}
            <div className="p-8">
              <div className="space-y-2 text-center mb-8">
                <Lock className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
                <p className="text-sm text-muted-foreground">
                  Sign in to access your dashboard
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => loginMutation.mutate(data))} className="space-y-4">
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

            {/* Marketing Section */}
            <div className="p-8 bg-primary text-white hidden md:block">
              <div className="h-full flex flex-col justify-center space-y-4">
                <h2 className="text-2xl font-bold">Pivotal B2B Marketing Platform</h2>
                <p className="text-primary-foreground/90 text-sm">
                  Access your comprehensive B2B marketing dashboard to manage content, 
                  track leads, and drive engagement across all your digital resources.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <span>• Content Management</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span>• Lead Generation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span>• Analytics & Insights</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}