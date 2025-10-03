import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Unlink, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { M365Connection } from "@shared/schema";

export function M365ConnectionSettings() {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);

  const { data: connection, isLoading } = useQuery<M365Connection | null>({
    queryKey: ["/api/pipeline/m365-connection"],
  });

  const disconnectMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/pipeline/m365-connection/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pipeline/m365-connection"] });
      toast({
        title: "Disconnected",
        description: "Microsoft 365 account has been disconnected",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to disconnect Microsoft 365",
        variant: "destructive",
      });
    },
  });

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      const response = await fetch("/api/auth/m365/authorize");
      const { authUrl } = await response.json();

      const width = 600;
      const height = 700;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const popup = window.open(
        authUrl,
        "Microsoft 365 Authentication",
        `width=${width},height=${height},left=${left},top=${top}`
      );

      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === "M365_AUTH_SUCCESS") {
          queryClient.invalidateQueries({ queryKey: ["/api/pipeline/m365-connection"] });
          setIsConnecting(false);
          toast({
            title: "Connected",
            description: "Microsoft 365 account connected successfully",
          });
          window.removeEventListener("message", handleMessage);
        }
      };

      window.addEventListener("message", handleMessage);

      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);
          setIsConnecting(false);
          window.removeEventListener("message", handleMessage);
        }
      }, 500);
    } catch (error) {
      setIsConnecting(false);
      toast({
        title: "Error",
        description: "Failed to connect Microsoft 365",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = () => {
    if (connection && window.confirm("Are you sure you want to disconnect your Microsoft 365 account?")) {
      disconnectMutation.mutate(connection.id);
    }
  };

  const isExpiringSoon = connection && new Date(connection.expiresAt) < new Date(Date.now() + 24 * 60 * 60 * 1000);
  const isExpired = connection && new Date(connection.expiresAt) < new Date();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Microsoft 365 Integration
        </CardTitle>
        <CardDescription>
          Connect your Microsoft 365 account to send emails and sync inbox activity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!connection ? (
          <div className="space-y-4">
            <div className="rounded-lg border p-4 space-y-2">
              <h4 className="font-medium">Benefits of connecting:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Send campaign emails directly from your Microsoft 365 account</li>
                <li>• Automatically log sent and received emails to deal activities</li>
                <li>• Sync inbox conversations with your pipeline</li>
                <li>• Track email engagement and responses</li>
              </ul>
            </div>
            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full"
              data-testid="button-connect-m365"
            >
              {isConnecting ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Connect Microsoft 365
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Connected</span>
                  {isExpired && <Badge variant="destructive">Expired</Badge>}
                  {isExpiringSoon && !isExpired && <Badge variant="outline">Expiring Soon</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{connection.email}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Connected on {format(new Date(connection.createdAt), "MMM d, yyyy")}
                </p>
                {isExpired ? (
                  <div className="flex items-center gap-2 mt-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    <span>Token expired - reconnect to continue using Microsoft 365</span>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground mt-1">
                    Token expires {format(new Date(connection.expiresAt), "MMM d, yyyy 'at' h:mm a")}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              {(isExpired || isExpiringSoon) && (
                <Button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  variant="default"
                  size="sm"
                  data-testid="button-reconnect-m365"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reconnect
                </Button>
              )}
              <Button
                onClick={handleDisconnect}
                disabled={disconnectMutation.isPending}
                variant="outline"
                size="sm"
                data-testid="button-disconnect-m365"
              >
                <Unlink className="h-4 w-4 mr-2" />
                Disconnect
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
