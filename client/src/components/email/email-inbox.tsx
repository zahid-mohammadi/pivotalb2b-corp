import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, MailOpen, Paperclip, RefreshCw, Search } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const endpoint = folder === "inbox" ? "/api/m365/inbox" : "/api/m365/sentitems";
  
  const { data: messages, isLoading, refetch } = useQuery<InboxMessage[]>({
    queryKey: [endpoint],
  });

  const handleRefresh = () => {
    refetch();
    onRefresh?.();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredMessages = messages?.filter(msg => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      msg.subject?.toLowerCase().includes(query) ||
      msg.from?.emailAddress?.name?.toLowerCase().includes(query) ||
      msg.from?.emailAddress?.address?.toLowerCase().includes(query) ||
      msg.bodyPreview?.toLowerCase().includes(query)
    );
  });

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
    <div className="space-y-4">
      {/* Search and Actions */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${folder}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-emails"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          data-testid="button-refresh-inbox"
        >
          <RefreshCw className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">Refresh</span>
        </Button>
      </div>

      {/* Message Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredMessages?.length || 0} of {messages.length} message{messages.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Messages List */}
      <div className="space-y-1">
        {filteredMessages && filteredMessages.length > 0 ? filteredMessages.map((message) => (
          <Card
            key={message.id}
            className={`cursor-pointer hover:bg-accent/50 transition-all border-l-4 ${
              message.isRead ? "border-l-transparent" : "border-l-primary"
            }`}
            onClick={() => onMessageClick?.(message)}
            data-testid={`email-${message.id}`}
          >
            <CardContent className="p-3 md:p-4">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <Avatar className="h-10 w-10 mt-1">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {getInitials(message.from?.emailAddress?.name || message.from?.emailAddress?.address || "?")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <p className={`text-sm truncate ${message.isRead ? "font-normal" : "font-bold"}`}>
                        {message.from?.emailAddress?.name || message.from?.emailAddress?.address || "Unknown Sender"}
                      </p>
                      {!message.isRead && (
                        <Badge variant="secondary" className="text-xs px-1.5 py-0 h-5">
                          New
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {message.hasAttachments && (
                        <Paperclip className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {format(new Date(message.receivedDateTime), "MMM d")}
                      </span>
                    </div>
                  </div>

                  {/* Subject */}
                  <p className={`text-sm mb-1 truncate ${message.isRead ? "font-normal text-muted-foreground" : "font-semibold"}`}>
                    {message.subject || "(No Subject)"}
                  </p>

                  {/* Preview */}
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {message.bodyPreview}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )) : (
          <Card>
            <CardContent className="py-8 text-center">
              <Search className="h-8 w-8 mx-auto mb-2 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground text-sm">No messages match your search</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
