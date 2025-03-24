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
import { Menu, X, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { user, logoutMutation } = useAuth();

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
              <Link href="/services/strategic-lead-generation">
                <span className="text-sm text-muted-foreground hover:text-primary block">Strategic Lead Generation</span>
              </Link>
              <Link href="/services/content-syndication">
                <span className="text-sm text-muted-foreground hover:text-primary block">Content Syndication</span>
              </Link>
              <Link href="/services/event-marketing-solutions">
                <span className="text-sm text-muted-foreground hover:text-primary block">Event Marketing Solutions</span>
              </Link>
              <Link href="/services/lead-qualification-services">
                <span className="text-sm text-muted-foreground hover:text-primary block">Lead Qualification Services</span>
              </Link>
              <Link href="/services/account-based-marketing">
                <span className="text-sm text-muted-foreground hover:text-primary block">Account-Based Marketing</span>
              </Link>
              <Link href="/services/waterfall-campaign-suite">
                <span className="text-sm text-muted-foreground hover:text-primary block">Waterfall Campaign Suite</span>
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
                <ul className="grid w-[800px] gap-3 p-4 grid-cols-3">
                  <li>
                    <Link href="/services/strategic-lead-generation" className="block p-4 hover:bg-muted/60 rounded-md cursor-pointer transition-colors duration-200 group">
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
                            <div className="text-sm font-medium">Strategic Lead Generation</div>
                            <p className="text-xs text-muted-foreground">High-quality leads through intent data</p>
                          </div>
                        </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/content-syndication" className="block p-4 hover:bg-muted/60 rounded-md cursor-pointer transition-colors duration-200 group">
                        <div className="flex items-center">
                          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                            <svg className="h-5 w-5 text-primary" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="17 8 12 3 7 8"></polyline>
                              <line x1="12" x2="12" y1="3" y2="15"></line>
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Content Syndication</div>
                            <p className="text-xs text-muted-foreground">Amplify your content's reach</p>
                          </div>
                        </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/event-marketing-solutions" className="block p-4 hover:bg-muted/60 rounded-md cursor-pointer transition-colors duration-200 group">
                        <div className="flex items-center">
                          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                            <svg className="h-5 w-5 text-primary" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                              <path d="M8 12h8"></path>
                              <path d="M12 8v8"></path>
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Event Marketing Solutions</div>
                            <p className="text-xs text-muted-foreground">Drive qualified event attendance</p>
                          </div>
                        </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/lead-qualification-services" className="block p-4 hover:bg-muted/60 rounded-md cursor-pointer transition-colors duration-200 group">
                        <div className="flex items-center">
                          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                            <svg className="h-5 w-5 text-primary" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                              <path d="M12 10.586 5.636 4.221a9.002 9.002 0 0 0 0 12.728L12 10.586z"></path>
                              <path d="M12 10.586 18.364 4.221a9.002 9.002 0 0 1 0 12.728L12 10.586z"></path>
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Lead Qualification Services</div>
                            <p className="text-xs text-muted-foreground">BANT-qualified prospects</p>
                          </div>
                        </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/account-based-marketing" className="block p-4 hover:bg-muted/60 rounded-md cursor-pointer transition-colors duration-200 group">
                        <div className="flex items-center">
                          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                            <svg className="h-5 w-5 text-primary" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                              <path d="M3 6 8 3 13 6 18 3 21 5v13L18 16l-5 3-5-3-5 3V6"></path>
                              <line x1="13" x2="13" y1="6" y2="16"></line>
                              <line x1="8" x2="8" y1="3" y2="16"></line>
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Account-Based Marketing</div>
                            <p className="text-xs text-muted-foreground">Strategic targeting for key accounts</p>
                          </div>
                        </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/waterfall-campaign-suite" className="block p-4 hover:bg-muted/60 rounded-md cursor-pointer transition-colors duration-200 group">
                        <div className="flex items-center">
                          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                            <svg className="h-5 w-5 text-primary" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                              <path d="M3 3v18h18"></path>
                              <path d="m19 9-5 5-4-4-3 3"></path>
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm font-medium">Waterfall Campaign Suite</div>
                            <p className="text-xs text-muted-foreground">Full-funnel integrated marketing</p>
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
            <Link href="/ebooks">
              <span className="text-sm text-muted-foreground hover:text-primary block">eBooks</span>
            </Link>
            <Link href="/case-studies">
              <span className="text-sm text-muted-foreground hover:text-primary block">Case Studies</span>
            </Link>
          </div>
        </div>
      ) : (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[600px] gap-3 p-4 grid-cols-3">
                  <li>
                    <Link href="/blog" className="block p-4 hover:bg-muted/60 rounded-md cursor-pointer transition-colors duration-200 group">
                      <div className="flex items-center">
                        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                          <svg className="h-5 w-5 text-primary" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                            <path d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"></path>
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
                  <li>
                    <Link href="/ebooks" className="block p-4 hover:bg-muted/60 rounded-md cursor-pointer transition-colors duration-200 group">
                      <div className="flex items-center">
                        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                          <svg className="h-5 w-5 text-primary" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                            <path d="M9 10h6"></path>
                            <path d="M12 7v6"></path>
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium">eBooks</div>
                          <p className="text-xs text-muted-foreground">In-depth guides and whitepapers</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link href="/case-studies" className="block p-4 hover:bg-muted/60 rounded-md cursor-pointer transition-colors duration-200 group">
                      <div className="flex items-center">
                        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                          <svg className="h-5 w-5 text-primary" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Case Studies</div>
                          <p className="text-xs text-muted-foreground">Success stories and client results</p>
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
        <span className="text-sm hover:text-primary cursor-pointer">Contact Us</span>
      </Link>
    </div>
  );

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <img src="/logo.png" alt="Pivotal B2B" className="h-10 cursor-pointer" />
          </Link>
        </div>

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
                      <Link href="/contact">
                        <Button className="w-full">Get Started Today</Button>
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
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/contact">
                  <Button>Get Started Today</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}