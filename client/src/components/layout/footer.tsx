import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";

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
                123 Business Ave, Suite 100
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                contact@pivotalb2b.com
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-400">
                <Facebook />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Twitter />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Linkedin />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <form className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-700"
              />
              <Button className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-300">
          <p>&copy; {new Date().getFullYear()} Pivotal B2B. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
