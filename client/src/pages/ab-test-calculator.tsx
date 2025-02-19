import { Helmet } from "react-helmet-async";
import { ABTestCalculator } from "@/components/ab-test-calculator";
import { MetaTags } from "@/components/ui/meta-tags";

export default function ABTestCalculatorPage() {
  return (
    <>
      <MetaTags
        title="A/B Test Statistical Calculator for B2B Marketing"
        description="Calculate statistical significance of your A/B tests with our advanced calculator. Make data-driven decisions with confidence using our comprehensive testing tool that provides conversion rates, confidence intervals, and improvement metrics."
        keywords="A/B testing, statistical significance calculator, conversion rate optimization, B2B testing, marketing experiments, statistical analysis, confidence intervals, sample size calculator"
        canonicalUrl="https://pivotal-b2b.com/ab-test-calculator"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "A/B Test Calculator",
          "applicationCategory": "BusinessApplication",
          "description": "Statistical significance calculator for A/B testing in B2B marketing",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }}
      />

      <div className="container mx-auto py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">A/B Test Calculator</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Make data-driven decisions by calculating the statistical significance of your A/B test results.
            Our calculator uses industry-standard methods to help you determine if your test results are
            meaningful.
          </p>

          <ABTestCalculator />
        </div>
      </div>
    </>
  );
}