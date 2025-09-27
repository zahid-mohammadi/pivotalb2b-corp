// Proven results component with qualitative benefits instead of specific metrics
const benefits = [
  { value: "Improved", label: "Pipeline Efficiency" },
  { value: "Reduced", label: "Customer Churn" },
  // ... other benefits
];

// ... rest of the component rendering the benefits ...

// Example rendering in JSX:
{benefits.map((benefit) => (
  <div key={benefit.label}>
    {benefit.label}: {benefit.value}
  </div>
))}

// ... rest of the component