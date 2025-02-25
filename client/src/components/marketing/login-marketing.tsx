import { Check } from "lucide-react";

export default function MarketingSection() {
  return (
    <div className="p-6 md:p-8 bg-primary text-white h-full">
      <div className="h-full flex flex-col justify-center space-y-4">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">
          Pivotal B2B Marketing Platform
        </h2>
        <p className="text-primary-foreground/90 text-sm leading-relaxed">
          Access your comprehensive B2B marketing dashboard to manage content, 
          track leads, and drive engagement across all your digital resources.
        </p>
        <ul className="space-y-3">
          {[
            'Content Management',
            'Lead Generation',
            'Analytics & Insights',
            'Campaign Tracking',
          ].map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
