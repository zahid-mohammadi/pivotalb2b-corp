import { Helmet } from "react-helmet-async";
import { ABTestCalculator } from "@/components/ab-test-calculator";

export default function ABTestCalculatorPage() {
  return (
    <>
      <Helmet>
        <title>A/B Test Calculator | Pivotal B2B</title>
        <meta
          name="description"
          content="Calculate the statistical significance of your A/B test results with our easy-to-use calculator."
        />
      </Helmet>
      
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
