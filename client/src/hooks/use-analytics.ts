import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

export function useAnalytics() {
  const [location] = useLocation();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Setup WebSocket connection
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/analytics`;

    function connect() {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('Analytics WebSocket connected');
        // Send initial pageview
        sendPageView();
      };

      ws.onclose = () => {
        console.log('Analytics WebSocket disconnected, attempting to reconnect...');
        setTimeout(connect, 3000);
      };

      ws.onerror = (error) => {
        console.error('Analytics WebSocket error:', error);
      };
    }

    function sendPageView() {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'pageview',
          path: location,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        }));
      }
    }

    // Initial connection
    connect();

    // Send pageview on route change
    sendPageView();

    // Cleanup on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [location]);

  return null;
}