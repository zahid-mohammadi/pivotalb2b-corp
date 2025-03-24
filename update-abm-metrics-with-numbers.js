// Create a success metrics update with specific numbers and percentages
const successMetricsUpdate = {
  successMetrics: [
    "85% increase in high-value account engagement",
    "42% higher account-to-opportunity conversion rate",
    "37% improvement in win rates for targeted accounts"
  ]
};

// Make the API request to update the service
async function updateServiceMetrics() {
  const serviceId = 9; // Account-Based Marketing
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