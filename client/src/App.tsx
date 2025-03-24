import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieConsent } from "@/components/cookie-consent";
import { useAnalytics } from "@/hooks/use-analytics";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { PageTransition } from "@/components/ui/page-transition";
import { Suspense, lazy } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load all page components for better performance
const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/home"));
const Service = lazy(() => import("@/pages/service"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Login = lazy(() => import("@/pages/login"));
const Blog = lazy(() => import("@/pages/blog"));
const BlogDetail = lazy(() => import("@/pages/blog-detail"));
const Ebooks = lazy(() => import("@/pages/ebooks"));
const EbookDetail = lazy(() => import("@/pages/ebook-detail"));
const CaseStudies = lazy(() => import("@/pages/case-studies"));
const CaseStudyDetail = lazy(() => import("@/pages/case-study-detail"));
const About = lazy(() => import("@/pages/about"));
const Contact = lazy(() => import("@/pages/contact"));
const PrivacyPolicy = lazy(() => import("@/pages/privacy-policy"));
const TermsConditions = lazy(() => import("@/pages/terms-conditions"));
const CookiePolicy = lazy(() => import("@/pages/cookie-policy"));
const B2BAudience = lazy(() => import("@/pages/b2b-audience"));

// Loading placeholder
const PageSkeleton = () => (
  <div className="container mx-auto px-4 py-12">
    <Skeleton className="h-12 w-3/4 mb-8" />
    <Skeleton className="h-6 w-full mb-4" />
    <Skeleton className="h-6 w-5/6 mb-4" />
    <Skeleton className="h-6 w-4/6 mb-8" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  </div>
);

function Router() {
  // Add analytics tracking
  useAnalytics();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <PageTransition>
          <Suspense fallback={<PageSkeleton />}>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/services/:slug" component={Service} />
              <Route path="/b2b-audience" component={B2BAudience} />
              <Route path="/login" component={Login} />
              <Route path="/blog" component={Blog} />
              <Route path="/blog/:slug" component={BlogDetail} />
              <Route path="/ebooks" component={Ebooks} />
              <Route path="/ebooks/:id" component={EbookDetail} />
              <Route path="/case-studies" component={CaseStudies} />
              <Route path="/case-studies/:id" component={CaseStudyDetail} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/privacy-policy" component={PrivacyPolicy} />
              <Route path="/terms-conditions" component={TermsConditions} />
              <Route path="/cookie-policy" component={CookiePolicy} />
              <ProtectedRoute path="/dashboard" component={Dashboard} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </PageTransition>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider>
          <AuthProvider>
            <Router />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}