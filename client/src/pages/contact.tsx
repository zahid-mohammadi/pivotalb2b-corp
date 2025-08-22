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
import { MailIcon, PhoneIcon, Building2Icon, Clock4Icon, ArrowRight, MapPinIcon, GlobeIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MetaTags } from "@/components/ui/meta-tags";
import { Link } from "wouter";
import { motion } from "framer-motion";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
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
    try {
      const res = await apiRequest("POST", "/api/contact", data);

      if (!res.ok) {
        throw new Error("Failed to submit contact form");
      }

      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      <MetaTags
        title="Contact Pivotal B2B - Get in Touch with Our Marketing Experts"
        description="Contact Pivotal B2B's global offices in USA and Oman for expert B2B marketing solutions and lead generation services. Our international team is ready to help transform your marketing strategy and drive business growth."
        keywords="contact B2B marketing agency, marketing consultation, lead generation services, business growth strategy, marketing expertise, B2B solutions"
      />
      <PageBanner
        title="Contact Us"
        description="Get in touch with our team to learn how we can help transform your B2B marketing strategy."
        pattern="grid"
      />

      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
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
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={5} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Send Message</Button>
              </form>
            </Form>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            
            {/* General Contact Info */}
            <div className="space-y-4 mb-8">
              <Card className="p-6">
                <div className="flex gap-4">
                  <MailIcon className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">contact@pivotal-b2b.com</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex gap-4">
                  <Clock4Icon className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday<br />
                      9:00 AM - 5:00 PM EST
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <GlobeIcon className="h-5 w-5 text-primary" />
              Our Global Offices
            </h3>
            
            <div className="space-y-4">
              {/* USA Office */}
              <Card className="p-6 border-l-4 border-l-primary">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPinIcon className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold text-lg">United States</h4>
                  </div>
                  <div className="ml-8">
                    <p className="font-medium text-foreground">Pivotal B2B</p>
                    <p className="text-muted-foreground">
                      16192 Coastal Highway<br />
                      Lewes, Delaware 19958<br />
                      USA
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <PhoneIcon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">+1 417-900-3844</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Oman Office */}
              <Card className="p-6 border-l-4 border-l-secondary">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPinIcon className="h-5 w-5 text-secondary" />
                    <h4 className="font-semibold text-lg">Oman</h4>
                  </div>
                  <div className="ml-8">
                    <p className="font-medium text-foreground">Pivotal Business International SPC</p>
                    <p className="text-muted-foreground">
                      Way 2403, 191<br />
                      Muscat, Oman 114
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <PhoneIcon className="h-4 w-4 text-secondary" />
                      <span className="text-sm font-medium">+968 77523663</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <section className="bg-primary/5 py-20 mt-10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Looking for a comprehensive marketing strategy?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              If you're interested in a detailed marketing proposal tailored to your business, let's start with a formal project discussion.
            </p>
            <Link href="/request-proposal">
              <Button size="lg" className="group">
                Request a Proposal
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}