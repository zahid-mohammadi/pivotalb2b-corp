
import { Container } from '@/components/container';
import { PageHeader } from '@/components/page-header';

export default function B2BAudiencePage() {
  return (
    <Container>
      <PageHeader
        title="B2B Audience Reach"
        subtitle="Connect with over 135 million professionals across key job functions"
      />
      
      <div className="space-y-12 py-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Targeting Capabilities by Accounts</h2>
          <p className="mb-6">Identify and engage the exact companies that align with your goals. Our account-based targeting leverages detailed filters to pinpoint high-value organizations with accuracy.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Company Information</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Company Name: Target specific businesses by name</li>
                <li>Company Headcount: Filter by workforce size</li>
                <li>Company Type: Public, private, or nonprofit</li>
                <li>Company Headquarters Location: Regional targeting</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Industry & Geography</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Industry Filters: NAIC and SIC code filtering</li>
                <li>Location: Geographic targeting to zip code level</li>
                <li>Company Growth: Track growth metrics</li>
                <li>Technologies Used: Filter by 21,000+ technologies</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Targeting Capabilities by Persona</h2>
          <p className="mb-6">Reach the right people within your target accounts with our persona-based targeting filters.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Title: Target by job title</li>
                <li>Company: Align with specific organizations</li>
                <li>Location: Geographic filtering</li>
                <li>Seniority Level: Entry-level to C-suite</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Experience & Groups</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Years in Current Position</li>
                <li>Years at Current Company</li>
                <li>Total Years of Experience</li>
                <li>LinkedIn Group Membership</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Our Total Audience Reach by Job Function</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Information Technology', count: '42+ Million' },
              { title: 'Finance', count: '10+ Million' },
              { title: 'Human Resources', count: '14+ Million' },
              { title: 'Marketing', count: '24+ Million' },
              { title: 'Sales', count: '26+ Million' },
              { title: 'Executive Management', count: '2+ Million' },
              { title: 'Supply Chain', count: '1.8+ Million' },
              { title: 'Customer Experience', count: '0.7+ Million' },
              { title: 'Learning and Development', count: '1.5+ Million' },
              { title: 'Operations', count: '12.8+ Million' },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-xl font-bold text-primary">{item.count}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Why Choose Pivotal B2B?</h2>
          <p className="mb-4">With our advanced filtering capabilities and expansive audience reach, Pivotal B2B ensures your marketing and sales efforts are directed at the accounts and personas that matter most. From company-level insights to individual decision-maker details, our platform provides the tools you need to drive impactful B2B connections.</p>
          <div className="flex justify-center">
            <a href="/contact" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition">
              Contact Us Today
            </a>
          </div>
        </section>
      </div>
    </Container>
  );
}
