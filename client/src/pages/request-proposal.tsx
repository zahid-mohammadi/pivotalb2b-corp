import { useState } from "react";
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
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Check, CheckCircle, Loader2 } from "lucide-react";

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
  { value: "<50 employees", label: "<50 employees" },
  { value: "50-250 employees", label: "50-250 employees" },
  { value: "251-1,000 employees", label: "251-1,000 employees" },
  { value: "1,001-10,000 employees", label: "1,001-10,000 employees" },
  { value: "10,000+ employees", label: "10,000+ employees" },
];

export default function RequestProposalPage() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const { toast } = useToast();

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
      companySize: undefined,
      technographics: "",
      hasTargetAccounts: undefined,
      targetAccountsList: "",
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

  const mutation = useMutation({
    mutationFn: async (data: Omit<ProposalFormValues, "acceptPrivacyPolicy">) => {
      const response = await apiRequest({
        method: "POST",
        url: "/api/proposal-requests",
        data,
      });

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
      
      <Card className="max-w-4xl mx-auto my-8">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Contact Information Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">1. Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., John Smith" {...field} />
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
                          <Input placeholder="e.g., john.smith@company.com" {...field} />
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
                          <Input placeholder="e.g., (555) 123-4567" {...field} />
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
                          <Input placeholder="e.g., Acme Corp" {...field} />
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
                        <Input placeholder="e.g., Marketing Director" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Service Requirements Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">2. Service Requirements</h2>
                <FormField
                  control={form.control}
                  name="interestedServices"
                  render={() => (
                    <FormItem>
                      <FormLabel>Which services are you interested in? <span className="text-destructive">*</span></FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {serviceOptions.map((option) => (
                          <FormField
                            key={option.id}
                            control={form.control}
                            name="interestedServices"
                            render={({ field }) => {
                              return (
                                <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
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
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {option.label}
                                  </FormLabel>
                                </FormItem>
                              )
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {goalOptions.map((option) => (
                          <FormField
                            key={option.id}
                            control={form.control}
                            name="primaryGoals"
                            render={({ field }) => {
                              return (
                                <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
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
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {option.label}
                                  </FormLabel>
                                </FormItem>
                              )
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
                          <Input placeholder="Please specify your goal" {...field} />
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
                          <SelectTrigger>
                            <SelectValue placeholder="Select a timeline" />
                          </SelectTrigger>
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

              {/* Target Audience Details Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">3. Target Audience Details</h2>
                <p className="text-muted-foreground">Help us understand your ideal audience for a tailored proposal.</p>
                
                <FormField
                  control={form.control}
                  name="targetGeography"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Geography (Geo) <span className="text-destructive">*</span></FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {geographyOptions.map((option) => (
                          <FormItem key={option.value} className="flex flex-row items-start space-x-3 space-y-0">
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
                                      )
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
                          <Input placeholder="Please specify geography" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="jobFunction"
                  render={() => (
                    <FormItem>
                      <FormLabel>Job Function <span className="text-destructive">*</span></FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {jobFunctionOptions.map((option) => (
                          <FormField
                            key={option.id}
                            control={form.control}
                            name="jobFunction"
                            render={({ field }) => {
                              return (
                                <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
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
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {option.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {showOtherJobFunctionField && (
                  <FormField
                    control={form.control}
                    name="otherJobFunction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please specify the other job function</FormLabel>
                        <FormControl>
                          <Input placeholder="Please specify job function" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="jobLevel"
                  render={() => (
                    <FormItem>
                      <FormLabel>Job Level <span className="text-destructive">*</span></FormLabel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {jobLevelOptions.map((option) => (
                          <FormField
                            key={option.id}
                            control={form.control}
                            name="jobLevel"
                            render={({ field }) => {
                              return (
                                <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
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
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {option.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {showOtherJobLevelField && (
                  <FormField
                    control={form.control}
                    name="otherJobLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please specify the other job level</FormLabel>
                        <FormControl>
                          <Input placeholder="Please specify job level" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="companyIndustries"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Industries <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Software, Healthcare, Manufacturing" {...field} />
                      </FormControl>
                      <FormDescription>
                        List the industries your target audience belongs to.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Size <span className="text-destructive">*</span></FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {companySizeOptions.map((option) => (
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

                <FormField
                  control={form.control}
                  name="technographics"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technographics (Technologies Used)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Salesforce, AWS, Slack" {...field} />
                      </FormControl>
                      <FormDescription>
                        List any technologies your audience uses (optional).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {showABMFields && (
                  <div className="space-y-4 p-4 border rounded-md bg-muted/30">
                    <h3 className="font-medium">Account-Based Marketing (ABM)</h3>
                    <FormField
                      control={form.control}
                      name="hasTargetAccounts"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Do you have a list of target accounts?</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-row space-x-4"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="yes" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  Yes
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="no" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  No
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {hasTargetAccounts && (
                      <FormField
                        control={form.control}
                        name="targetAccountsList"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Please list your target accounts</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please include company names and any relevant details (e.g., size, contact info)"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              You can also email your list to proposals@pivotalb2b.com
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Additional Information Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">4. Additional Information</h2>
                <FormField
                  control={form.control}
                  name="additionalNeeds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tell us more about your needs</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., We need 200 qualified leads for a SaaS launch in North America."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currentChallenges"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Challenges</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Low conversion rates from current IT leads."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Privacy Policy and Submit */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="acceptPrivacyPolicy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal cursor-pointer">
                          By submitting, you agree to our <a href="/privacy-policy" className="text-primary underline">Privacy Policy</a>. We'll use this information to create your proposal and contact you.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full md:w-auto" disabled={mutation.isPending}>
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}