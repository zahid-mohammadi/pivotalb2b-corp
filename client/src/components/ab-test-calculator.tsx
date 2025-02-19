import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { InfoIcon, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import {
  experimentDataSchema,
  type ExperimentData,
  type StatisticalResult,
  analyzeExperiment,
} from "@/lib/stats";

export function ABTestCalculator() {
  const [result, setResult] = useState<StatisticalResult | null>(null);

  const form = useForm<ExperimentData>({
    resolver: zodResolver(experimentDataSchema),
    defaultValues: {
      variantA: { visitors: 0, conversions: 0 },
      variantB: { visitors: 0, conversions: 0 },
    },
  });

  function onSubmit(data: ExperimentData) {
    const results = analyzeExperiment(data);
    setResult(results);
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>A/B Test Calculator</CardTitle>
          <CardDescription>
            Calculate the statistical significance of your A/B test results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Variant A */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Control (A)</h3>
                  <FormField
                    control={form.control}
                    name="variantA.visitors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visitors</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            placeholder="Number of visitors"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="variantA.conversions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conversions</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            placeholder="Number of conversions"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Variant B */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Variation (B)</h3>
                  <FormField
                    control={form.control}
                    name="variantB.visitors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visitors</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            placeholder="Number of visitors"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="variantB.conversions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conversions</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            placeholder="Number of conversions"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Calculate Results
              </Button>
            </form>
          </Form>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Results</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {result.isSignificant ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                        )}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {result.isSignificant
                            ? "Statistically Significant"
                            : "Not Statistically Significant"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Control Rate
                          </span>
                          <span className="font-medium">
                            {result.variantA.conversionRate.toFixed(2)}%
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          CI: [{result.variantA.confidenceInterval[0].toFixed(2)}%,{" "}
                          {result.variantA.confidenceInterval[1].toFixed(2)}%]
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Variation Rate
                          </span>
                          <span className="font-medium">
                            {result.variantB.conversionRate.toFixed(2)}%
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          CI: [{result.variantB.confidenceInterval[0].toFixed(2)}%,{" "}
                          {result.variantB.confidenceInterval[1].toFixed(2)}%]
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">
                        Relative Improvement
                      </span>
                      <span
                        className={`font-medium ${
                          result.relativeImprovement > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {result.relativeImprovement > 0 ? "+" : ""}
                        {result.relativeImprovement.toFixed(2)}%
                      </span>
                    </div>
                    <Progress
                      value={50 + result.relativeImprovement / 2}
                      className="h-2"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Statistical Significance
                    </span>
                    <span className="font-medium">
                      {(100 * (1 - result.pValue)).toFixed(2)}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Minimum Sample Size Needed
                    </span>
                    <span className="font-medium">
                      {result.minimumSampleSize.toLocaleString()} visitors
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
