import { useRoute, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Mail, Building, Calendar, Download, MessageSquare, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Lead, Ebook, CaseStudy } from "@shared/schema";

export default function LeadDetail() {
  const [, params] = useRoute("/lead/:id");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const id = params?.id;

  const { data: lead, isLoading, error } = useQuery<Lead>({
    queryKey: [`/api/leads/${id}`],
    throwOnError: false,
  });

  const { data: ebooks } = useQuery<Ebook[]>({
    queryKey: ["/api/ebooks"],
  });

  const { data: caseStudies } = useQuery<CaseStudy[]>({
    queryKey: ["/api/case-studies"],
  });

  const deleteLeadMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("DELETE", `/api/leads/${id}`);
      if (!res.ok) throw new Error("Failed to delete lead");
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Lead deleted successfully",
      });
      navigate("/dashboard");
    },
  });

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this lead? This action cannot be undone.")) {
      deleteLeadMutation.mutate();
    }
  };

  const handleSendEmail = () => {
    if (lead?.email) {
      window.open(`mailto:${lead.email}`, '_blank');
    }
  };

  const getContentDetails = () => {
    if (!lead) return null;
    
    if (lead.contentType === 'media-kit') {
      return null; // Media kit doesn't have a content item
    }
    
    const content = lead.contentType === 'ebook'
      ? ebooks?.find(e => e.id === lead.contentId)
      : caseStudies?.find(c => c.id === lead.contentId);
    
    return content;
  };

  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case "download":
        return "bg-blue-100 text-blue-800";
      case "contact":
        return "bg-green-100 text-green-800";
      case "proposal":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold mb-2">Lead Not Found</h2>
              <p className="text-muted-foreground mb-4">
                The lead you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => navigate("/dashboard")} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const contentDetails = getContentDetails();

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{lead.fullName}</h1>
            <p className="text-muted-foreground">{lead.company}</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSendEmail}
            className="w-full sm:w-auto"
          >
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={deleteLeadMutation.isPending}
            className="w-full sm:w-auto"
          >
            Delete Lead
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Contact Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="text-lg">{lead.fullName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-lg break-all">{lead.email}</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Company</label>
                  <p className="text-lg flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    {lead.company}
                  </p>
                </div>
                {lead.phone && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <p className="text-lg">{lead.phone}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Message */}
          {lead.message && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{lead.message}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Lead Details */}
          <Card>
            <CardHeader>
              <CardTitle>Lead Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Source</label>
                <div className="mt-1">
                  <Badge className={getSourceBadgeColor(lead.source || "download")}>
                    {(lead.source || "download").charAt(0).toUpperCase() + (lead.source || "download").slice(1)}
                  </Badge>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Downloaded At</label>
                <p className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(lead.downloadedAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(lead.downloadedAt).toLocaleTimeString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Downloaded Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Downloaded Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Content Type</label>
                <p className="capitalize font-medium">
                  {lead.contentType}
                </p>
              </div>
              
              {lead.contentType === 'media-kit' ? (
                <>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Title</label>
                    <p className="font-medium">Media Kit</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/media-kit')}
                    className="w-full"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Media Kit
                  </Button>
                </>
              ) : contentDetails ? (
                <>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Title</label>
                    <p className="font-medium">{contentDetails.title}</p>
                  </div>
                  
                  {('description' in contentDetails ? contentDetails.description : 'challenge' in contentDetails ? contentDetails.challenge : null) && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        {lead.contentType === 'ebook' ? 'Description' : 'Challenge'}
                      </label>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {'description' in contentDetails ? contentDetails.description : 'challenge' in contentDetails ? contentDetails.challenge : ''}
                      </p>
                    </div>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const route = lead.contentType === 'ebook' 
                        ? `/ebooks/${lead.contentId}` 
                        : `/case-studies/${lead.contentId}`;
                      navigate(route);
                    }}
                    className="w-full"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Content
                  </Button>
                </>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}