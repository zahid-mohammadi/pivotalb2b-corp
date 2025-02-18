import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">
            Cultivate Lasting Connections with Your Ideal Buyers
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Generate high-quality leads, empower your sales team, and build a thriving sales pipeline.
          </p>
          <div className="flex gap-4">
            <Button size="lg">Get Started Today</Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      
      {/* Abstract shapes background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute right-0 top-0 h-full text-blue-500/10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0 L100 0 L100 100 L0 0"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
