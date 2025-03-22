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
          <Link href="/b2b-audience">
            <span className="text-sm font-medium hover:text-primary block">B2B Audience</span>
          </Link>
          <div className="space-y-2">
            <p className="text-sm font-medium">Solutions</p>
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
            </div>
          </div>
        </div>
      ) : (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/b2b-audience">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  B2B Audience
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  <li>
                    <Link href="/services/strategic-lead-generation">
                      <NavigationMenuLink className="block p-3 hover:bg-muted rounded-md cursor-pointer">
                        <div className="text-sm font-medium">Strategic Lead Generation</div>
                        <p className="text-sm text-muted-foreground">High-quality leads through intent data</p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/content-syndication">
                      <NavigationMenuLink className="block p-3 hover:bg-muted rounded-md cursor-pointer">
                        <div className="text-sm font-medium">Content Syndication</div>
                        <p className="text-sm text-muted-foreground">Amplify your content's reach</p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/event-marketing-solutions">
                      <NavigationMenuLink className="block p-3 hover:bg-muted rounded-md cursor-pointer">
                        <div className="text-sm font-medium">Event Marketing Solutions</div>
                        <p className="text-sm text-muted-foreground">Drive qualified event attendance</p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/lead-qualification-services">
                      <NavigationMenuLink className="block p-3 hover:bg-muted rounded-md cursor-pointer">
                        <div className="text-sm font-medium">Lead Qualification Services</div>
                        <p className="text-sm text-muted-foreground">BANT-qualified prospects</p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/account-based-marketing">
                      <NavigationMenuLink className="block p-3 hover:bg-muted rounded-md cursor-pointer">
                        <div className="text-sm font-medium">Account-Based Marketing</div>
                        <p className="text-sm text-muted-foreground">Strategic targeting for key accounts</p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
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
                <ul className="grid w-[400px] gap-3 p-4">
                  <li>
                    <Link href="/blog">
                      <NavigationMenuLink className="block p-3 hover:bg-muted rounded-md cursor-pointer">
                        <div className="text-sm font-medium">Blog</div>
                        <p className="text-sm text-muted-foreground">Latest insights and industry trends</p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/ebooks">
                      <NavigationMenuLink className="block p-3 hover:bg-muted rounded-md cursor-pointer">
                        <div className="text-sm font-medium">eBooks</div>
                        <p className="text-sm text-muted-foreground">In-depth guides and whitepapers</p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/case-studies">
                      <NavigationMenuLink className="block p-3 hover:bg-muted rounded-md cursor-pointer">
                        <div className="text-sm font-medium">Case Studies</div>
                        <p className="text-sm text-muted-foreground">Success stories and client results</p>
                      </NavigationMenuLink>
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