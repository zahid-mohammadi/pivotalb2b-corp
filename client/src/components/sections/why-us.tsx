import { Globe2, Target, Cpu, Shield } from "lucide-react";

export function WhyUs() {
  const features = [
    {
      icon: Globe2,
      title: "Global Reach",
      description: "Access our network of over 50 million B2B decision-makers across industries and regions.",
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "Advanced AI-powered filters to reach your exact ideal customer profile with 95% accuracy.",
    },
    {
      icon: Cpu,
      title: "Smart Technology",
      description: "Proprietary MarTech stack that automates lead scoring and qualification in real-time.",
    },
    {
      icon: Shield,
      title: "Data Compliance",
      description: "100% GDPR and CCPA compliant processes with regular security audits and certifications.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">The Pivotal Advantage</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the power of data-driven lead generation backed by advanced technology and proven expertise.
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