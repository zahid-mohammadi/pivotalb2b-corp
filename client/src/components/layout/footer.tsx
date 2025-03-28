import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Pivotal B2B</h3>
            <p className="text-slate-300">
              Generate high-quality leads, empower your sales team, and build a thriving sales pipeline.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                16192 Coastal Highway Lewes, Delaware 19958 USA
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                +1 417-900-3844
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                contact@pivotal-b2b.com
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/company/pivotal-b2b-marketing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors duration-200"
                aria-label="Visit Pivotal B2B on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://www.facebook.com/Pivotalb2b/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors duration-200"
                aria-label="Visit Pivotal B2B on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="hover:text-blue-400 transition-colors duration-200"
                aria-label="Visit Pivotal B2B on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <form className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-700 focus:ring-primary"
                aria-label="Newsletter email input"
              />
              <Button className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-300">&copy; {new Date().getFullYear()} Pivotal B2B. All rights reserved.</p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              <Link href="/media-kit" className="hover:text-white transition-colors duration-200">
                Media Kit
              </Link>
              <Link href="/privacy-policy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="hover:text-white transition-colors duration-200">
                Terms & Conditions
              </Link>
              <Link href="/cookie-policy" className="hover:text-white transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}