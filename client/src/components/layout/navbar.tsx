import { Link } from "wouter";
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
import { Menu, X, Loader2, Sparkles, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { user, logoutMutation } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavItems = ({ className, isMobile = false }: { className?: string; isMobile?: boolean }) => (
    <div className={cn("flex", isMobile ? "flex-col space-y-4" : "items-center space-x-4", className)}>
      <Link href="/">
        <span className="text-sm hover:text-primary cursor-pointer">Home</span>
      </Link>

      {/* Solutions Dropdown/List */}
      {isMobile ? (
        <div className="space-y-2">
          <div className="space-y-2">
            <p className="text-sm font-medium">Services</p>
            <div className="pl-4 space-y-2">
              <Link href="/services/account-based-marketing-abm-programs">
                <span className="text-sm text-muted-foreground hover:text-primary block">Account-Based Marketing (ABM) Programs</span>
              </Link>
              <Link href="/services/b2b-lead-generation-qualification">
                <span className="text-sm text-muted-foreground hover:text-primary block">B2B Lead Generation & Qualification</span>
              </Link>
              <Link href="/services/lead-nurturing-buyer-engagement">
                <span className="text-sm text-muted-foreground hover:text-primary block">Lead Nurturing & Buyer Engagement</span>
              </Link>
              <Link href="/services/precision-demand-generation">
                <span className="text-sm text-muted-foreground hover:text-primary block">Precision Demand Generation</span>
              </Link>
              <Link href="/services/event-marketing-audience-acquisition">
                <span className="text-sm text-muted-foreground hover:text-primary block">Event Marketing & Audience Acquisition</span>
              </Link>
              <Link href="/services/lead-validation-enrichment">
                <span className="text-sm text-muted-foreground hover:text-primary block">Lead Validation & Enrichment</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[800px] gap-3 p-4 grid-cols-3 bg-background border rounded-lg shadow-lg">
                  <li>
                    <Link href="/services/account-based-marketing-abm-programs" className="block p-4 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer transition-colors duration-200 group">
                        <div className="flex items-center">
                          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                            <svg className="h-5 w-5 text-primary" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                              <path d="M3 6 8 3 13 6 18 3 21 5v13L18 16l-5 3-5-3-5 3V6"></path>
                              <line x1="13" x2="13" y1="6" y2="16"></line>
                              <line x1="8" x2="8" y1="3" y2="16"></line>
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Account-Based Marketing (ABM) Programs</div>
                            <p className="text-xs text-muted-foreground">Engage entire buying committees</p>
                          </div>
                        </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/b2b-lead-generation-qualification" className="block p-4 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer transition-colors duration-200 group">
                        <div className="flex items-center">
                          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                            <svg className="h-5 w-5 text-primary" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                              <circle cx="9" cy="7" r="4"></circle>
                              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium">B2B Lead Generation & Qualification</div>
                            <p className="text-xs text-muted-foreground">Sales-ready leads with BANT criteria</p>
                          </div>
                        </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/lead-nurturing-buyer-engagement" className="block p-4 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer transition-colors duration-200 group">
                        <div className="flex items-center">
                          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                            <svg className="h-5 w-5 text-primary" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                              <path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Lead Nurturing & Buyer Engagement</div>
                            <p className="text-xs text-muted-foreground">Transform cold leads into revenue</p>
                          </div>
                        </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/precision-demand-generation" className="block p-4 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer transition-colors duration-200 group">
                        <div className="flex items-center">
                          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                            <svg className="h-5 w-5 text-primary" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="17 8 12 3 7 8"></polyline>
                              <line x1="12" x2="12" y1="3" y2="15"></line>
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Precision Demand Generation</div>
                            <p className="text-xs text-muted-foreground">Position as trusted choice</p>
                          </div>
                        </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/event-marketing-audience-acquisition" className="block p-4 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer transition-colors duration-200 group">
                        <div className="flex items-center">
                          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                            <svg className="h-5 w-5 text-primary" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                              <path d="M8 12h8"></path>
                              <path d="M12 8v8"></path>
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Event Marketing & Audience Acquisition</div>
                            <p className="text-xs text-muted-foreground">Attract ICP-matched attendees</p>
                          </div>
                        </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/lead-validation-enrichment" className="block p-4 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer transition-colors duration-200 group">
                        <div className="flex items-center">
                          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                            <svg className="h-5 w-5 text-primary" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                              <path d="M12 10.586 5.636 4.221a9.002 9.002 0 0 0 0 12.728L12 10.586z"></path>
                              <path d="M12 10.586 18.364 4.221a9.002 9.002 0 0 1 0 12.728L12 10.586z"></path>
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Lead Validation & Enrichment</div>
                            <p className="text-xs text-muted-foreground">Clean and verify leads</p>
                          </div>
                        </div>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
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
        <div className="space-y-2">
          <p className="text-sm font-medium">Resources</p>
          <div className="pl-4 space-y-2">
            <Link href="/blog">
              <span className="text-sm text-muted-foreground hover:text-primary block">Blog</span>
            </Link>
          </div>
        </div>
      ) : (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 grid-cols-1 bg-background border rounded-lg shadow-lg">
                  <li>
                    <Link href="/blog" className="block p-4 hover:bg-accent hover:text-accent-foreground rounded-md cursor-pointer transition-colors duration-200 group">
                      <div className="flex items-center">
                        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/15 transition-colors duration-200">
                          <svg className="h-5 w-5 text-primary" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                            <path d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0-2-2V6a2 2 0 0 0-2-2Z"></path>
                            <path d="m8 10 4 4 4-4"></path>
                            <path d="M12 6v8"></path>
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Blog</div>
                          <p className="text-xs text-muted-foreground">Latest insights and industry trends</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}

      <Link href="/contact">
        <span className="text-sm hover:text-primary cursor-pointer transition-colors duration-200">
          Contact Us
        </span>
      </Link>
    </div>
  );

  return (
    <motion.header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/95 backdrop-blur-sm border-b",
        isScrolled 
          ? "border-border shadow-md" 
          : "border-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative z-10">
        <motion.div 
          className="flex items-center group"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link href="/">
            <div className="flex items-center hover:opacity-80 transition-opacity duration-200">
              <img src="/logo.png" alt="Pivotal B2B" className="h-10 cursor-pointer" />
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavItems />
        </div>

        <div className="flex items-center gap-4">
          <ThemeSwitcher />

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] bg-background/95 backdrop-blur-xl border-l-2 border-primary/20 shadow-2xl">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col space-y-6 mt-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 -z-10" />
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <NavItems isMobile />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <Link href="/b2b-audience" className="block px-4 py-3 text-sm bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 rounded-xl transition-all duration-300 border border-primary/20 hover:border-primary/30 shadow-sm hover:shadow-md">
                    <span className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="font-medium">B2B Audience</span>
                    </span>
                  </Link>
                </motion.div>
                
                <motion.div 
                  className="pt-6 border-t border-primary/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  {user ? (
                    <Button
                      variant="outline"
                      onClick={() => logoutMutation.mutate()}
                      disabled={logoutMutation.isPending}
                      className="w-full"
                    >
                      {logoutMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Logging out...
                        </>
                      ) : (
                        "Logout"
                      )}
                    </Button>
                  ) : (
                    <div className="flex flex-col space-y-3">
                      <Link href="/login">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button variant="outline" className="w-full bg-gradient-to-r from-background/50 to-background/80 hover:from-primary/10 hover:to-primary/5 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md">
                            Login
                          </Button>
                        </motion.div>
                      </Link>
                      <Link href="/request-proposal">
                        <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                          <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary/30 hover:border-primary/50">
                            <span className="flex items-center justify-center space-x-2">
                              <Sparkles className="w-4 h-4" />
                              <span>Request a Proposal</span>
                            </span>
                          </Button>
                        </motion.div>
                      </Link>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </SheetContent>
          </Sheet>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Button
                variant="outline"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
              >
                {logoutMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging out...
                  </>
                ) : (
                  "Logout"
                )}
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/request-proposal">
                  <Button>Request a Proposal</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
    </motion.header>
  );
}