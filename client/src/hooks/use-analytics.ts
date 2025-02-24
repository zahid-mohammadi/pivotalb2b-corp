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
      try {
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          console.log('Analytics WebSocket connected');
          sendPageView();
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'analytics_update') {
              console.log('Active users:', data.activeUsers);
            }
          } catch (error) {
            console.error('Error processing WebSocket message:', error);
          }
        };

        ws.onclose = () => {
          console.log('Analytics WebSocket disconnected, attempting to reconnect...');
          setTimeout(connect, 3000);
        };

        ws.onerror = (error) => {
          console.error('Analytics WebSocket error:', error);
        };
      } catch (error) {
        console.error('Error connecting to WebSocket:', error);
      }
    }

    function sendPageView() {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        try {
          wsRef.current.send(JSON.stringify({
            type: 'pageview',
            path: location,
            timestamp: new Date().toISOString()
          }));
        } catch (error) {
          console.error('Error sending pageview:', error);
        }
      }
    }

    // Initial connection
    connect();

    // Cleanup on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [location]);

  return null;
}