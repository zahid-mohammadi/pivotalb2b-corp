import { cn } from "@/lib/utils";

interface PageBannerProps {
  title: string;
  description?: string;
  className?: string;
  pattern?: "dots" | "grid" | "none";
  children?: React.ReactNode;
}

export function PageBanner({
  title,
  description,
  className,
  pattern = "dots",
  children,
}: PageBannerProps) {
  return (
    <div className={cn(
      "relative bg-primary overflow-hidden",
      className
    )}>
      {/* Background Pattern */}
      {pattern === "dots" && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }} />
        </div>
      )}
      {pattern === "grid" && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(currentColor 1px, transparent 1px),
              linear-gradient(90deg, currentColor 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }} />
        </div>
      )}

      {/* Content - Reduced padding by 20% */}
      <div className="container mx-auto px-4 py-12 sm:py-20 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
    </div>
  );
}