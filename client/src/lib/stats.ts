import { z } from "zod";

export const experimentDataSchema = z.object({
  variantA: z.object({
    visitors: z.number().min(1),
    conversions: z.number().min(0),
  }),
  variantB: z.object({
    visitors: z.number().min(1),
    conversions: z.number().min(0),
  }),
});

export type ExperimentData = z.infer<typeof experimentDataSchema>;

export function calculateConversionRate(conversions: number, visitors: number): number {
  return (conversions / visitors) * 100;
}

export function calculateStandardError(conversionRate: number, visitors: number): number {
  const p = conversionRate / 100;
  return Math.sqrt((p * (1 - p)) / visitors);
}

export function calculateZScore(
  convRateA: number,
  convRateB: number,
  seA: number,
  seB: number
): number {
  return Math.abs(convRateB - convRateA) / Math.sqrt(Math.pow(seA, 2) + Math.pow(seB, 2));
}

export function calculatePValue(zScore: number): number {
  // Using normal approximation
  function erf(x: number): number {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
  }

  return 1 - (1 + erf(zScore / Math.sqrt(2))) / 2;
}

export function calculateConfidenceInterval(
  conversionRate: number,
  standardError: number,
  confidence = 0.95
): [number, number] {
  const zScore = 1.96; // 95% confidence level
  const margin = zScore * standardError;
  return [conversionRate - margin, conversionRate + margin];
}

export function calculateRelativeImprovement(
  baselineRate: number,
  variantRate: number
): number {
  return ((variantRate - baselineRate) / baselineRate) * 100;
}

export interface StatisticalResult {
  variantA: {
    conversionRate: number;
    confidenceInterval: [number, number];
  };
  variantB: {
    conversionRate: number;
    confidenceInterval: [number, number];
  };
  pValue: number;
  isSignificant: boolean;
  relativeImprovement: number;
  minimumSampleSize: number;
}

export function analyzeExperiment(data: ExperimentData): StatisticalResult {
  const convRateA = calculateConversionRate(data.variantA.conversions, data.variantA.visitors);
  const convRateB = calculateConversionRate(data.variantB.conversions, data.variantB.visitors);

  const seA = calculateStandardError(convRateA, data.variantA.visitors);
  const seB = calculateStandardError(convRateB, data.variantB.visitors);

  const zScore = calculateZScore(convRateA, convRateB, seA, seB);
  const pValue = calculatePValue(zScore);

  const ciA = calculateConfidenceInterval(convRateA, seA);
  const ciB = calculateConfidenceInterval(convRateB, seB);

  // Calculate minimum sample size needed for 80% power at 95% confidence
  const effect = Math.abs(convRateB - convRateA) / 100;
  const pooledP = (data.variantA.conversions + data.variantB.conversions) / 
                 (data.variantA.visitors + data.variantB.visitors);
  const minimumSampleSize = Math.ceil(
    16 * pooledP * (1 - pooledP) / Math.pow(effect, 2)
  );

  return {
    variantA: {
      conversionRate: convRateA,
      confidenceInterval: ciA,
    },
    variantB: {
      conversionRate: convRateB,
      confidenceInterval: ciB,
    },
    pValue,
    isSignificant: pValue < 0.05,
    relativeImprovement: calculateRelativeImprovement(convRateA, convRateB),
    minimumSampleSize,
  };
}
