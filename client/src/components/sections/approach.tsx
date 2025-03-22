import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { ResearchStrategyIcon } from "@/components/animated-icons/research-strategy";
import { ContentEngagementIcon } from "@/components/animated-icons/content-engagement";
import { ScaleGrowthIcon } from "@/components/animated-icons/scale-growth";

export function Approach() {
  const steps = [
    {
      icon: ResearchStrategyIcon,
      title: "Strategic Targeting",
      description: "Leverage advanced data analytics, technographic insights, and intent signals to identify and profile your ideal customer segments.",
      gradient: "from-blue-500/20 via-indigo-500/20 to-violet-500/20",
      highlightColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: ContentEngagementIcon,
      title: "Engagement Optimization",
      description: "Deploy personalized, multi-channel campaigns that resonate with decision-makers, driving meaningful interactions and nurturing prospects through the funnel.",
      gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
      highlightColor: "text-violet-600 dark:text-violet-400",
    },
    {
      icon: ScaleGrowthIcon,
      title: "Pipeline Acceleration",
      description: "Convert prospects into sales-ready leads with BANT qualification, nurture workflows, and seamless integration with your sales team.",
      gradient: "from-fuchsia-500/20 via-pink-500/20 to-rose-500/20",
      highlightColor: "text-fuchsia-600 dark:text-fuchsia-400",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(100,100,100,0.05)_40%,transparent_100%)] dark:bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.05)_40%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]" />
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-transparent bg-clip-text">
            Our Approach to Building Winning Sales Pipelines
          </h2>
          <p className="text-xl text-muted-foreground">
            We don't just generate leads—we build sales pipelines that convert. Through strategic targeting, multi-channel engagement, 
            and proven conversion methodologies, we deliver qualified opportunities that align with your business goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Lines (Only visible on desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              {/* Step Number with enhanced design */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-primary font-semibold border border-primary/20 z-10">
                {index + 1}
              </div>

              <Card className="group h-full overflow-hidden backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-xl">
                <CardContent className="p-8 relative">
                  {/* Animated Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div 
                      className="mb-6 flex justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent p-4 flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110">
                        <step.icon />
                      </div>
                    </motion.div>

                    <h3 className={`text-xl font-semibold mb-4 text-center group-hover:${step.highlightColor} transition-colors duration-300`}>
                      {step.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed text-center">
                      {step.description}
                    </p>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-full transform rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute -top-12 -left-12 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-full transform -rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Results Section with enhanced visuals */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-bold mb-12 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-transparent bg-clip-text">
            Proven Results That Speak for Themselves
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "25%", label: "Pipeline Efficiency" },
              { value: "2.5x", label: "Lead Quality Improvement" },
              { value: "45%", label: "Cost per Lead Reduction" },
              { value: "99%", label: "Sales Acceptance Rate" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="relative p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                  <motion.p 
                    className="text-3xl font-bold text-primary mb-2"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}