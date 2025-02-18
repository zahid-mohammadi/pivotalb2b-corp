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

export function Navbar() {
  const { user, logoutMutation } = useAuth();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center">
            <img src="/logo.png" alt="Pivotal B2B" className="h-8" />
          </a>
        </Link>

        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/">
                  <a className="px-4 py-2 hover:text-primary">Home</a>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/about">
                  <a className="px-4 py-2 hover:text-primary">About Us</a>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/services/pinpoint-opt-in-leads">
                        <a className="block p-3 hover:bg-muted rounded-md">
                          <div className="text-sm font-medium">Pinpoint Opt-in Leads</div>
                          <p className="text-sm text-muted-foreground">Identify and engage prospects</p>
                        </a>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/services/strategic-content-syndication">
                        <a className="block p-3 hover:bg-muted rounded-md">
                          <div className="text-sm font-medium">Strategic Content Syndication</div>
                          <p className="text-sm text-muted-foreground">Amplify your content reach</p>
                        </a>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/services/smart-audience-events">
                        <a className="block p-3 hover:bg-muted rounded-md">
                          <div className="text-sm font-medium">Smart Audience Events</div>
                          <p className="text-sm text-muted-foreground">Transform your events</p>
                        </a>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/services/advanced-lead-qualification">
                        <a className="block p-3 hover:bg-muted rounded-md">
                          <div className="text-sm font-medium">Advanced Lead Qualification</div>
                          <p className="text-sm text-muted-foreground">Close deals faster</p>
                        </a>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/blog">
                        <a className="block p-3 hover:bg-muted rounded-md">
                          <div className="text-sm font-medium">Blog</div>
                          <p className="text-sm text-muted-foreground">Latest insights and industry trends</p>
                        </a>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/ebooks">
                        <a className="block p-3 hover:bg-muted rounded-md">
                          <div className="text-sm font-medium">eBooks</div>
                          <p className="text-sm text-muted-foreground">In-depth guides and whitepapers</p>
                        </a>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/case-studies">
                        <a className="block p-3 hover:bg-muted rounded-md">
                          <div className="text-sm font-medium">Case Studies</div>
                          <p className="text-sm text-muted-foreground">Success stories and client results</p>
                        </a>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/contact">
                  <a className="px-4 py-2 hover:text-primary">Contact Us</a>
                </Link>
              </NavigationMenuLink>
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
              <Button>Get Started Today</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}