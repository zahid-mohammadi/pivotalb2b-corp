import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { storage } from '../storage';

// Track active connections
const activeConnections = new Map<string, WebSocket>();
const lastActivity = new Map<string, Date>();

export function setupAnalyticsWebSocket(server: Server) {
  const wss = new WebSocketServer({ server, path: '/ws/analytics' });

  wss.on('connection', (ws: WebSocket) => {
    const sessionId = Math.random().toString(36).substring(7);
    activeConnections.set(sessionId, ws);
    lastActivity.set(sessionId, new Date());

    // Handle incoming analytics events
    ws.on('message', async (data: string) => {
      try {
        const event = JSON.parse(data);
        lastActivity.set(sessionId, new Date());

        // Record analytics event
        switch (event.type) {
          case 'pageview':
            await storage.recordPageView({
              path: event.path,
              sessionId,
              source: event.referrer || 'direct',
              deviceType: event.userAgent || 'unknown'
            });
            break;
          default:
            console.warn('Unknown event type:', event.type);
        }

        // Broadcast active users count to all connected clients
        const activeUsers = activeConnections.size;
        const message = JSON.stringify({ type: 'analytics_update', activeUsers });
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(message);
          }
        });
      } catch (error) {
        console.error('Error processing analytics event:', error);
      }
    });

    // Handle client disconnect
    ws.on('close', () => {
      activeConnections.delete(sessionId);
      lastActivity.delete(sessionId);
    });
  });

  // Clean up inactive connections periodically
  setInterval(() => {
    const now = new Date();
    lastActivity.forEach((lastTime, sid) => {
      if (now.getTime() - lastTime.getTime() > 5 * 60 * 1000) { // 5 minutes
        const ws = activeConnections.get(sid);
        if (ws) {
          ws.close();
          activeConnections.delete(sid);
          lastActivity.delete(sid);
        }
      }
    });
  }, 60 * 1000); // Check every minute
}
