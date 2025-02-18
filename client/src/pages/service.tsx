import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle } from "lucide-react";
import type { Service } from "@shared/schema";

export default function ServicePage() {
  const [, params] = useRoute<{ slug: string }>("/services/:slug");
  
  const { data: service, isLoading } = useQuery<Service>({
    queryKey: [`/api/services/${params?.slug}`],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-2xl font-bold">Service not found</h1>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-6">{service.title}</h1>
            <p className="text-xl text-slate-300">{service.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Features */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <div className="space-y-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold">{feature}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6">Benefits</h2>
              <div className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold">{benefit}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your lead generation and sales pipeline with our proven solutions.
          </p>
          <Button size="lg">Contact Us Today</Button>
        </div>
      </div>
    </div>
  );
}
