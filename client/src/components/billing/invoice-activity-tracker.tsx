import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mail, MailOpen, Eye, Send, Clock, Monitor, Smartphone, Tablet, Globe, Calendar } from "lucide-react";
import { format } from "date-fns";
import type { Invoice } from "@shared/schema";

interface InvoiceView {
  id: number;
  invoiceId: number;
  viewedAt: string;
  ipAddress?: string;
  userAgent?: string;
  deviceType?: string;
}

interface InvoiceActivityTrackerProps {
  invoice: Invoice;
}

export function InvoiceActivityTracker({ invoice }: InvoiceActivityTrackerProps) {
  const { data: views } = useQuery<InvoiceView[]>({
    queryKey: ["/api/invoices", invoice.id, "views"],
  });

  const getDeviceIcon = (deviceType?: string) => {
    if (!deviceType) return <Monitor className="h-4 w-4" />;
    const type = deviceType.toLowerCase();
    if (type.includes('mobile') || type.includes('phone')) return <Smartphone className="h-4 w-4" />;
    if (type.includes('tablet')) return <Tablet className="h-4 w-4" />;
    return <Monitor className="h-4 w-4" />;
  };

  // Build timeline events
  const timelineEvents = [];

  // Invoice created
  if (invoice.issueDate) {
    timelineEvents.push({
      type: 'created',
      timestamp: invoice.issueDate,
      title: 'Invoice Created',
      description: `Invoice ${invoice.number} was created`,
      icon: <Calendar className="h-4 w-4" />,
      color: 'text-gray-500',
    });
  }

  // Invoice sent
  if (invoice.sentAt) {
    timelineEvents.push({
      type: 'sent',
      timestamp: invoice.sentAt,
      title: 'Invoice Sent',
      description: `Sent via email with tracking enabled`,
      icon: <Send className="h-4 w-4" />,
      color: 'text-blue-500',
    });
  }

  // Email opened
  if (invoice.emailOpenedAt) {
    timelineEvents.push({
      type: 'email_opened',
      timestamp: invoice.emailOpenedAt,
      title: 'Email Opened',
      description: `Opened ${invoice.emailOpenCount || 1} time${(invoice.emailOpenCount || 1) > 1 ? 's' : ''}`,
      icon: <MailOpen className="h-4 w-4" />,
      color: 'text-green-500',
    });
  }

  // Invoice views
  if (views && views.length > 0) {
    views.forEach((view) => {
      timelineEvents.push({
        type: 'viewed',
        timestamp: view.viewedAt,
        title: 'Invoice Viewed',
        description: `${view.deviceType || 'Unknown device'}${view.ipAddress ? ` from ${view.ipAddress}` : ''}`,
        icon: getDeviceIcon(view.deviceType),
        color: 'text-purple-500',
      });
    });
  }

  // Sort by timestamp descending
  timelineEvents.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="space-y-6">
      {/* Engagement Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email Opens</p>
                <p className="text-2xl font-bold">{invoice.emailOpenCount || 0}</p>
              </div>
              <MailOpen className="h-8 w-8 text-green-500 opacity-75" />
            </div>
            {invoice.emailOpenedAt && (
              <p className="text-xs text-muted-foreground mt-2">
                Last: {format(new Date(invoice.emailOpenedAt), "MMM d, h:mm a")}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Invoice Views</p>
                <p className="text-2xl font-bold">{views?.length || 0}</p>
              </div>
              <Eye className="h-8 w-8 text-purple-500 opacity-75" />
            </div>
            {views && views.length > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                Last: {format(new Date(views[0].viewedAt), "MMM d, h:mm a")}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <p className="text-lg font-semibold capitalize">{invoice.status}</p>
              </div>
              <Badge className={getStatusColor(invoice.status)}>
                {invoice.status}
              </Badge>
            </div>
            {invoice.sentAt && (
              <p className="text-xs text-muted-foreground mt-2">
                Sent: {format(new Date(invoice.sentAt), "MMM d, h:mm a")}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          {timelineEvents.length > 0 ? (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {timelineEvents.map((event, index) => (
                  <div key={index}>
                    <div className="flex gap-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-background border-2 flex items-center justify-center ${event.color}`}>
                        {event.icon}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm">{event.title}</h4>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(event.timestamp), "MMM d, h:mm a")}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                      </div>
                    </div>
                    {index < timelineEvents.length - 1 && (
                      <div className="ml-4 border-l-2 border-muted h-4" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No activity tracked yet</p>
              <p className="text-sm mt-1">Send the invoice to start tracking</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed View History */}
      {views && views.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              View Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {views.map((view) => (
                <div key={view.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="flex-shrink-0 mt-1">
                    {getDeviceIcon(view.deviceType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">
                        {view.deviceType || 'Unknown Device'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(view.viewedAt), "MMM d, yyyy h:mm a")}
                      </p>
                    </div>
                    {view.ipAddress && (
                      <p className="text-xs text-muted-foreground mt-1">
                        IP: {view.ipAddress}
                      </p>
                    )}
                    {view.userAgent && (
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {view.userAgent}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "paid": return "bg-green-500";
    case "sent": return "bg-blue-500";
    case "overdue": return "bg-red-500";
    case "draft": return "bg-gray-500";
    default: return "bg-gray-500";
  }
}
