import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieConsent } from "@/components/cookie-consent";
import { useAnalytics } from "@/hooks/use-analytics";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Service from "@/pages/service";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import Blog from "@/pages/blog";
import BlogDetail from "@/pages/blog-detail";
import Ebooks from "@/pages/ebooks";
import EbookDetail from "@/pages/ebook-detail";
import CaseStudies from "@/pages/case-studies";
import CaseStudyDetail from "@/pages/case-study-detail";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsConditions from "@/pages/terms-conditions";
import CookiePolicy from "@/pages/cookie-policy";
import B2BAudience from "@/pages/b2b-audience";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { PageTransition } from "@/components/ui/page-transition";

function Router() {
  // Add analytics tracking
  useAnalytics();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageTransition>
        <main className="flex-grow">
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
        </main>
      </PageTransition>
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