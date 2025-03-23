// Assuming a React component or similar structure where metrics are displayed
const metrics = [
  { value: "20%", label: "Improved Pipeline Efficiency" },
  { value: "15%", label: "Reduced Customer Churn" },
  // ... other metrics
];

// ... rest of the component rendering the metrics ...

// Example rendering in JSX:
{metrics.map((metric) => (
  <div key={metric.label}>
    {metric.label}: {metric.value}
  </div>
))}

// ... rest of the component