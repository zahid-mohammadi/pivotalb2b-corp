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
    <section className="py-24 bg-gradient-to-b from-white to-slate-50/80 relative">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 to-transparent opacity-50" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Client Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how we've helped businesses across industries transform their B2B marketing strategies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6">
                    <Quote className="h-8 w-8 text-primary/10" />
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="shrink-0">
                      <Avatar className="h-12 w-12 border-2 border-primary/10">
                        {testimonial.avatar ? (
                          <img src={testimonial.avatar} alt={testimonial.clientName} />
                        ) : (
                          <AvatarFallback className="bg-primary/5 text-primary">
                            {testimonial.clientName
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-1">
                        {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>

                      <p className="text-muted-foreground italic mb-6">{testimonial.content}</p>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{testimonial.clientName}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="h-4 w-4" />
                          <span>{testimonial.company}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}