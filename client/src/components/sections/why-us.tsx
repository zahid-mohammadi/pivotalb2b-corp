
import { Globe2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function WhyUs() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-white">
      <div className="container px-4 mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Globe2 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-muted-foreground">Access to decision-makers worldwide with our extensive network and targeting capabilities.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
