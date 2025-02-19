import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Loader2 } from "lucide-react";
import { 
  ArrowRight,
  CheckCircle2,
  Building2,
  Users,
  BarChart3,
  Eye,
  HandshakeIcon
} from "lucide-react";

export function Navbar() {
  const { user, logoutMutation } = useAuth();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <img src="/logo.png" alt="Pivotal B2B" className="h-8 cursor-pointer" />
          </Link>
        </div>

        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <Link href="/">
                <NavigationMenuLink className="px-4 py-2 hover:text-primary cursor-pointer">
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/about">
                <NavigationMenuLink className="px-4 py-2 hover:text-primary cursor-pointer">
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  <li>
                    <Link href="/services/intent-based-lead-generation">
                      <NavigationMenuLink className="block p-3 hover:bg-muted rounded-md cursor-pointer">
                        <div className="text-sm font-medium">Intent-Based Lead Generation</div>
                        <p className="text-sm text-muted-foreground">High-quality leads through intent data</p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/content-distribution">
                      <NavigationMenuLink className="block p-3 hover:bg-muted rounded-md cursor-pointer">
                        <div className="text-sm font-medium">Content Distribution</div>
                        <p className="text-sm text-muted-foreground">Amplify your content's reach</p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/event-webinar-promotion">
                      <NavigationMenuLink className="block p-3 hover:bg-muted rounded-md cursor-pointer">
                        <div className="text-sm font-medium">Event & Webinar Promotion</div>
                        <p className="text-sm text-muted-foreground">Drive qualified event attendance</p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/lead-qualification">
                      <NavigationMenuLink className="block p-3 hover:bg-muted rounded-md cursor-pointer">
                        <div className="text-sm font-medium">Lead Qualification</div>
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

            <NavigationMenuItem>
              <Link href="/agency-partnerships">
                <NavigationMenuLink className="px-4 py-2 hover:text-primary cursor-pointer">
                  Agency Partnerships
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/contact">
                <NavigationMenuLink className="px-4 py-2 hover:text-primary cursor-pointer">
                  Contact Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
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
                'Logout'
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
    </header>
  );
}