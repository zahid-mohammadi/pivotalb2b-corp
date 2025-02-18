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
        title="B2B Lead Generation & Marketing Solutions"
        description="Transform your B2B marketing with Pivotal B2B's premium lead generation services, intelligent content strategies, and targeted marketing solutions designed for sustainable business growth."
        keywords="B2B lead generation, marketing solutions, content marketing, lead qualification, target audience, business growth, marketing automation, lead nurturing"
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