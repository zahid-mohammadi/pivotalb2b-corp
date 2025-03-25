import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertProposalRequestSchema } from "@shared/schema";
import { MetaTags } from "@/components/ui/meta-tags";
import { PageBanner } from "@/components/ui/page-banner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { FileUpload } from "@/components/ui/file-upload";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { 
  Check, 
  CheckCircle, 
  Loader2, 
  User, 
  Building, 
  Mail, 
  Phone, 
  Briefcase, 
  ListChecks, 
  Target, 
  Clock, 
  Globe, 
  Users, 
  UserCircle, 
  Building2, 
  Server, 
  FileText, 
  AlertCircle, 
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const proposalFormSchema = insertProposalRequestSchema
  .extend({
    acceptPrivacyPolicy: z.boolean().refine(val => val === true, {
      message: "You must accept the privacy policy to proceed",
    }),
  });

type ProposalFormValues = z.infer<typeof proposalFormSchema>;

// Define services and their options
const serviceOptions = [
  { id: "strategic-lead-generation", label: "Strategic Lead Generation (High-intent leads via email/phone)" },
  { id: "content-syndication", label: "Content Syndication (Boost brand reach)" },
  { id: "event-marketing", label: "Event Marketing Solutions (Drive event registrations)" },
  { id: "lead-qualification", label: "Lead Qualification Services (BANT-qualified leads)" },
  { id: "account-based-marketing", label: "Account-Based Marketing (Target high-value accounts)" },
  { id: "waterfall-campaign", label: "Waterfall Campaign Suite (Full-funnel solution)" },
];

const goalOptions = [
  { id: "generate-leads", label: "Generate more leads" },
  { id: "increase-awareness", label: "Increase brand awareness" },
  { id: "boost-attendance", label: "Boost event attendance" },
  { id: "improve-quality", label: "Improve lead quality" },
  { id: "close-accounts", label: "Close high-value accounts" },
  { id: "other", label: "Other" },
];

const timelineOptions = [
  { value: "ASAP", label: "ASAP (Within 1 month)" },
  { value: "1-3 months", label: "1-3 months" },
  { value: "3-6 months", label: "3-6 months" },
  { value: "6+ months", label: "6+ months" },
];

const geographyOptions = [
  { value: "North America", label: "North America" },
  { value: "Europe", label: "Europe" },
  { value: "Asia-Pacific", label: "Asia-Pacific" },
  { value: "Latin America", label: "Latin America" },
  { value: "Middle East & Africa", label: "Middle East & Africa" },
  { value: "Other", label: "Other" },
];

const jobFunctionOptions = [
  { id: "marketing", label: "Marketing" },
  { id: "sales", label: "Sales" },
  { id: "it-technology", label: "IT/Technology" },
  { id: "operations", label: "Operations" },
  { id: "finance", label: "Finance" },
  { id: "procurement", label: "Procurement" },
  { id: "other", label: "Other" },
];

const jobLevelOptions = [
  { id: "c-level", label: "C-Level (CEO, CMO, CIO, etc.)" },
  { id: "vp-director", label: "VP/Director" },
  { id: "manager", label: "Manager" },
  { id: "individual-contributor", label: "Individual Contributor" },
  { id: "other", label: "Other" },
];

const companySizeOptions = [
  { id: "<50 employees", label: "<50 employees" },
  { id: "50-250 employees", label: "50-250 employees" },
  { id: "251-1,000 employees", label: "251-1,000 employees" },
  { id: "1,001-10,000 employees", label: "1,001-10,000 employees" },
  { id: "10,000+ employees", label: "10,000+ employees" },
];

