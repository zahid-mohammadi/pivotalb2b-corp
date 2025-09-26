import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone, ArrowRight, Target, Users, TrendingUp, Calendar, ShieldCheck, MessageSquare } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSI+PGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjEiLz48L2c+PC9nPjwvc3ZnPg==')] bg-repeat"></div>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
      
      <div className="relative container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          
          {/* Company Info - Spans 2 columns on larger screens */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img src="/logo.png" alt="Pivotal B2B" className="h-12 mb-4" />
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Transform your B2B marketing with data-driven strategies, targeted campaigns, and measurable results. 
                We generate high-quality leads that convert.
              </p>
            </div>
            
            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
              <h4 className="text-primary font-semibold mb-2">Ready to Scale Your Pipeline?</h4>
              <p className="text-slate-300 text-sm mb-3">Get a custom proposal tailored to your business needs.</p>
              <Link href="/request-proposal">
                <Button className="bg-primary hover:bg-primary/90 text-white text-sm group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white flex items-center">
              <Target className="mr-2 h-5 w-5 text-primary" />
              Services
            </h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li>
                <Link href="/services/account-based-marketing" className="hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="mr-2 h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  ABM Programs
                </Link>
              </li>
              <li>
                <Link href="/services/b2b-lead-generation-qualification" className="hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="mr-2 h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Lead Generation
                </Link>
              </li>
              <li>
                <Link href="/services/intent-based-lead-generation" className="hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="mr-2 h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Intent-Based Marketing
                </Link>
              </li>
              <li>
                <Link href="/services/event-marketing-solutions" className="hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="mr-2 h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Event Marketing
                </Link>
              </li>
              <li>
                <Link href="/services/lead-validation-enrichment" className="hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="mr-2 h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Lead Validation
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              Resources
            </h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="mr-2 h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/b2b-audience" className="hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="mr-2 h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  B2B Audience
                </Link>
              </li>
              <li>
                <Link href="/media-kit" className="hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="mr-2 h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Media Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Company
            </h3>
            <ul className="space-y-3 text-slate-300 text-sm">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="mr-2 h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="mr-2 h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="mr-2 h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-white transition-colors duration-200 flex items-center group">
                  <ArrowRight className="mr-2 h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Newsletter */}
          <div>
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

        {/* Bottom Section */}
        <div className="border-t border-slate-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 text-slate-400 text-sm">
              <p>&copy; {new Date().getFullYear()} Pivotal B2B. All rights reserved.</p>
              <div className="hidden md:flex items-center gap-2 text-xs">
                <ShieldCheck className="h-3 w-3 text-primary" />
                <span>SOC 2 Compliant</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <MapPin className="h-3 w-3 text-primary" />
              <span>Delaware, USA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}