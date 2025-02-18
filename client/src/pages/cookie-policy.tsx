import { PageBanner } from "@/components/ui/page-banner";
import { MetaTags } from "@/components/ui/meta-tags";

export default function CookiePolicyPage() {
  return (
    <>
      <MetaTags
        title="Cookie Policy - Pivotal B2B Marketing Platform"
        description="Learn about how Pivotal B2B uses cookies and similar technologies to enhance your experience. Understand our cookie policy and your choices regarding cookie usage."
        keywords="cookie policy, website cookies, tracking technology, privacy settings, data collection, user tracking"
        noindex={false}
      />
      <div className="min-h-screen">
        <PageBanner
          title="Cookie Policy"
          description="Understanding how we use cookies to improve your experience"
          pattern="dots"
        />
        
        <div className="container mx-auto py-16">
          <div className="prose prose-slate max-w-4xl mx-auto">
            <h2>Introduction</h2>
            <p>Last updated: February 18, 2025</p>
            <p>
              This Cookie Policy explains how Pivotal B2B uses cookies and similar technologies
              to recognize you when you visit our platform. It explains what these technologies
              are and why we use them, as well as your rights to control our use of them.
            </p>

            <h2>What Are Cookies</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device
              when you visit a website. They are widely used by website owners to make their
              websites work, or to work more efficiently, as well as to provide reporting information.
            </p>

            <h2>Types of Cookies We Use</h2>
            <h3>Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function and cannot be switched
              off in our systems. They are usually only set in response to actions made by
              you which amount to a request for services.
            </p>

            <h3>Performance Cookies</h3>
            <p>
              These cookies allow us to count visits and traffic sources so we can measure
              and improve the performance of our site. They help us to know which pages
              are the most and least popular.
            </p>

            <h3>Functional Cookies</h3>
            <p>
              These cookies enable the website to provide enhanced functionality and
              personalization. They may be set by us or by third party providers.
            </p>

            <h3>Targeting Cookies</h3>
            <p>
              These cookies may be set through our site by our advertising partners.
              They may be used to build a profile of your interests and show you
              relevant adverts on other sites.
            </p>

            <h2>Managing Cookies</h2>
            <p>
              Most web browsers allow you to control cookies through their settings
              preferences. However, if you limit the ability of websites to set
              cookies, you may worsen your overall user experience.
            </p>

            <h2>Your Choices</h2>
            <p>
              You can choose to:
            </p>
            <ul>
              <li>Accept all cookies</li>
              <li>Manage cookies individually</li>
              <li>Reject all cookies</li>
              <li>Delete cookies after each browsing session</li>
            </ul>

            <h2>Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes
              to the cookies we use or for other operational, legal, or regulatory
              reasons.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about our use of cookies, please contact us at:<br />
              Email: privacy@pivotal-b2b.com<br />
              Address: 16192 Coastal Highway Lewes, Delaware 19958 USA
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
