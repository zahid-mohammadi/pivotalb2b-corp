import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { PageBanner } from "@/components/ui/page-banner";
import { MailIcon, PhoneIcon, Building2Icon, Clock4Icon, ArrowRight, MapPinIcon, GlobeIcon, MessageCircle, Send, Sparkles, CheckCircle2, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MetaTags } from "@/components/ui/meta-tags";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true);
    try {
      const res = await apiRequest("POST", "/api/contact", data);

      if (!res.ok) {
        throw new Error("Failed to submit contact form");
      }

      setIsSubmitted(true);
      toast({
        title: "Message Sent Successfully! 🎉",
        description: "Thank you for reaching out. We'll respond within 24 hours.",
      });
      form.reset();
      
      // Reset submitted state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong",
        description: error.message || "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <MetaTags
        title="Contact Pivotal B2B - Get in Touch with Our Marketing Experts"
        description="Contact Pivotal B2B's global offices in USA and Oman for expert B2B marketing solutions and lead generation services. Our international team is ready to help transform your marketing strategy and drive business growth."
        keywords="contact B2B marketing agency, marketing consultation, lead generation services, business growth strategy, marketing expertise, B2B solutions"
      />
      
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        />
      </div>

      {/* Enhanced Hero Section */}
      <section className="relative z-10 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 border border-blue-200 backdrop-blur-sm">
                <MessageCircle className="mr-2 h-4 w-4" />
                Let's Start a Conversation
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight"
            >
              Get in Touch with Our{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Marketing Experts
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              Ready to transform your B2B marketing strategy? Our team is here to help you accelerate growth and dominate your market.
            </motion.p>
            
            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-8"
            >
              {[
                { icon: <CheckCircle2 className="h-5 w-5 text-green-500" />, text: "Free Consultation" },
                { icon: <Star className="h-5 w-5 text-yellow-500" />, text: "Expert Team" },
                { icon: <Sparkles className="h-5 w-5 text-purple-500" />, text: "24h Response" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-2 text-slate-600"
                >
                  {item.icon}
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Enhanced Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Card className="backdrop-blur-sm bg-white/80 border border-white/20 shadow-2xl p-6 sm:p-8">
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Send className="h-8 w-8 text-blue-600" />
                    </motion.div>
                    Send Us a Message
                  </h2>
                  <p className="text-slate-600">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">Full Name *</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Enter your full name"
                              className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                              data-testid="input-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">Email Address *</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email" 
                              placeholder="your.email@company.com"
                              className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">Subject *</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="What can we help you with?"
                              className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                              data-testid="input-subject"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 font-medium">Message *</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              rows={5} 
                              placeholder="Tell us about your goals, challenges, and how we can help..."
                              className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 resize-none"
                              data-testid="input-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        size="lg"
                        disabled={isSubmitting || isSubmitted}
                        className={`w-full h-14 text-lg font-semibold transition-all duration-300 ${
                          isSubmitted 
                            ? 'bg-green-500 hover:bg-green-600 text-white' 
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                        }`}
                        data-testid="button-submit"
                      >
                        {isSubmitting ? (
                          <motion.div 
                            className="flex items-center gap-3"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending Message...
                          </motion.div>
                        ) : isSubmitted ? (
                          <motion.div 
                            className="flex items-center gap-3"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          >
                            <CheckCircle2 className="h-5 w-5" />
                            Message Sent Successfully!
                          </motion.div>
                        ) : (
                          <motion.div className="flex items-center gap-3">
                            <Send className="h-5 w-5" />
                            Send Message
                          </motion.div>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </Card>
            </motion.div>

            {/* Enhanced Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="space-y-8"
            >
              {/* Quick Contact Info */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <MessageCircle className="h-8 w-8 text-purple-600" />
                  </motion.div>
                  Quick Contact
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    {
                      icon: <MailIcon className="h-6 w-6 text-blue-600" />,
                      title: "Email Us",
                      content: "contact@pivotal-b2b.com",
                      gradient: "from-blue-500/10 to-cyan-500/10",
                      borderColor: "border-blue-200"
                    },
                    {
                      icon: <Clock4Icon className="h-6 w-6 text-green-600" />,
                      title: "Business Hours",
                      content: "Monday - Friday\n9:00 AM - 5:00 PM EST",
                      gradient: "from-green-500/10 to-teal-500/10",
                      borderColor: "border-green-200"
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <Card className={`p-6 bg-gradient-to-br ${item.gradient} backdrop-blur-sm border ${item.borderColor} hover:shadow-lg transition-all duration-300`}>
                        <div className="flex items-start gap-4">
                          <motion.div
                            animate={{ rotate: [0, 5, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            {item.icon}
                          </motion.div>
                          <div>
                            <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                            <p className="text-slate-600 text-sm whitespace-pre-line">{item.content}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Global Offices */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <GlobeIcon className="h-6 w-6 text-indigo-600" />
                  </motion.div>
                  Our Global Offices
                </h3>
                
                <div className="space-y-6">
                  {[
                    {
                      country: "United States",
                      company: "Pivotal B2B",
                      address: "16192 Coastal Highway\nLewes, Delaware 19958\nUSA",
                      phone: "+1 417-900-3844",
                      gradient: "from-blue-500/10 to-purple-500/10",
                      borderColor: "border-l-blue-500",
                      iconColor: "text-blue-600",
                      phoneColor: "text-blue-600"
                    },
                    {
                      country: "Oman",
                      company: "Pivotal Business International SPC",
                      address: "Way 2403, 191\nMuscat, Oman 114",
                      phone: "+968 77523663",
                      gradient: "from-purple-500/10 to-pink-500/10",
                      borderColor: "border-l-purple-500",
                      iconColor: "text-purple-600",
                      phoneColor: "text-purple-600"
                    }
                  ].map((office, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6 + index * 0.2 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <Card className={`p-6 bg-gradient-to-br ${office.gradient} backdrop-blur-sm border-l-4 ${office.borderColor} hover:shadow-lg transition-all duration-300`}>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <MapPinIcon className={`h-5 w-5 ${office.iconColor}`} />
                            <h4 className="font-bold text-lg text-slate-900">{office.country}</h4>
                          </div>
                          <div className="ml-8 space-y-3">
                            <p className="font-semibold text-slate-900">{office.company}</p>
                            <p className="text-slate-600 text-sm whitespace-pre-line">{office.address}</p>
                            <div className="flex items-center gap-2">
                              <PhoneIcon className={`h-4 w-4 ${office.phoneColor}`} />
                              <span className={`text-sm font-medium ${office.phoneColor}`}>{office.phone}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Enhanced CTA Section */}
      <section className="relative z-10 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 py-16 lg:py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div 
            className="max-w-4xl mx-auto text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6"
              animate={{ 
                textShadow: ['0 0 0px rgba(255, 255, 255, 0.5)', '0 0 20px rgba(255, 255, 255, 0.8)', '0 0 0px rgba(255, 255, 255, 0.5)'] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Ready for a Comprehensive Marketing Strategy?
            </motion.h2>
            <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your B2B marketing with a detailed proposal tailored specifically to your business goals and challenges.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/request-proposal">
                <Button 
                  size="lg" 
                  className="group px-8 py-6 text-lg bg-white text-slate-900 hover:bg-white/90 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  data-testid="button-request-proposal"
                >
                  Request a Proposal
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}