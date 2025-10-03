import { storage } from "../storage";

interface SendEmailOptions {
  from: string;
  to: string[];
  subject: string;
  htmlContent: string;
  accessToken?: string;
}

export class MicrosoftGraphService {
  private async getValidAccessToken(userId: number): Promise<string | null> {
    const connection = await storage.getM365ConnectionByUser(userId);
    
    if (!connection) {
      return null;
    }

    const expiresAt = new Date(connection.expiresAt);
    const now = new Date();

    // If token is expired or expiring in the next 5 minutes, refresh it
    if (expiresAt < new Date(now.getTime() + 5 * 60 * 1000)) {
      return await this.refreshAccessToken(connection.id, connection.refreshToken);
    }

    return connection.accessToken;
  }

  private async refreshAccessToken(connectionId: number, refreshToken: string): Promise<string | null> {
    try {
      const clientId = process.env.M365_CLIENT_ID;
      const clientSecret = process.env.M365_CLIENT_SECRET;

      const response = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: clientId!,
          client_secret: clientSecret!,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("Token refresh error:", data);
        return null;
      }

      // Update the connection with new tokens
      await storage.updateM365Connection(connectionId, {
        accessToken: data.access_token,
        refreshToken: data.refresh_token || refreshToken,
        expiresAt: new Date(Date.now() + data.expires_in * 1000).toISOString(),
      });

      return data.access_token;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  }

  async sendEmail(userId: number, options: SendEmailOptions): Promise<boolean> {
    try {
      const accessToken = options.accessToken || await this.getValidAccessToken(userId);
      
      if (!accessToken) {
        throw new Error("No valid access token available");
      }

      const message = {
        message: {
          subject: options.subject,
          body: {
            contentType: "HTML",
            content: options.htmlContent,
          },
          toRecipients: options.to.map(email => ({
            emailAddress: { address: email }
          })),
        },
      };

      const response = await fetch('https://graph.microsoft.com/v1.0/me/sendMail', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Error sending email via Microsoft Graph:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  }

  async getInboxMessages(userId: number, limit: number = 50): Promise<any[]> {
    try {
      const accessToken = await this.getValidAccessToken(userId);
      
      if (!accessToken) {
        throw new Error("No valid access token available");
      }

      const response = await fetch(
        `https://graph.microsoft.com/v1.0/me/messages?$top=${limit}&$select=id,subject,from,toRecipients,receivedDateTime,bodyPreview,hasAttachments`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("Error fetching inbox messages:", error);
        return [];
      }

      const data = await response.json();
      return data.value || [];
    } catch (error) {
      console.error("Error fetching inbox:", error);
      return [];
    }
  }

  async getSentMessages(userId: number, limit: number = 50): Promise<any[]> {
    try {
      const accessToken = await this.getValidAccessToken(userId);
      
      if (!accessToken) {
        throw new Error("No valid access token available");
      }

      const response = await fetch(
        `https://graph.microsoft.com/v1.0/me/sentItems?$top=${limit}&$select=id,subject,toRecipients,sentDateTime,bodyPreview`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("Error fetching sent messages:", error);
        return [];
      }

      const data = await response.json();
      return data.value || [];
    } catch (error) {
      console.error("Error fetching sent messages:", error);
      return [];
    }
  }
}

export const microsoftGraphService = new MicrosoftGraphService();
