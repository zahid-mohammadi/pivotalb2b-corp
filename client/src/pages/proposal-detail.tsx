import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLocation, useParams, Link } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MetaTags } from "@/components/ui/meta-tags";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PageBanner } from "@/components/ui/page-banner";
import {
  Loader2,
  ArrowLeft,
  FileText,
  Download,
  FileSpreadsheet,
  File,
  Calendar,
  Building,
  User,
  Mail,
  Phone,
  Briefcase,
  Target,
  Globe,
  Users,
  Layers
} from "lucide-react";
import type { ProposalRequest } from "@shared/schema";

export default function ProposalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { data: proposal, isLoading, error } = useQuery<ProposalRequest>({
    queryKey: [`/api/proposal-requests/${id}`],
    throwOnError: false,
  });

  const updateProposalStatusMutation = useMutation({
    mutationFn: async (status: string) => {
      const res = await apiRequest("PATCH", `/api/proposal-requests/${id}/status`, { status });
      if (!res.ok) throw new Error("Failed to update proposal status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/proposal-requests/${id}`] });
      queryClient.invalidateQueries({ queryKey: ["/api/proposal-requests"] });
      toast({
        title: "Success",
        description: "Proposal status updated successfully",
      });
    }
  });

  const deleteProposalMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("DELETE", `/api/proposal-requests/${id}`);
      if (!res.ok) throw new Error("Failed to delete proposal request");
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Proposal request deleted successfully",
      });
      navigate("/dashboard");
    },
  });

  const handleStatusChange = (status: string) => {
    updateProposalStatusMutation.mutate(status);
  };

  const handleDelete = () => {
    deleteProposalMutation.mutate();
  };

  const handleDownload = (fileUrl: string) => {
    if (!fileUrl) return;
    window.open(fileUrl, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "contacted":
        return "bg-purple-100 text-purple-800";
      case "meeting":
        return "bg-yellow-100 text-yellow-800";
      case "proposal":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-destructive/10 p-4 rounded-md text-center">
          <h2 className="text-xl font-semibold text-destructive mb-2">Error Loading Proposal</h2>
          <p>The proposal details could not be loaded. Please try again.</p>
          <Button className="mt-4" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const getFileIcon = (fileUrl: string | null | undefined) => {
    if (!fileUrl) return null;
    
    if (fileUrl.endsWith('.pdf')) return <File className="h-5 w-5 text-red-500" />;
    if (fileUrl.endsWith('.csv') || fileUrl.endsWith('.xls') || fileUrl.endsWith('.xlsx')) 
      return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
    return <FileText className="h-5 w-5" />;
  };

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <MetaTags
        title={`Proposal from ${proposal.companyName} - Pivotal B2B`}
        description="Detailed view of a customer proposal request"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">{proposal.companyName}</h1>
              <p className="text-muted-foreground">{proposal.companyIndustries}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Status</span>
                <Select
                  defaultValue={proposal.status || "new"}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="proposal">Proposal</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                variant="destructive" 
                onClick={() => setConfirmDelete(true)}
              >
                Delete
              </Button>
            </div>
          </div>
          
          <Badge className={`${getStatusColor(proposal.status)}`}>
            {proposal.status?.charAt(0).toUpperCase() + proposal.status?.slice(1)}
          </Badge>
          <div className="flex items-center gap-2 mt-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Submitted on {formatDate(proposal.createdAt)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Full Name</p>
                <p>{proposal.fullName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${proposal.email}`} className="text-primary hover:underline">
                    {proposal.email}
                  </a>
                </div>
              </div>
              {proposal.phoneNumber && (
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${proposal.phoneNumber}`} className="text-primary hover:underline">
                      {proposal.phoneNumber}
                    </a>
                  </div>
                </div>
              )}
              {proposal.jobTitle && (
                <div>
                  <p className="text-sm font-medium">Job Title</p>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{proposal.jobTitle}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Building className="h-5 w-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Company Name</p>
                <p>{proposal.companyName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Industry</p>
                <p>{proposal.companyIndustries}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Company Size</p>
                <p>{proposal.companySize?.join(", ")}</p>
              </div>
              {proposal.technographics && (
                <div>
                  <p className="text-sm font-medium">Technology Stack</p>
                  <p>{proposal.technographics}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Service Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Service Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Interested Services</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {proposal.interestedServices?.map((service, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/10">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Primary Goals</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {proposal.primaryGoals?.map((goal, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/5">
                      {goal}
                    </Badge>
                  ))}
                  {proposal.otherGoal && (
                    <Badge variant="outline" className="bg-primary/5">
                      {proposal.otherGoal}
                    </Badge>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Timeline</p>
                <p>{proposal.timeline}</p>
              </div>
            </CardContent>
          </Card>

          {/* Targeting Information */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Target className="h-5 w-5" />
                Targeting Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Target Geography</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {proposal.targetGeography?.map((geo, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/5">
                        {geo}
                      </Badge>
                    ))}
                    {proposal.otherGeography && (
                      <Badge variant="outline" className="bg-primary/5">
                        {proposal.otherGeography}
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Target Job Function</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {proposal.jobFunction?.map((job, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/5">
                        {job}
                      </Badge>
                    ))}
                    {proposal.otherJobFunction && (
                      <Badge variant="outline" className="bg-primary/5">
                        {proposal.otherJobFunction}
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Target Job Level</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {proposal.jobLevel?.map((level, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/5">
                        {level}
                      </Badge>
                    ))}
                    {proposal.otherJobLevel && (
                      <Badge variant="outline" className="bg-primary/5">
                        {proposal.otherJobLevel}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Account-Based Marketing Section */}
              {proposal.hasTargetAccounts === "yes" && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-2">Account-Based Marketing</h3>
                  
                  {proposal.targetAccountsList && (
                    <div className="mb-3">
                      <p className="text-sm font-medium">Target Accounts List</p>
                      <p className="whitespace-pre-wrap text-sm">{proposal.targetAccountsList}</p>
                    </div>
                  )}
                  
                  {proposal.targetAccountsFileUrl && (
                    <div>
                      <p className="text-sm font-medium mb-2">Target Accounts File</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2"
                        onClick={() => handleDownload(proposal.targetAccountsFileUrl || '')}
                      >
                        {getFileIcon(proposal.targetAccountsFileUrl)}
                        <span>
                          {proposal.targetAccountsFileUrl.split('/').pop()}
                        </span>
                        <Download className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {proposal.currentChallenges && (
                <div>
                  <p className="text-sm font-medium">Current Challenges</p>
                  <p className="whitespace-pre-wrap">{proposal.currentChallenges}</p>
                </div>
              )}
              {proposal.additionalNeeds && (
                <div>
                  <p className="text-sm font-medium">Additional Needs</p>
                  <p className="whitespace-pre-wrap">{proposal.additionalNeeds}</p>
                </div>
              )}
              {!proposal.currentChallenges && !proposal.additionalNeeds && (
                <p className="text-muted-foreground text-sm">No additional information provided.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this proposal request? This action cannot be undone.</p>
          <DialogFooter className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setConfirmDelete(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}