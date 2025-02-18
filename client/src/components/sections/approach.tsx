import { Target, FileText, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Approach() {
  const steps = [
    {
      icon: Target,
      title: "Pinpoint",
      description: "Identify and target your ideal B2B buyers with precision.",
    },
    {
      icon: FileText,
      title: "Content",
      description: "Create and distribute engaging content that resonates with your audience.",
    },
    {
      icon: Zap,
      title: "Fuel",
      description: "Accelerate your sales pipeline with qualified, engaged leads.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven three-step process to generate and nurture high-quality leads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
