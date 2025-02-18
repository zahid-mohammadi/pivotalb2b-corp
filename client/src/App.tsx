import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
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
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProtectedRoute } from "@/components/auth/protected-route";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services/:slug" component={Service} />
          <Route path="/login" component={Login} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogDetail} />
          <Route path="/ebooks" component={Ebooks} />
          <Route path="/ebooks/:id" component={EbookDetail} />
          <Route path="/case-studies" component={CaseStudies} />
          <Route path="/case-studies/:id" component={CaseStudyDetail} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}