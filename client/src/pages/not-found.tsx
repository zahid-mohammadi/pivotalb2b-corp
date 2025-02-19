import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home, Search, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function NotFound() {
  const [location] = useLocation();

  // Common sections that users might be looking for
  const popularSections = [
    { name: "Services", path: "/services/intent-based-lead-generation" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Resources", path: "/ebooks" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
      <Card className="w-full max-w-2xl mx-4 shadow-lg">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="h-10 w-10 text-red-500" />
            <h1 className="text-3xl font-bold text-gray-900">Page Not Found</h1>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            We're sorry, but the page you're looking for ({location}) cannot be found. 
            It might have been moved or deleted.
          </p>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Link href="/">
                <Button className="gap-2">
                  <Home className="h-4 w-4" />
                  Return Home
                </Button>
              </Link>
              <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
            </div>

            <div className="pt-6 border-t">
              <h2 className="text-xl font-semibold mb-4">Popular Sections</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {popularSections.map((section) => (
                  <Link key={section.path} href={section.path}>
                    <Button variant="ghost" className="w-full justify-start">
                      <Search className="h-4 w-4 mr-2" />
                      {section.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}