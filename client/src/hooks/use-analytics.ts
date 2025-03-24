import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'wouter';

export function useAnalytics() {
  const [location] = useLocation();
  const lastPingTime = useRef(Date.now());
  const pingInterval = useRef<NodeJS.Timeout>();

  const sendPing = useCallback(async () => {
    try {
      const sessionId = localStorage.getItem('sessionId') || crypto.randomUUID();
      localStorage.setItem('sessionId', sessionId);

      await fetch('/api/analytics/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });

      lastPingTime.current = Date.now();
    } catch (error) {
      console.error('Failed to send analytics ping:', error);
    }
  }, []);

  useEffect(() => {
    // Record page view with debouncing
    const timeoutId = setTimeout(() => {
      console.log('Page view:', location);
      sendPing();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [location, sendPing]);

  useEffect(() => {
    // Set up periodic ping
    pingInterval.current = setInterval(sendPing, 60000); // Every 60 seconds

    return () => {
      if (pingInterval.current) {
        clearInterval(pingInterval.current);
      }
    };
  }, [sendPing]);

  return null;
}