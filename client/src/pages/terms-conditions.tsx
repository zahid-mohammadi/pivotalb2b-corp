import { PageBanner } from "@/components/ui/page-banner";
import { MetaTags } from "@/components/ui/meta-tags";

export default function TermsConditionsPage() {
  return (
    <>
      <MetaTags
        title="Terms & Conditions | B2B Marketing Platform Agreement | Pivotal B2B"
        description="Read and understand Pivotal B2B's terms and conditions for our B2B marketing platform and services. Clear guidelines on service usage, data handling, and business relationships."
        keywords="B2B marketing terms, service agreement, B2B platform terms, marketing services agreement, data usage terms, B2B service conditions, Pivotal B2B terms"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Terms & Conditions",
          "description": "Terms and conditions for using Pivotal B2B's marketing platform and services",
          "publisher": {
            "@type": "Organization",
            "name": "Pivotal B2B",
            "url": "https://pivotal-b2b.com"
          },
          "lastReviewed": "2025-02-18",
          "mainEntity": {
            "@type": "WebContent",
            "about": {
              "@type": "Thing",
              "name": "B2B Marketing Platform Terms"
            }
          }
        }}
      />
      <main className="min-h-screen">
        <PageBanner
          title="Terms & Conditions"
          description="Please read these terms carefully before using our services"
          pattern="dots"
        />

        <div className="container mx-auto py-16">
          <article className="prose prose-slate max-w-4xl mx-auto">
            <section>
              <h2>Agreement to Terms</h2>
              <p className="text-muted-foreground">Last updated: February 18, 2025</p>
              <p>
                These Terms and Conditions constitute a legally binding agreement made between you
                and Pivotal B2B concerning your access to and use of our B2B marketing platform.
              </p>
            </section>

            <section>
              <h2>Use of Services</h2>
              <p>
                By using our services, you agree to:
              </p>
              <ul>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not engage in unauthorized activities</li>
                <li>Not interfere with service operation</li>
              </ul>
            </section>

            <section>
              <h2>Subscription Terms</h2>
              <ul>
                <li>Billing occurs on a per-lead basis</li>
                <li>Payments are non-refundable</li>
                <li>Service can be terminated with 30 days notice</li>
                <li>Pricing may be adjusted with advance notice</li>
              </ul>
            </section>

            <section>
              <h2>Intellectual Property</h2>
              <p>
                All content, features, and functionality of our platform are owned by
                Pivotal B2B and are protected by international copyright, trademark,
                patent, trade secret, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2>Limitation of Liability</h2>
              <p>
                Pivotal B2B shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages resulting from your use of our services.
              </p>
            </section>

            <section>
              <h2>Termination</h2>
              <p>
                We reserve the right to terminate or suspend your account and access to
                services for violation of these terms or for any other reason at our discretion.
              </p>
            </section>

            <section>
              <h2>Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify
                users of any material changes via email or through the platform.
              </p>
            </section>

            <section>
              <h2>Contact Information</h2>
              <p>
                Questions about the Terms and Conditions should be sent to:<br />
                Email: legal@pivotal-b2b.com<br />
                Address: 16192 Coastal Highway Lewes, Delaware 19958 USA
              </p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}