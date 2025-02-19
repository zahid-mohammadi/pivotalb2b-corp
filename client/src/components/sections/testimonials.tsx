import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, Star, Building2, Quote } from "lucide-react";
import type { Testimonial } from "@shared/schema";
import { motion } from "framer-motion";

export function Testimonials() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!testimonials?.length) {
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-br from-white via-slate-50/80 to-white relative">
      {/* Magazine-style background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[length:20px_20px]" />
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Voice of Our Clients</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from industry leaders who've transformed their lead generation with our solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* First row with 3 testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6"
          >
            <TestimonialCard testimonial={testimonials[0]} featured />
          </motion.div>
          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <TestimonialCard testimonial={testimonials[1]} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TestimonialCard testimonial={testimonials[2]} />
            </motion.div>
          </div>

          {/* Second row with 2 testimonials */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <TestimonialCard testimonial={testimonials[3]} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <TestimonialCard testimonial={testimonials[4]} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, featured = false }: { testimonial: Testimonial, featured?: boolean }) {
  return (
    <Card className={`h-full overflow-hidden ${
      featured ? 'bg-primary text-primary-foreground' : 'bg-white'
    }`}>
      <CardContent className="p-8 relative h-full">
        {/* Large quote mark */}
        <div className="absolute -top-2 -left-2 text-8xl font-serif opacity-10">
          "
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${
                  featured 
                    ? 'fill-primary-foreground text-primary-foreground' 
                    : 'fill-primary text-primary'
                }`} 
              />
            ))}
          </div>

          <blockquote className={`text-xl font-medium mb-6 ${
            featured ? 'text-primary-foreground/90' : 'text-foreground'
          }`}>
            "{testimonial.content}"
          </blockquote>

          <div className="flex items-center gap-4">
            <Avatar className={`h-12 w-12 border-2 ${
              featured ? 'border-primary-foreground/10' : 'border-primary/10'
            }`}>
              <AvatarFallback className={
                featured ? 'bg-primary-foreground/10 text-primary-foreground' : 'bg-primary/5 text-primary'
              }>
                {testimonial.clientName
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className={`font-semibold ${
                featured ? 'text-primary-foreground' : 'text-foreground'
              }`}>
                {testimonial.clientName}
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className={
                  featured ? 'text-primary-foreground/80' : 'text-muted-foreground'
                }>
                  {testimonial.role}
                </span>
                <span className={
                  featured ? 'text-primary-foreground/60' : 'text-muted-foreground/60'
                }>•</span>
                <span className={
                  featured ? 'text-primary-foreground/80' : 'text-muted-foreground'
                }>
                  {testimonial.company}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}