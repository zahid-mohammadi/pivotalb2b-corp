import { PageBanner } from "@/components/ui/page-banner";
import { MetaTags } from "@/components/ui/meta-tags";

export default function PrivacyPolicyPage() {
  return (
    <>
      <MetaTags
        title="Privacy Policy - Pivotal B2B Marketing Platform"
        description="Learn about how Pivotal B2B handles and protects your personal information. Our privacy policy outlines our data collection, usage, and protection practices."
        keywords="privacy policy, data protection, GDPR compliance, data security, B2B marketing privacy, information security"
        noindex={false}
      />
      <div className="min-h-screen">
        <PageBanner
          title="Privacy Policy"
          description="Our commitment to protecting your privacy and securing your data"
          pattern="dots"
        />
        
        <div className="container mx-auto py-16">
          <div className="prose prose-slate max-w-4xl mx-auto">
            <h2>Introduction</h2>
            <p>Last updated: February 18, 2025</p>
            <p>
              At Pivotal B2B, we take your privacy seriously. This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you use our B2B marketing platform
              and related services.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <ul>
              <li>Name and contact information</li>
              <li>Business email address</li>
              <li>Company name and position</li>
              <li>Account credentials</li>
              <li>Marketing preferences</li>
            </ul>

            <h3>Usage Information</h3>
            <ul>
              <li>Log data and analytics</li>
              <li>Device information</li>
              <li>IP address and location data</li>
              <li>Cookie information</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <ul>
              <li>To provide and maintain our services</li>
              <li>To improve our platform and user experience</li>
              <li>To communicate with you about updates and changes</li>
              <li>To analyze usage patterns and optimize performance</li>
              <li>To protect against unauthorized access and fraud</li>
            </ul>

            <h2>Data Protection</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your
              personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
              <li>Data portability</li>
            </ul>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              Email: privacy@pivotal-b2b.com<br />
              Address: 16192 Coastal Highway Lewes, Delaware 19958 USA
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
