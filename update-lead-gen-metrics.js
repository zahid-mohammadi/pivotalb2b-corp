// Create a success metrics update with specific numbers and percentages for Strategic Lead Generation
const successMetricsUpdate = {
  successMetrics: [
    "72% increase in qualified lead generation",
    "45% higher lead-to-opportunity conversion rate",
    "30% reduction in cost-per-acquisition"
  ]
};

// Make the API request to update the service
async function updateServiceMetrics() {
  const serviceId = 1; // Strategic Lead Generation
  try {
    const response = await fetch(`http://localhost:3000/api/services/${serviceId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(successMetricsUpdate),
    });
    
    const result = await response.json();
    console.log('Service metrics updated successfully:');
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error updating service metrics:', error);
  }
}

updateServiceMetrics();