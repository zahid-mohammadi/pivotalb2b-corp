import { lazy } from "react";
import { PageBanner } from "@/components/ui/page-banner";
import { MetaTags } from "@/components/ui/meta-tags";

// Lazy load the privacy policy content
const PrivacyPolicyContent = lazy(() => import("@/components/content/privacy-policy-content"));

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

        <div className="container mx-auto py-8 md:py-16 px-4 sm:px-6">
          <div className="prose prose-slate max-w-none md:max-w-4xl mx-auto">
            <PrivacyPolicyContent />
          </div>
        </div>
      </div>
    </>
  );
}