import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';

// Track active connections
const activeConnections = new Map<string, WebSocket>();

export function setupAnalyticsWebSocket(server: Server) {
  const wss = new WebSocketServer({ server, path: '/ws/analytics' });

  wss.on('connection', (ws: WebSocket) => {
    const sessionId = Math.random().toString(36).substring(7);
    activeConnections.set(sessionId, ws);

    // Handle incoming messages
    ws.on('message', (data: string) => {
      try {
        const event = JSON.parse(data);
        console.log('Analytics event received:', event);

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
    });
  });
}