export default function RequestProposalPage() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  const { toast } = useToast();
  
  // Form steps
  const totalSteps = 4;
  const steps = [
    { number: 1, title: "Contact Information", icon: <User className="h-5 w-5" /> },
    { number: 2, title: "Service Requirements", icon: <Briefcase className="h-5 w-5" /> },
    { number: 3, title: "Target Audience", icon: <Target className="h-5 w-5" /> },
    { number: 4, title: "Additional Information", icon: <FileText className="h-5 w-5" /> },
  ];

  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      companyName: "",
      jobTitle: "",
      interestedServices: [],
      primaryGoals: [],
      timeline: undefined,
      targetGeography: [],
      jobFunction: [],
      jobLevel: [],
      companyIndustries: "",
      companySize: [],
      technographics: "",
      hasTargetAccounts: undefined,
      targetAccountsList: "",
      targetAccountsFileUrl: "",
      additionalNeeds: "",
      currentChallenges: "",
      acceptPrivacyPolicy: false,
    },
  });

  // Show/hide conditional fields based on selected options
  const showOtherGoalField = form.watch("primaryGoals").includes("other");
  const showOtherGeographyField = form.watch("targetGeography").includes("Other");
  const showOtherJobFunctionField = form.watch("jobFunction").includes("other");
  const showOtherJobLevelField = form.watch("jobLevel").includes("other");
  const showABMFields = form.watch("interestedServices").includes("account-based-marketing");
  const hasTargetAccounts = form.watch("hasTargetAccounts") === "yes";
  
  // Add useEffect to calculate form progress
  useEffect(() => {
    // Calculate form progress based on filled fields
    const requiredFields = [
      'fullName', 'email', 'companyName', 
      'interestedServices', 'primaryGoals', 'timeline', 
      'targetGeography', 'jobFunction', 'jobLevel', 
      'companyIndustries', 'companySize'
    ];
    
    const filledFields = requiredFields.filter(field => {
      const value = form.getValues(field as any);
      return value && (Array.isArray(value) ? value.length > 0 : true);
    });
    
    setFormProgress(Math.min(100, Math.round((filledFields.length / requiredFields.length) * 100)));
  }, [form.watch()]);
  
  // Step navigation functions
  const nextStep = () => {
    if (currentStep < totalSteps) {
      // Validate current step fields before proceeding
      const fieldsToValidate = getFieldsForStep(currentStep);
      form.trigger(fieldsToValidate).then((isValid) => {
        if (isValid) {
          setCurrentStep(prev => prev + 1);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  // Helper to get fields for current step validation
  const getFieldsForStep = (step: number): any[] => {
    switch (step) {
      case 1:
        return ['fullName', 'email', 'companyName'];
      case 2:
        return ['interestedServices', 'primaryGoals', 'timeline'];
      case 3:
        return ['targetGeography', 'jobFunction', 'jobLevel', 'companyIndustries', 'companySize'];
      case 4:
        return ['acceptPrivacyPolicy'];
      default:
        return [];
    }
  };

  const mutation = useMutation({
    mutationFn: async (data: Omit<ProposalFormValues, "acceptPrivacyPolicy">) => {
      const response = await apiRequest(
        "POST",
        "/api/proposal-requests",
        data
      );

      return response;
    },
    onSuccess: (_data, variables) => {
      const firstName = variables.fullName.split(" ")[0];
      setSubmittedName(firstName);
      setShowThankYou(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error submitting form",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: ProposalFormValues) {
    // Remove the acceptPrivacyPolicy field as it's not needed in the backend
    const { acceptPrivacyPolicy, ...submissionData } = values;
    mutation.mutate(submissionData);
  }

  if (showThankYou) {
    return (
      <div className="container mx-auto py-16 px-4 sm:px-6">
        <MetaTags title="Request Submitted | Pivotal B2B" />
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-center mb-6">
              <div className="bg-primary/10 rounded-full p-3">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center">Thanks, {submittedName}!</h1>
            <p className="text-center text-muted-foreground mt-2">
              Your proposal request is in. We'll reach out within 1-2 business days to discuss your needs.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>In the meantime, here are some resources that might interest you:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Button variant="outline" className="h-auto py-6" onClick={() => window.location.href = "/case-studies"}>
                Explore our Case Studies
              </Button>
              <Button variant="outline" className="h-auto py-6" onClick={() => window.location.href = "/blog"}>
                Browse our Blog
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => window.location.href = "/"}>
              Return to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6">
      <MetaTags
        title="Request a Proposal | Pivotal B2B"
        description="Tell us about your goals and audience, and we'll craft a solution to drive your pipeline and revenue."
      />
      <PageBanner
        title="Get Your Custom B2B Marketing Proposal"
        description="Tell us about your goals and audience, and we'll craft a solution to drive your pipeline and revenue."
        pattern="dots"
      />
      
      <Card className="max-w-4xl mx-auto my-8 shadow-lg border-t-4 border-primary">
        <CardHeader className="pb-2">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{formProgress}% complete</span>
              <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
            </div>
            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${formProgress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          
          {/* Steps navigation */}
          <div className="flex items-center justify-between mb-6 mt-6">
            {steps.map((step, index) => (
              <motion.div 
                key={step.number}
                className={`flex flex-col items-center space-y-2 ${index < steps.length - 1 ? 'w-full' : ''}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center w-full">
                  <div 
                    className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full border-2 
                    ${currentStep === step.number 
                      ? 'border-primary bg-primary text-primary-foreground' 
                      : currentStep > step.number
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-muted-foreground/30 text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.number ? <Check className="h-5 w-5" /> : step.icon}
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="w-full h-[2px] bg-muted mx-1">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ 
                          width: currentStep > step.number ? '100%' : currentStep === step.number ? '50%' : '0%'
                        }} 
                      />
                    </div>
                  )}
                </div>
                
                <span className={`text-xs font-medium hidden md:block ${
                  currentStep === step.number ? 'text-primary' : 
                  currentStep > step.number ? 'text-primary/80' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </span>
              </motion.div>
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="pt-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <User className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-semibold">Contact Information</h2>
                      </div>
                      <p className="text-muted-foreground">Tell us who you are and how we can reach you.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name <span className="text-destructive">*</span></FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input className="pl-10" placeholder="e.g., John Smith" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address <span className="text-destructive">*</span></FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input className="pl-10" placeholder="e.g., john.smith@company.com" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input className="pl-10" placeholder="e.g., (555) 123-4567" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name <span className="text-destructive">*</span></FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input className="pl-10" placeholder="e.g., Acme Corp" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="jobTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input className="pl-10" placeholder="e.g., Marketing Director" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>
                )}
                
                {currentStep === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Briefcase className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-semibold">Service Requirements</h2>
                      </div>
                      <p className="text-muted-foreground">Tell us what services you're interested in and your marketing goals.</p>
                      
                      <FormField
                        control={form.control}
                        name="interestedServices"
                        render={() => (
                          <FormItem>
                            <FormLabel>Which services are you interested in? <span className="text-destructive">*</span></FormLabel>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                              {serviceOptions.map((option) => (
                                <FormField
                                  key={option.id}
                                  control={form.control}
                                  name="interestedServices"
                                  render={({ field }) => {
                                    const isChecked = field.value?.includes(option.id);
                                    return (
                                      <FormItem key={option.id} className="space-y-0">
                                        <FormControl>
                                          <div className={`flex items-start p-4 rounded-md border-2 cursor-pointer transition-all
                                            ${isChecked 
                                              ? 'border-primary bg-primary/5' 
                                              : 'border-muted hover:border-muted-foreground/20'}`}
                                          >
                                            <Checkbox
                                              className="mt-0.5"
                                              checked={isChecked}
                                              onCheckedChange={(checked) => {
                                                const newValue = checked
                                                  ? [...field.value, option.id]
                                                  : field.value.filter(value => value !== option.id);
                                                field.onChange(newValue);
                                              }}
                                            />
                                            <div 
                                              className="ml-3 flex-1"
                                              onClick={() => {
                                                const newValue = isChecked
                                                  ? field.value.filter(value => value !== option.id)
                                                  : [...field.value, option.id];
                                                field.onChange(newValue);
                                              }}
                                            >
                                              <FormLabel className="font-medium cursor-pointer">
                                                {option.label.split('(')[0]}
                                              </FormLabel>
                                              {option.label.includes('(') && (
                                                <p className="text-xs text-muted-foreground mt-1">
                                                  {option.label.match(/\((.*?)\)/)?.[1]}
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                        </FormControl>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="primaryGoals"
                        render={() => (
                          <FormItem>
                            <FormLabel>What are your primary goals? <span className="text-destructive">*</span></FormLabel>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                              {goalOptions.map((option) => (
                                <FormField
                                  key={option.id}
                                  control={form.control}
                                  name="primaryGoals"
                                  render={({ field }) => {
                                    const isChecked = field.value?.includes(option.id);
                                    return (
                                      <FormItem key={option.id} className="space-y-0">
                                        <FormControl>
                                          <div className={`flex items-center p-3 rounded-md border-2 cursor-pointer transition-all
                                            ${isChecked 
                                              ? 'border-primary bg-primary/5' 
                                              : 'border-muted hover:border-muted-foreground/20'}`}
                                          >
                                            <Checkbox
                                              checked={isChecked}
                                              onCheckedChange={(checked) => {
                                                const newValue = checked
                                                  ? [...field.value, option.id]
                                                  : field.value.filter(value => value !== option.id);
                                                field.onChange(newValue);
                                              }}
                                            />
                                            <FormLabel 
                                              className="ml-3 font-medium cursor-pointer mb-0 flex-1"
                                              onClick={() => {
                                                const newValue = isChecked
                                                  ? field.value.filter(value => value !== option.id)
                                                  : [...field.value, option.id];
                                                field.onChange(newValue);
                                              }}
                                            >
                                              {option.label}
                                            </FormLabel>
                                          </div>
                                        </FormControl>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {showOtherGoalField && (
                        <FormField
                          control={form.control}
                          name="otherGoal"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Please specify your other goal</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <ListChecks className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input className="pl-10" placeholder="Please specify your goal" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name="timeline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Timeline for Starting <span className="text-destructive">*</span></FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <div className="relative">
                                  <SelectTrigger className="pl-10">
                                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <SelectValue placeholder="Select a timeline" />
                                  </SelectTrigger>
                                </div>
                              </FormControl>
                              <SelectContent>
                                {timelineOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>
                )}
                
                {currentStep === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Target className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-semibold">Target Audience Details</h2>
                      </div>
                      <p className="text-muted-foreground">Help us understand your ideal audience for a tailored proposal.</p>
                      
                      <FormField
                        control={form.control}
                        name="targetGeography"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Geography (Geo) <span className="text-destructive">*</span></FormLabel>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                              {geographyOptions.map((option) => (
                                <FormItem key={option.value} className="flex flex-row items-center space-x-3 space-y-0 p-3 border rounded-md">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option.value)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, option.value])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== option.value
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {option.label}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {showOtherGeographyField && (
                        <FormField
                          control={form.control}
                          name="otherGeography"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Please specify the other geography</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <Input className="pl-10" placeholder="Please specify geography" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="jobFunction"
                          render={() => (
                            <FormItem>
                              <FormLabel>Job Function <span className="text-destructive">*</span></FormLabel>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                {jobFunctionOptions.map((option) => (
                                  <FormField
                                    key={option.id}
                                    control={form.control}
                                    name="jobFunction"
                                    render={({ field }) => {
                                      return (
                                        <FormItem key={option.id} className="flex flex-row items-center space-x-3 space-y-0 p-2 border rounded-md">
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(option.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, option.id])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== option.id
                                                      )
                                                    );
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal cursor-pointer">
                                            {option.label}
                                          </FormLabel>
                                        </FormItem>
                                      );
                                    }}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="jobLevel"
                          render={() => (
                            <FormItem>
                              <FormLabel>Job Level <span className="text-destructive">*</span></FormLabel>
                              <div className="grid grid-cols-1 gap-2 mt-2">
                                {jobLevelOptions.map((option) => (
                                  <FormField
                                    key={option.id}
                                    control={form.control}
                                    name="jobLevel"
                                    render={({ field }) => {
                                      return (
                                        <FormItem key={option.id} className="flex flex-row items-center space-x-3 space-y-0 p-2 border rounded-md">
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(option.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, option.id])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== option.id
                                                      )
                                                    );
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal cursor-pointer">
                                            {option.label}
                                          </FormLabel>
                                        </FormItem>
                                      );
                                    }}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {(showOtherJobFunctionField || showOtherJobLevelField) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {showOtherJobFunctionField && (
                            <FormField
                              control={form.control}
                              name="otherJobFunction"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Please specify other job function</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                      <Input className="pl-10" placeholder="e.g., Human Resources" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                          {showOtherJobLevelField && (
                            <FormField
                              control={form.control}
                              name="otherJobLevel"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Please specify other job level</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <UserCircle className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                      <Input className="pl-10" placeholder="e.g., Consultant" {...field} />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        </div>
                      )}

                      <FormField
                        control={form.control}
                        name="companyIndustries"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target Company Industries <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  className="pl-10" 
                                  placeholder="e.g., Technology, Healthcare, Financial Services" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormDescription>
                              Enter the industries you want to target, separated by commas
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="companySize"
                        render={() => (
                          <FormItem>
                            <FormLabel>Target Company Size <span className="text-destructive">*</span></FormLabel>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                              {companySizeOptions.map((option) => (
                                <FormField
                                  key={option.id}
                                  control={form.control}
                                  name="companySize"
                                  render={({ field }) => {
                                    const isChecked = field.value?.includes(option.id);
                                    return (
                                      <FormItem key={option.id} className="flex flex-row items-center space-x-3 space-y-0 p-2 border rounded-md">
                                        <FormControl>
                                          <Checkbox
                                            checked={isChecked}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, option.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== option.id
                                                    )
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer flex-1" onClick={() => {
                                          const newValue = isChecked
                                            ? field.value.filter(value => value !== option.id)
                                            : [...field.value, option.id];
                                          field.onChange(newValue);
                                        }}>
                                          {option.label}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="technographics"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Technographics (Optional)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Server className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  className="pl-10" 
                                  placeholder="e.g., Salesforce, HubSpot, AWS" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormDescription>
                              Enter any specific technologies used by your target companies
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div 
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <FileText className="h-6 w-6 text-primary" />
                        <h2 className="text-xl font-semibold">Additional Information</h2>
                      </div>
                      <p className="text-muted-foreground">Please provide any additional details that will help us prepare your proposal.</p>
                      
                      {showABMFields && (
                        <>
                          <FormField
                            control={form.control}
                            name="hasTargetAccounts"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>Do you have specific target accounts in mind? <span className="text-destructive">*</span></FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                  >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="yes" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Yes, I have specific target accounts
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="no" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        No, I need help identifying target accounts
                                      </FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {hasTargetAccounts && (
                            <div className="space-y-6">
                              <FormField
                                control={form.control}
                                name="targetAccountsList"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Target Accounts List</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder="List your target accounts here, one per line" 
                                        className="min-h-[120px]" 
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      Enter the names of companies you'd like to target, one per line
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <div className="border border-muted p-4 rounded-md bg-muted/30">
                                <div className="flex items-center gap-2 mb-3">
                                  <Server className="h-5 w-5 text-primary" />
                                  <h3 className="text-base font-medium">Upload Target Accounts File</h3>
                                </div>
                                <FormField
                                  control={form.control}
                                  name="targetAccountsFileUrl"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormDescription className="mb-3">
                                        Optionally upload a CSV, Excel, or PDF file with your target accounts list
                                      </FormDescription>
                                      <FormControl>
                                        <FileUpload
                                          onFileUpload={(fileUrl) => {
                                            form.setValue('targetAccountsFileUrl', fileUrl);
                                          }}
                                          acceptedFileTypes=".csv,.xls,.xlsx,.pdf"
                                          maxFileSizeMB={5}
                                          buttonText="Upload Accounts List"
                                          currentFileUrl={field.value}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      <FormField
                        control={form.control}
                        name="currentChallenges"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Challenges (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="e.g., Low conversion rates from current IT leads." 
                                className="min-h-[120px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="additionalNeeds"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Requirements (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please share any additional information or requirements" 
                                className="min-h-[120px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Separator className="my-6" />

                      <FormField
                        control={form.control}
                        name="acceptPrivacyPolicy"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-medium leading-none">
                                I accept the privacy policy <span className="text-destructive">*</span>
                              </FormLabel>
                              <FormDescription>
                                By submitting this form, you agree to our{" "}
                                <a href="/privacy-policy" className="text-primary hover:underline" target="_blank">
                                  Privacy Policy
                                </a>
                                .
                              </FormDescription>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {currentStep > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous Step
                  </Button>
                ) : (
                  <div></div> 
                )}
                
                {currentStep < totalSteps ? (
                  <Button type="button" onClick={nextStep} className="gap-1">
                    Next Step 
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" className="bg-primary text-primary-foreground" disabled={mutation.isPending}>
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}