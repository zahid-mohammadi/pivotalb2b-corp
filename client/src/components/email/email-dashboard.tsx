import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Send, Inbox, AlertCircle, Plus } from "lucide-react";
import { EmailInbox } from "./email-inbox";
import { EmailCompose } from "./email-compose";
import { M365ConnectionSettings } from "../settings/m365-connection";
import type { M365Connection } from "@shared/schema";

export function EmailDashboard() {
  const [composeOpen, setComposeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("inbox");

  const { data: connection } = useQuery<M365Connection | null>({
    queryKey: ["/api/pipeline/m365-connection"],
  });

  const isExpired = connection && new Date(connection.expiresAt) < new Date();

  if (!connection) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Email</h2>
          <p className="text-muted-foreground">
            Connect your Microsoft 365 account to access your inbox and send emails
          </p>
        </div>

        <Card>
          <CardContent className="pt-12 pb-12">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <Mail className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Microsoft 365 Not Connected</h3>
                <p className="text-sm text-muted-foreground">
                  Connect your Microsoft 365 account to access your inbox, send emails, and sync your conversations
                </p>
              </div>

              <M365ConnectionSettings />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Email</h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-muted-foreground">
              Connected as {connection.email}
            </p>
            {isExpired && (
              <Badge variant="destructive" className="text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                Token Expired
              </Badge>
            )}
          </div>
        </div>

        <Button
          onClick={() => setComposeOpen(true)}
          disabled={isExpired}
          data-testid="button-compose-email"
        >
          <Plus className="h-4 w-4 mr-2" />
          Compose
        </Button>
      </div>

      {isExpired && (
        <Card className="border-destructive bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">Connection Expired</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Your Microsoft 365 connection has expired. Please reconnect to access your inbox and send emails.
                </p>
                <M365ConnectionSettings />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="inbox" data-testid="tab-inbox">
            <Inbox className="h-4 w-4 mr-2" />
            Inbox
          </TabsTrigger>
          <TabsTrigger value="sent" data-testid="tab-sent">
            <Send className="h-4 w-4 mr-2" />
            Sent
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="mt-6">
          <EmailInbox folder="inbox" />
        </TabsContent>

        <TabsContent value="sent" className="mt-6">
          <EmailInbox folder="sent" />
        </TabsContent>
      </Tabs>

      <EmailCompose
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        onSuccess={() => {
          // Optionally refresh inbox/sent items
        }}
      />
    </div>
  );
}
