import { Hero } from "@/components/sections/hero";
import { Approach } from "@/components/sections/approach";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { Testimonials } from "@/components/sections/testimonials";
import { MetaTags } from "@/components/ui/meta-tags";

export default function Home() {
  return (
    <>
      <MetaTags
        title="Premium B2B Lead Generation & Marketing Solutions | Pivotal B2B"
        description="Transform your B2B marketing with Pivotal B2B's premium lead generation services, intent-based targeting, and comprehensive marketing solutions. Drive growth with our data-driven approach to lead qualification and account-based marketing."
        keywords="B2B lead generation, intent data marketing, account-based marketing, content syndication, lead qualification, B2B marketing automation, marketing solutions, sales pipeline optimization"
        canonicalUrl="https://pivotal-b2b.com"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Pivotal B2B",
          "url": "https://pivotal-b2b.com",
          "description": "Premium B2B lead generation and marketing solutions provider",
          "sameAs": [
            "https://linkedin.com/company/pivotal-b2b",
            "https://twitter.com/pivotalb2b"
          ]
        }}
      />
      <div>
        <Hero />
        <Approach />
        <Services />
        <WhyUs />
        <Testimonials />
      </div>
    </>
  );
}