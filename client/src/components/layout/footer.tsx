import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone, ArrowRight, Target, Users, TrendingUp, MessageSquare, ShieldCheck, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FooterSection {
  title: string;
  icon: any;
  links: { label: string; href: string }[];
}

export function Footer() {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleSection = (title: string) => {
    const newSections = new Set(openSections);
    if (newSections.has(title)) {
      newSections.delete(title);
    } else {
      newSections.add(title);
    }
    setOpenSections(newSections);
  };

  const sections: FooterSection[] = [
    {
      title: "Services",
      icon: Target,
      links: [
        { label: "ABM Programs", href: "/services/account-based-marketing-abm-programs" },
        { label: "Lead Generation", href: "/services/b2b-lead-generation-qualification" },
        { label: "Demand Generation", href: "/services/precision-demand-generation" },
        { label: "Event Marketing", href: "/services/event-marketing-audience-acquisition" },
        { label: "Lead Validation", href: "/services/lead-validation-enrichment" },
        { label: "Lead Nurturing", href: "/services/lead-nurturing-buyer-engagement" }
      ]
    },
    {
      title: "Resources",
      icon: TrendingUp,
      links: [
        { label: "Blog & Insights", href: "/blog" },
        { label: "Ebooks & Guides", href: "/ebooks" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "B2B Audience Data", href: "/b2b-audience" },
        { label: "Professional Media Kit", href: "/media-kit" }
      ]
    },
    {
      title: "Company",
      icon: Users,
      links: [
        { label: "About Pivotal B2B", href: "/about" },
        { label: "Contact & Support", href: "/contact" },
        { label: "Get Custom Proposal", href: "/request-proposal" }
      ]
    }
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] bg-repeat"></div>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Company Info - Mobile: Full width, Desktop: 4 cols */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <img src="/logo.png" alt="Pivotal B2B" className="h-10 sm:h-12 mb-4" />
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                Transform your B2B marketing with data-driven strategies, targeted campaigns, and measurable results.
              </p>
            </div>
            
            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-4 sm:p-5 mb-6 backdrop-blur-sm">
              <h4 className="text-primary font-semibold mb-2 text-base sm:text-lg">Ready to Scale Your Pipeline?</h4>
              <p className="text-slate-300 text-sm mb-4">Get a custom proposal tailored to your business needs.</p>
              <Link href="/request-proposal">
                <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white text-sm group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Mobile: Social & Contact */}
            <div className="lg:hidden space-y-6">
              {/* Contact Info */}
              <div>
                <h4 className="font-semibold text-white mb-3 text-base">Contact Us</h4>
                <div className="space-y-2">
                  <a href="tel:+14179003844" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm">
                    <Phone size={16} className="text-primary" />
                    +1 417-900-3844
                  </a>
                  <a href="mailto:contact@pivotal-b2b.com" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm">
                    <Mail size={16} className="text-primary" />
                    contact@pivotal-b2b.com
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-semibold text-white mb-3 text-base">Follow Us</h4>
                <div className="flex gap-3">
                  <a 
                    href="https://www.linkedin.com/company/pivotal-b2b-marketing" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                    aria-label="Visit Pivotal B2B on LinkedIn"
                  >
                    <Linkedin className="h-4 w-4 text-slate-400 group-hover:text-white" />
                  </a>
                  <a 
                    href="https://www.facebook.com/Pivotalb2b/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                    aria-label="Visit Pivotal B2B on Facebook"
                  >
                    <Facebook className="h-4 w-4 text-slate-400 group-hover:text-white" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-slate-800 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                    aria-label="Visit Pivotal B2B on Twitter"
                  >
                    <Twitter className="h-4 w-4 text-slate-400 group-hover:text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Links Sections - Mobile: Accordion, Desktop: Grid */}
          <div className="lg:col-span-5">
            {/* Mobile Accordion View */}
            <div className="lg:hidden space-y-3">
              {sections.map((section) => (
                <div key={section.title} className="border-b border-slate-800/50">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between py-4 text-left group"
                    aria-expanded={openSections.has(section.title)}
                  >
                    <div className="flex items-center">
                      <section.icon className="mr-3 h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-white text-base">{section.title}</h3>
                    </div>
                    <ChevronDown 
                      className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
                        openSections.has(section.title) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <AnimatePresence>
                    {openSections.has(section.title) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="space-y-3 pb-4 pl-8">
                          {section.links.map((link) => (
                            <li key={link.href}>
                              <Link href={link.href} className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group text-sm">
                                <ArrowRight className="mr-2 h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Desktop Grid View */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <h3 className="font-bold text-lg mb-4 text-white flex items-center">
                    <section.icon className="mr-2 h-5 w-5 text-primary" />
                    {section.title}
                  </h3>
                  <ul className="space-y-3 text-slate-300 text-sm">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="hover:text-white transition-colors duration-200 flex items-center group">
                          <ArrowRight className="mr-2 h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Connect & Newsletter - Desktop only */}
          <div className="hidden lg:block lg:col-span-3">
            <h3 className="font-bold text-lg mb-4 text-white flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-primary" />
              Connect
            </h3>
            
            {/* Contact Info */}
            <div className="mb-6">
              <ul className="space-y-3 text-slate-300 text-sm">
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-primary" />
                  <a href="tel:+14179003844" className="hover:text-white transition-colors">
                    +1 417-900-3844
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-primary" />
                  <a href="mailto:contact@pivotal-b2b.com" className="hover:text-white transition-colors">
                    contact@pivotal-b2b.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="mb-6">
              <p className="text-sm text-slate-400 mb-3">Follow Us</p>
              <div className="flex gap-3">
                <a 
                  href="https://www.linkedin.com/company/pivotal-b2b-marketing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                  aria-label="Visit Pivotal B2B on LinkedIn"
                >
                  <Linkedin className="h-4 w-4 text-slate-400 group-hover:text-white" />
                </a>
                <a 
                  href="https://www.facebook.com/Pivotalb2b/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                  aria-label="Visit Pivotal B2B on Facebook"
                >
                  <Facebook className="h-4 w-4 text-slate-400 group-hover:text-white" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-slate-800 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                  aria-label="Visit Pivotal B2B on Twitter"
                >
                  <Twitter className="h-4 w-4 text-slate-400 group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-sm text-slate-400 mb-3">Stay Updated</p>
              <form className="space-y-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email"
                  className="bg-slate-800/50 border-slate-700 focus:ring-primary focus:border-primary text-white placeholder-slate-400 text-sm"
                  aria-label="Newsletter email input"
                />
                <Button className="w-full bg-primary hover:bg-primary/90 text-white text-sm">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Newsletter Section - Mobile Only */}
        <div className="lg:hidden mb-12 bg-slate-800/30 border border-slate-700/50 rounded-xl p-5">
          <h4 className="font-semibold text-white mb-2 text-base flex items-center">
            <Mail className="mr-2 h-5 w-5 text-primary" />
            Stay Updated
          </h4>
          <p className="text-slate-400 text-sm mb-4">Subscribe to our newsletter for insights and updates</p>
          <form className="space-y-3">
            <Input 
              type="email" 
              placeholder="Enter your email"
              className="bg-slate-800/50 border-slate-700 focus:ring-primary focus:border-primary text-white placeholder-slate-400"
              aria-label="Newsletter email input"
            />
            <Button className="w-full bg-primary hover:bg-primary/90 text-white">
              Subscribe
            </Button>
          </form>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800/50 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-slate-400 text-xs sm:text-sm">
              <p>&copy; {new Date().getFullYear()} Pivotal B2B. All rights reserved.</p>
              <div className="flex items-center gap-2 text-xs">
                <ShieldCheck className="h-3 w-3 text-primary" />
                <span>SOC 2 Compliant</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-slate-400 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-primary" />
                <span>Delaware, USA</span>
              </div>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/cookie-policy" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
