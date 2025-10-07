import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, X, Loader2, Sparkles, Zap, ArrowRight, Target, Users, TrendingUp, Calendar, ShieldCheck, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { user, logoutMutation } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location === '/' && window.location.hash === '#marketing-channels') {
      setTimeout(() => {
        const element = document.getElementById('marketing-channels');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const scrollToMarketingChannels = () => {
    if (location === '/') {
      const element = document.getElementById('marketing-channels');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = '/#marketing-channels';
    }
  };

  const NavItems = ({ className, isMobile = false }: { className?: string; isMobile?: boolean }) => (
    <div className={cn("flex", isMobile ? "flex-col space-y-4" : "items-center space-x-6", className)}>
      <Link href="/">
        <motion.span 
          className="text-sm font-medium hover:text-primary cursor-pointer transition-colors duration-200 relative group"
          whileHover={{ y: -2 }}
        >
          Home
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 group-hover:w-full transition-all duration-300" />
        </motion.span>
      </Link>

      {/* Solutions Dropdown/List */}
      {isMobile ? (
        <div className="space-y-3">
          <div className="space-y-3">
            <p className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Services</p>
            <div className="pl-4 space-y-3">
              <Link href="/services/account-based-marketing-abm-programs">
                <span className="text-sm text-muted-foreground hover:text-primary block transition-all duration-200 hover:translate-x-1">Account-Based Marketing (ABM)</span>
              </Link>
              <Link href="/services/b2b-lead-generation-qualification">
                <span className="text-sm text-muted-foreground hover:text-primary block transition-all duration-200 hover:translate-x-1">B2B Lead Generation</span>
              </Link>
              <Link href="/services/lead-nurturing-buyer-engagement">
                <span className="text-sm text-muted-foreground hover:text-primary block transition-all duration-200 hover:translate-x-1">Lead Nurturing & Engagement</span>
              </Link>
              <Link href="/services/precision-demand-generation">
                <span className="text-sm text-muted-foreground hover:text-primary block transition-all duration-200 hover:translate-x-1">Precision Demand Generation</span>
              </Link>
              <Link href="/services/event-marketing-audience-acquisition">
                <span className="text-sm text-muted-foreground hover:text-primary block transition-all duration-200 hover:translate-x-1">Event Marketing</span>
              </Link>
              <Link href="/services/lead-validation-enrichment">
                <span className="text-sm text-muted-foreground hover:text-primary block transition-all duration-200 hover:translate-x-1">Lead Validation</span>
              </Link>
            </div>
          </div>
          <span 
            className="text-sm font-medium hover:text-primary cursor-pointer transition-colors duration-200" 
            onClick={scrollToMarketingChannels}
          >
            Marketing Channels
          </span>
        </div>
      ) : (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-medium">Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <motion.ul 
                  className="grid w-[850px] gap-3 p-6 grid-cols-3 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <li className="relative">
                    <Link href="/services/account-based-marketing-abm-programs" className="block p-4 hover:bg-gradient-to-br hover:from-primary/10 hover:to-purple-500/10 rounded-xl cursor-pointer transition-all duration-300 group border border-transparent hover:border-primary/20 hover:shadow-lg">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 group-hover:scale-110 transition-transform duration-300 shadow-md">
                            <Target className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">Account-Based Marketing</div>
                            <p className="text-xs text-muted-foreground leading-relaxed">Engage entire buying committees</p>
                          </div>
                        </div>
                    </Link>
                  </li>
                  <li className="relative">
                    <Link href="/services/b2b-lead-generation-qualification" className="block p-4 hover:bg-gradient-to-br hover:from-primary/10 hover:to-purple-500/10 rounded-xl cursor-pointer transition-all duration-300 group border border-transparent hover:border-primary/20 hover:shadow-lg">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 group-hover:scale-110 transition-transform duration-300 shadow-md">
                            <Users className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">B2B Lead Generation</div>
                            <p className="text-xs text-muted-foreground leading-relaxed">High-quality qualified leads</p>
                          </div>
                        </div>
                    </Link>
                  </li>
                  <li className="relative">
                    <Link href="/services/lead-nurturing-buyer-engagement" className="block p-4 hover:bg-gradient-to-br hover:from-primary/10 hover:to-purple-500/10 rounded-xl cursor-pointer transition-all duration-300 group border border-transparent hover:border-primary/20 hover:shadow-lg">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 group-hover:scale-110 transition-transform duration-300 shadow-md">
                            <Sparkles className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">Lead Nurturing</div>
                            <p className="text-xs text-muted-foreground leading-relaxed">Multi-touch buyer engagement</p>
                          </div>
                        </div>
                    </Link>
                  </li>
                  <li className="relative">
                    <Link href="/services/precision-demand-generation" className="block p-4 hover:bg-gradient-to-br hover:from-primary/10 hover:to-purple-500/10 rounded-xl cursor-pointer transition-all duration-300 group border border-transparent hover:border-primary/20 hover:shadow-lg">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 group-hover:scale-110 transition-transform duration-300 shadow-md">
                            <TrendingUp className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">Demand Generation</div>
                            <p className="text-xs text-muted-foreground leading-relaxed">Precision-targeted campaigns</p>
                          </div>
                        </div>
                    </Link>
                  </li>
                  <li className="relative">
                    <Link href="/services/event-marketing-audience-acquisition" className="block p-4 hover:bg-gradient-to-br hover:from-primary/10 hover:to-purple-500/10 rounded-xl cursor-pointer transition-all duration-300 group border border-transparent hover:border-primary/20 hover:shadow-lg">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 group-hover:scale-110 transition-transform duration-300 shadow-md">
                            <Calendar className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">Event Marketing</div>
                            <p className="text-xs text-muted-foreground leading-relaxed">ICP-matched attendees</p>
                          </div>
                        </div>
                    </Link>
                  </li>
                  <li className="relative">
                    <Link href="/services/lead-validation-enrichment" className="block p-4 hover:bg-gradient-to-br hover:from-primary/10 hover:to-purple-500/10 rounded-xl cursor-pointer transition-all duration-300 group border border-transparent hover:border-primary/20 hover:shadow-lg">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 group-hover:scale-110 transition-transform duration-300 shadow-md">
                            <ShieldCheck className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">Lead Validation</div>
                            <p className="text-xs text-muted-foreground leading-relaxed">Clean and verify leads</p>
                          </div>
                        </div>
                    </Link>
                  </li>
                </motion.ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), "cursor-pointer font-medium hover:text-primary transition-colors")}
                onClick={scrollToMarketingChannels}
              >
                Marketing Channels
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), "font-medium hover:text-primary transition-colors")}
                href="/b2b-audience"
                asChild={false}
              >
                B2B Audience
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}

      {/* Resources Dropdown/List */}
      {isMobile ? (
        <div className="space-y-3">
          <p className="text-sm font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Resources</p>
          <div className="pl-4 space-y-3">
            <Link href="/blog">
              <span className="text-sm text-muted-foreground hover:text-primary block transition-all duration-200 hover:translate-x-1">Blog</span>
            </Link>
          </div>
        </div>
      ) : (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-medium">Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <motion.ul 
                  className="grid w-[420px] gap-3 p-6 grid-cols-1 bg-background/95 backdrop-blur-xl border rounded-2xl shadow-2xl overflow-hidden relative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
                  <li className="relative">
                    <Link href="/blog" className="block p-4 hover:bg-gradient-to-br hover:from-primary/10 hover:to-purple-500/10 rounded-xl cursor-pointer transition-all duration-300 group border border-transparent hover:border-primary/20 hover:shadow-lg">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 group-hover:scale-110 transition-transform duration-300 shadow-md">
                          <BookOpen className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">Blog</div>
                          <p className="text-xs text-muted-foreground leading-relaxed">Latest insights and industry trends</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                </motion.ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}

      <Link href="/contact">
        <motion.span 
          className="text-sm font-medium hover:text-primary cursor-pointer transition-colors duration-200 relative group"
          whileHover={{ y: -2 }}
        >
          Contact
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 group-hover:w-full transition-all duration-300" />
        </motion.span>
      </Link>
    </div>
  );

  return (
    <motion.header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white dark:bg-gray-950",
        isScrolled 
          ? "border-b border-gray-200 dark:border-gray-800 shadow-lg" 
          : "border-b border-gray-100 dark:border-gray-900 shadow-sm"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between relative z-10 max-w-7xl">
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link href="/">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <img src="/logo.png" alt="Pivotal B2B" className="h-10 cursor-pointer transition-all duration-300 group-hover:drop-shadow-lg" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <NavItems />
        </div>

        {/* CTA & Actions */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block"
          >
            <Link href="/request-proposal">
              <Button 
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 font-semibold group"
                data-testid="button-get-started"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <ThemeSwitcher />

          {/* User Menu for Authenticated Users */}
          {user && (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium">
                    {user.username}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-2 p-3 bg-background/95 backdrop-blur-xl border rounded-xl shadow-xl">
                      <li>
                        <Link href="/dashboard" className="block p-3 hover:bg-accent rounded-lg transition-colors text-sm font-medium">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => logoutMutation.mutate()}
                          disabled={logoutMutation.isPending}
                          className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                        >
                          {logoutMutation.isPending ? (
                            <span className="flex items-center">
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Logging out...
                            </span>
                          ) : (
                            'Logout'
                          )}
                        </button>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity" />
                <Menu className="h-5 w-5 relative z-10" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] bg-background/95 backdrop-blur-2xl border-l-2 border-primary/20 shadow-2xl overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col space-y-8 mt-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 -z-10" />
                
                {/* Mobile Logo */}
                <div className="flex items-center gap-3 pb-6 border-b border-primary/20">
                  <img src="/logo.png" alt="Pivotal B2B" className="h-8" />
                </div>

                <NavItems isMobile />
                
                {/* Mobile CTA */}
                <Link href="/request-proposal" className="mt-4">
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 text-white shadow-lg shadow-primary/25 font-semibold group"
                    data-testid="button-mobile-get-started"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                {/* Mobile User Menu */}
                {user && (
                  <div className="pt-6 border-t border-primary/20 space-y-3">
                    <Link href="/dashboard">
                      <span className="text-sm font-medium hover:text-primary block transition-colors">Dashboard</span>
                    </Link>
                    <button
                      onClick={() => logoutMutation.mutate()}
                      disabled={logoutMutation.isPending}
                      className="text-sm font-medium hover:text-primary transition-colors disabled:opacity-50 text-left w-full"
                    >
                      {logoutMutation.isPending ? (
                        <span className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Logging out...
                        </span>
                      ) : (
                        'Logout'
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
