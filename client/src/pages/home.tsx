import { Hero } from "@/components/sections/hero";
import { Approach } from "@/components/sections/approach";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <div>
      <Hero />
      <Approach />
      <Services />
      <WhyUs />
      <Testimonials />
    </div>
  );
}
