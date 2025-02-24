import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function useAnalytics() {
  const [location] = useLocation();

  useEffect(() => {
    // Track page view
    const trackPageView = async () => {
      try {
        await fetch('/api/analytics/page-view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            path: location,
            referrer: document.referrer,
          }),
        });
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    trackPageView();

    // Set up interval to ping for active session
    const pingInterval = setInterval(() => {
      fetch('/api/analytics/ping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch(console.error);
    }, 30000); // Every 30 seconds

    return () => {
      clearInterval(pingInterval);
    };
  }, [location]);
}
