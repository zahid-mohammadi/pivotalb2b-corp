import { PageBanner } from "@/components/ui/page-banner";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Target, Users2, BarChart3 } from "lucide-react";
import { MetaTags } from "@/components/ui/meta-tags";

export default function AboutPage() {
  return (
    <div>
      <MetaTags
        title="About Pivotal B2B - Leading B2B Marketing & Lead Generation Agency"
        description="Learn about Pivotal B2B's mission to transform B2B marketing through data-driven strategies, innovative technology, and measurable results. Discover our values, expertise, and commitment to client success."
        keywords="B2B marketing agency, lead generation experts, data-driven marketing, B2B strategy, marketing innovation, business growth solutions, customer success focus"
      />
      <PageBanner
        title="About Us"
        description="We are a leading B2B marketing platform dedicated to helping businesses grow through advanced content management and AI-powered engagement tools."
        pattern="grid"
      />

      <div className="container mx-auto py-16">
        <div className="prose prose-lg max-w-none">
          <div className="grid gap-8 md:grid-cols-2 mb-16">
            <Card className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To empower businesses with cutting-edge marketing tools and strategies that drive meaningful engagement and measurable results.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                    <p className="text-muted-foreground">
                      To revolutionize B2B marketing through innovative technology and data-driven insights.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-8 text-center">Our Values</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="hover-lift fade-in">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Users2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Customer Success Focus</h3>
                      <p className="text-muted-foreground">
                        We prioritize our clients' success and growth through dedicated support and strategic guidance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift fade-in">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Data-Driven Innovation</h3>
                      <p className="text-muted-foreground">
                        We leverage advanced analytics and AI to deliver actionable insights and measurable results.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}