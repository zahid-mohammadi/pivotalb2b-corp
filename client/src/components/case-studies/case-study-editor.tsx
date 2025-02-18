import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertCaseStudy, insertCaseStudySchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { generateSlug } from "@/lib/utils";
import React from "react";

export function CaseStudyEditor() {
  const { toast } = useToast();
  const form = useForm<InsertCaseStudy>({
    resolver: zodResolver(insertCaseStudySchema),
    defaultValues: {
      title: "",
      clientName: "",
      industry: "",
      challenge: "",
      solution: "",
      results: "",
      bannerImage: "",
      contentImages: [],
      slug: "",
    },
  });

  const title = form.watch("title");
  React.useEffect(() => {
    if (title) {
      const slug = generateSlug(title);
      form.setValue("slug", slug);
    }
  }, [title, form]);

  const createCaseStudyMutation = useMutation({
    mutationFn: async (data: InsertCaseStudy) => {
      const res = await apiRequest("POST", "/api/case-studies", data);
      if (!res.ok) {
        throw new Error("Failed to create case study");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/case-studies"] });
      toast({
        title: "Success",
        description: "Case study created successfully",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => createCaseStudyMutation.mutate(data))} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bannerImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banner Image</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <ImageUpload
                    onImageUpload={(url) => field.onChange(url)}
                  />
                  {field.value && (
                    <img
                      src={field.value}
                      alt="Banner preview"
                      className="max-w-md rounded-md"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Client Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="challenge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Challenge</FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="solution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Solution</FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="results"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Results</FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contentImages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content Images</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <ImageUpload
                    onImageUpload={(url) => field.onChange([...(field.value || []), url])}
                  />
                  <div className="grid grid-cols-3 gap-4">
                    {field.value?.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Content image ${index + 1}`}
                        className="rounded-md"
                      />
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={createCaseStudyMutation.isPending}
          className="w-full"
        >
          Create Case Study
        </Button>
      </form>
    </Form>
  );
}