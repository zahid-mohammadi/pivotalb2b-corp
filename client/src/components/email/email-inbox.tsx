import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MailOpen, Paperclip, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface InboxMessage {
  id: string;
  subject: string;
  from: {
    emailAddress: {
      name: string;
      address: string;
    };
  };
  receivedDateTime: string;
  bodyPreview: string;
  hasAttachments: boolean;
  isRead?: boolean;
}

interface EmailInboxProps {
  folder: "inbox" | "sent";
  onMessageClick?: (message: InboxMessage) => void;
  onRefresh?: () => void;
}

export function EmailInbox({ folder, onMessageClick, onRefresh }: EmailInboxProps) {
  const endpoint = folder === "inbox" ? "/api/m365/inbox" : "/api/m365/sentitems";
  
  const { data: messages, isLoading, refetch } = useQuery<InboxMessage[]>({
    queryKey: [endpoint],
  });

  const handleRefresh = () => {
    refetch();
    onRefresh?.();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <Card>
        <CardContent className="pt-12 pb-12 text-center">
          <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No messages in your {folder}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">
          {messages.length} message{messages.length !== 1 ? "s" : ""}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          data-testid="button-refresh-inbox"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="space-y-2">
        {messages.map((message) => (
          <Card
            key={message.id}
            className="cursor-pointer hover:bg-accent transition-colors"
            onClick={() => onMessageClick?.(message)}
            data-testid={`email-${message.id}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {message.isRead ? (
                    <MailOpen className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Mail className="h-5 w-5 text-blue-600" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-semibold text-sm truncate">
                      {message.from?.emailAddress?.name || message.from?.emailAddress?.address || "Unknown Sender"}
                    </p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {message.hasAttachments && (
                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(message.receivedDateTime), "MMM d, h:mm a")}
                      </span>
                    </div>
                  </div>

                  <p className={`text-sm mb-1 ${message.isRead ? "font-normal" : "font-semibold"}`}>
                    {message.subject || "(No Subject)"}
                  </p>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {message.bodyPreview}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
