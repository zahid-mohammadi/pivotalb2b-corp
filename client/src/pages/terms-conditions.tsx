import { PageBanner } from "@/components/ui/page-banner";
import { MetaTags } from "@/components/ui/meta-tags";

export default function TermsConditionsPage() {
  return (
    <>
      <MetaTags
        title="Terms & Conditions - Pivotal B2B Marketing Platform"
        description="Read our terms and conditions for using Pivotal B2B's marketing platform and services. Understanding our service agreement and user responsibilities."
        keywords="terms and conditions, service agreement, B2B marketing terms, user agreement, legal terms, service terms"
        noindex={false}
      />
      <div className="min-h-screen">
        <PageBanner
          title="Terms & Conditions"
          description="Please read these terms carefully before using our services"
          pattern="dots"
        />
        
        <div className="container mx-auto py-16">
          <div className="prose prose-slate max-w-4xl mx-auto">
            <h2>Agreement to Terms</h2>
            <p>Last updated: February 18, 2025</p>
            <p>
              These Terms and Conditions constitute a legally binding agreement made between you
              and Pivotal B2B concerning your access to and use of our B2B marketing platform.
            </p>

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

            <h2>Subscription Terms</h2>
            <ul>
              <li>Billing occurs on a per-lead basis</li>
              <li>Payments are non-refundable</li>
              <li>Service can be terminated with 30 days notice</li>
              <li>Pricing may be adjusted with advance notice</li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
              All content, features, and functionality of our platform are owned by
              Pivotal B2B and are protected by international copyright, trademark,
              patent, trade secret, and other intellectual property laws.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              Pivotal B2B shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use of our services.
            </p>

            <h2>Termination</h2>
            <p>
              We reserve the right to terminate or suspend your account and access to
              services for violation of these terms or for any other reason at our discretion.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify
              users of any material changes via email or through the platform.
            </p>

            <h2>Contact Information</h2>
            <p>
              Questions about the Terms and Conditions should be sent to:<br />
              Email: legal@pivotal-b2b.com<br />
              Address: 16192 Coastal Highway Lewes, Delaware 19958 USA
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
