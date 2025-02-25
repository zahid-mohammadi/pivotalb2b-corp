import { useEffect } from 'react';
import { useLocation } from 'wouter';

export function useAnalytics() {
  const [location] = useLocation();

  useEffect(() => {
    // Simple analytics tracking without WebSocket for now
    console.log('Page view:', location);
  }, [location]);

  return null;
}