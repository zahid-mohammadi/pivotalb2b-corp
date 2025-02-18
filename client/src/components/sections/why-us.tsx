import { Globe2, Target, Cpu, Shield } from "lucide-react";

export function WhyUs() {
  const features = [
    {
      icon: Globe2,
      title: "Massive Reach",
      description: "Access to a vast network of B2B decision-makers across industries.",
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Advanced filters and criteria to reach your ideal customer profile.",
    },
    {
      icon: Cpu,
      title: "Advanced Martech",
      description: "State-of-the-art technology for lead generation and qualification.",
    },
    {
      icon: Shield,
      title: "Compliance",
      description: "Full compliance with data protection and privacy regulations.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Partner with Pivotal B2B for unmatched expertise and results in B2B lead generation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
