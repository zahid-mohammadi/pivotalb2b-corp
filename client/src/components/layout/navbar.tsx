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
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <NavigationMenuTrigger className="group relative px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md">
                  <span className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-primary group-hover:animate-pulse" />
                    <span>Services</span>
                  </span>
                </NavigationMenuTrigger>
              </motion.div>
              <NavigationMenuContent className="!p-0">
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-[850px] bg-background/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
                  <ul className="grid gap-2 p-6 grid-cols-3 relative z-10">
                  <li>
                    <Link href="/services/account-based-marketing-abm-programs" className="block p-4 hover:bg-muted/60 rounded-md cursor-pointer transition-colors duration-200 group">
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
                    <Link href="/services/b2b-lead-generation-qualification" className="block p-4 hover:bg-muted/60 rounded-md cursor-pointer transition-colors duration-200 group">
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
                    <Link href="/services/lead-nurturing-buyer-engagement" className="block p-4 hover:bg-muted/60 rounded-md cursor-pointer transition-colors duration-200 group">
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
                    <Link href="/services/precision-demand-generation" className="block p-4 hover:bg-muted/60 rounded-md cursor-pointer transition-colors duration-200 group">
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
                    <Link href="/services/event-marketing-audience-acquisition" className="block p-4 hover:bg-muted/60 rounded-md cursor-pointer transition-colors duration-200 group">
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
                    <Link href="/services/lead-validation-enrichment" className="block p-4 hover:bg-muted/60 rounded-md cursor-pointer transition-colors duration-200 group">
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
                </motion.div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), "group relative px-4 py-2 bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/15 hover:to-primary/5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md")}
                  href="/b2b-audience"
                  asChild={false}
                >
                  <span className="flex items-center space-x-2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Zap className="w-4 h-4 text-primary group-hover:text-primary/80" />
                    </motion.div>
                    <span>B2B Audience</span>
                  </span>
                </NavigationMenuLink>
              </motion.div>
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
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <NavigationMenuTrigger className="group relative px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md">
                  <span className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-primary group-hover:animate-spin" />
                    <span>Resources</span>
                  </span>
                </NavigationMenuTrigger>
              </motion.div>
              <NavigationMenuContent className="!p-0">
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="w-[450px] bg-background/95 backdrop-blur-xl border-2 border-primary/20 rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
                  <ul className="grid gap-3 p-6 grid-cols-1 relative z-10">
                  <motion.li
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link href="/blog" className="block p-4 bg-gradient-to-br from-background/50 to-background/80 hover:from-primary/10 hover:to-primary/5 border border-border/50 hover:border-primary/30 rounded-xl cursor-pointer transition-all duration-300 group shadow-sm hover:shadow-lg">
                      <div className="flex items-center">
                        <motion.div 
                          className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-300 shadow-md group-hover:shadow-lg"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <svg className="h-5 w-5 text-primary" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                            <path d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"></path>
                            <path d="m8 10 4 4 4-4"></path>
                            <path d="M12 6v8"></path>
                          </svg>
                        </motion.div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">Blog</div>
                          <p className="text-xs text-muted-foreground group-hover:text-muted-foreground/80 mt-1">Latest insights and industry trends</p>
                        </div>
                      </div>
                    </Link>
                  </motion.li>
                </ul>
                </motion.div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}

      <Link href="/contact">
        <motion.span 
          className="text-sm hover:text-primary cursor-pointer relative group transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Us
          <motion.div
            className="absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.span>
      </Link>
    </div>
  );

  return (
    <motion.header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "backdrop-blur-xl bg-background/80 border-b border-border/50 shadow-2xl shadow-primary/10" 
          : "backdrop-blur-md bg-background/60"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: "200% 200%"
        }}
      />
      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative z-10">
        <motion.div 
          className="flex items-center group"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link href="/">
            <motion.div 
              className="relative flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-primary/10 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="relative"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <img src="/logo.png" alt="Pivotal B2B" className="h-10 cursor-pointer" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-3 h-3 text-primary" />
                </motion.div>
              </motion.div>
              <motion.div className="hidden sm:block">
                <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Pivotal B2B
                </h1>
                <p className="text-xs text-muted-foreground -mt-1">Marketing Solutions</p>
              </motion.div>
            </motion.div>
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
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="relative bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 rounded-xl border border-primary/20 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md">
                  <motion.div
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                  />
                  <Menu className="h-5 w-5 text-primary relative z-10" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </motion.div>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-4">
                <NavItems isMobile />
                <Link href="/b2b-audience" className="block px-4 py-2 text-sm">
                  B2B Audience
                </Link>
                <div className="pt-4 border-t">
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
                    <div className="flex flex-col space-y-2">
                      <Link href="/login">
                        <Button variant="outline" className="w-full">Login</Button>
                      </Link>
                      <Link href="/request-proposal">
                        <Button className="w-full">Request a Proposal</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
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
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" className="bg-gradient-to-r from-background/50 to-background/80 hover:from-primary/10 hover:to-primary/5 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md">
                      Login
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/request-proposal">
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary/30 hover:border-primary/50">
                      <span className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4" />
                        <span>Request a Proposal</span>
                      </span>
                    </Button>
                  </motion.div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <motion.div
        className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent"
        animate={{
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      />
    </motion.header>
  );
}