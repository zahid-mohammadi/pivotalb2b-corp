import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Info, AlertCircle } from "lucide-react";

interface MarketingTooltipProps {
  children: React.ReactNode;
  metric: {
    title: string;
    value: string | number;
    trend?: {
      value: number;
      direction: "up" | "down";
      timeframe: string;
    };
    insights?: string[];
    recommendation?: string;
  };
}

export function MarketingTooltip({ children, metric }: MarketingTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div className="cursor-help">{children}</div>
        </TooltipTrigger>
        <TooltipContent 
          className="bg-white p-4 rounded-xl shadow-xl border border-slate-200 w-80 animate-in fade-in-0 zoom-in-95"
          sideOffset={5}
        >
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-900">{metric.title}</h4>
                  <div className="px-2 py-1 bg-slate-100 rounded text-sm font-medium">
                    {metric.value}
                  </div>
                </div>

                {metric.trend && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className={`flex items-center gap-1 ${
                      metric.trend.direction === "up" ? "text-emerald-600" : "text-red-600"
                    }`}>
                      <TrendingUp className={`h-4 w-4 ${
                        metric.trend.direction === "down" && "transform rotate-180"
                      }`} />
                      <span>{Math.abs(metric.trend.value)}%</span>
                    </div>
                    <span className="text-slate-500">vs {metric.trend.timeframe}</span>
                  </div>
                )}

                {metric.insights && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                      <Info className="h-4 w-4 text-primary" />
                      Key Insights
                    </div>
                    <ul className="space-y-1">
                      {metric.insights.map((insight, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="text-sm text-slate-600 flex items-start gap-2"
                        >
                          <span className="block w-1 h-1 mt-1.5 rounded-full bg-primary flex-shrink-0" />
                          {insight}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {metric.recommendation && (
                  <div className="flex items-start gap-2 bg-primary/5 p-2 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-primary/90">{metric.recommendation}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
