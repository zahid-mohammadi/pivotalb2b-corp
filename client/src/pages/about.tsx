export default function AboutPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      <div className="prose prose-lg max-w-none">
        <p className="lead">
          We are a leading B2B marketing platform dedicated to helping businesses grow through advanced content management and AI-powered engagement tools.
        </p>
        
        <div className="mt-12">
          <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
          <p>
            To empower businesses with cutting-edge marketing tools and strategies that drive meaningful engagement and measurable results.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-semibold mb-6">Our Values</h2>
          <ul>
            <li>Innovation in Marketing Technology</li>
            <li>Data-Driven Decision Making</li>
            <li>Customer Success Focus</li>
            <li>Continuous Improvement</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
