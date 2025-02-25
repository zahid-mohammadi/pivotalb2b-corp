
import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function useAnalytics() {
  const [location] = useLocation();

  useEffect(() => {
    try {
      // Simple analytics tracking
      console.log('Page view:', location);
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }, [location]);

  return null;
}
