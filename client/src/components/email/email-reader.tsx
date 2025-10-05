import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Reply, 
  ReplyAll, 
  Forward, 
  Trash2,
  Download,
  Paperclip,
  User
} from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface EmailMessage {
  id: string;
  subject: string;
  from: {
    emailAddress: {
      name: string;
      address: string;
    };
  };
  toRecipients: Array<{
    emailAddress: {
      name: string;
      address: string;
    };
  }>;
  ccRecipients?: Array<{
    emailAddress: {
      name: string;
      address: string;
    };
  }>;
  receivedDateTime: string;
  sentDateTime?: string;
  body: {
    contentType: string;
    content: string;
  };
  hasAttachments: boolean;
  attachments?: Array<{
    id: string;
    name: string;
    contentType: string;
    size: number;
  }>;
}

interface EmailReaderProps {
  messageId: string;
  folder: "inbox" | "sent";
  onBack: () => void;
  onReply?: () => void;
  onReplyAll?: () => void;
  onForward?: () => void;
}

export function EmailReader({ messageId, folder, onBack, onReply, onReplyAll, onForward }: EmailReaderProps) {
  const endpoint = `/api/m365/messages/${messageId}`;
  
  const { data: message, isLoading } = useQuery<EmailMessage>({
    queryKey: [endpoint],
  });

  if (isLoading || !message) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Loading message...</p>
        </CardContent>
      </Card>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const sender = message.from?.emailAddress || { name: "Unknown", address: "" };
  const timestamp = message.receivedDateTime || message.sentDateTime;

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          data-testid="button-back-to-inbox"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to {folder}
        </Button>

        <div className="flex items-center gap-2">
          {folder === "inbox" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onReply}
                data-testid="button-reply"
              >
                <Reply className="h-4 w-4 mr-2" />
                Reply
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onReplyAll}
                data-testid="button-reply-all"
              >
                <ReplyAll className="h-4 w-4 mr-2" />
                Reply All
              </Button>
            </>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onForward}
            data-testid="button-forward"
          >
            <Forward className="h-4 w-4 mr-2" />
            Forward
          </Button>
          <Button
            variant="outline"
            size="sm"
            data-testid="button-delete"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Email Content */}
      <Card>
        <CardHeader className="space-y-4">
          {/* Subject */}
          <h1 className="text-2xl font-bold" data-testid="text-email-subject">
            {message.subject || "(No Subject)"}
          </h1>

          {/* Sender Info */}
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary/10 text-primary">
                {getInitials(sender.name || sender.address)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold" data-testid="text-sender-name">
                  {sender.name || sender.address}
                </p>
                {message.hasAttachments && (
                  <Badge variant="secondary" className="text-xs">
                    <Paperclip className="h-3 w-3 mr-1" />
                    {message.attachments?.length || ''} attachment{message.attachments?.length !== 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
              
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  <span className="font-medium">From:</span> {sender.address}
                </p>
                <p>
                  <span className="font-medium">To:</span>{' '}
                  {message.toRecipients?.map(r => r.emailAddress.address).join(', ')}
                </p>
                {message.ccRecipients && message.ccRecipients.length > 0 && (
                  <p>
                    <span className="font-medium">Cc:</span>{' '}
                    {message.ccRecipients.map(r => r.emailAddress.address).join(', ')}
                  </p>
                )}
                <p>
                  <span className="font-medium">Date:</span>{' '}
                  {timestamp && format(new Date(timestamp), "EEEE, MMMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          {/* Attachments */}
          {message.hasAttachments && message.attachments && message.attachments.length > 0 && (
            <div className="mb-6 space-y-2">
              <p className="text-sm font-medium flex items-center gap-2">
                <Paperclip className="h-4 w-4" />
                Attachments
              </p>
              <div className="space-y-2">
                {message.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-accent/50 hover:bg-accent transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{attachment.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(attachment.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" data-testid={`button-download-${attachment.id}`}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Email Body */}
          <div 
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: message.body?.contentType === 'html' 
                ? message.body.content 
                : `<pre style="white-space: pre-wrap; font-family: inherit;">${message.body?.content}</pre>` 
            }}
            data-testid="email-body-content"
          />
        </CardContent>
      </Card>
    </div>
  );
}
